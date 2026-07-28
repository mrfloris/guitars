import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(projectRoot, '..');
const docsRoot = path.join(projectRoot, 'src', 'content', 'docs');
const configPath = path.join(projectRoot, 'astro.config.mjs');
const cnamePath = path.join(projectRoot, 'public', 'CNAME');
const readmePath = path.join(repositoryRoot, 'README.md');

async function collectDocs(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const entryPath = path.join(directory, entry.name);
			return entry.isDirectory() ? collectDocs(entryPath) : [entryPath];
		}),
	);

	return files.flat().filter((file) => /\.(?:md|mdx)$/.test(file));
}

function routeFor(file) {
	const relativePath = path.relative(docsRoot, file).split(path.sep).join('/');
	const withoutExtension = relativePath.replace(/\.(?:md|mdx)$/, '');
	const route = withoutExtension === 'index' ? '' : withoutExtension.replace(/\/index$/, '');
	return route ? `/${route}/` : '/';
}

function normalizeRoute(target) {
	const pathname = target.split(/[?#]/, 1)[0];
	if (pathname === '/') return pathname;
	return `${pathname.replace(/\/+$/, '')}/`;
}

function internalLinks(source) {
	const targets = [];
	const patterns = [
		/\]\((\/[^)\s]+)\)/g,
		/href=\\?["'](\/[^"'\\\s]+)\\?["']/g,
		/^\s*link:\s*(\/\S+)\s*$/gm,
	];

	for (const pattern of patterns) {
		for (const match of source.matchAll(pattern)) targets.push(match[1]);
	}

	return targets;
}

const docs = await collectDocs(docsRoot);
const routes = new Map();
const errors = [];

for (const file of docs) {
	const route = routeFor(file);
	const relativeFile = path.relative(projectRoot, file);
	if (routes.has(route)) {
		errors.push(`Duplicate route ${route}: ${routes.get(route)} and ${relativeFile}`);
	}
	routes.set(route, relativeFile);

	const source = await readFile(file, 'utf8');
	const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
	if (!frontmatter || !/^title:\s*.+$/m.test(frontmatter[1])) {
		errors.push(`${relativeFile} is missing a title in its frontmatter.`);
	}
}

for (const file of docs) {
	const source = await readFile(file, 'utf8');
	const relativeFile = path.relative(projectRoot, file);
	for (const target of internalLinks(source)) {
		const route = normalizeRoute(target);
		if (!routes.has(route)) errors.push(`${relativeFile} links to missing route ${target}`);
	}
}

const config = await readFile(configPath, 'utf8');
for (const match of config.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)) {
	const route = normalizeRoute(`/${match[1]}/`);
	if (!routes.has(route)) errors.push(`astro.config.mjs sidebar links to missing route ${route}`);
}

const siteMatch = config.match(/\bsite:\s*['"]([^'"]+)['"]/);
if (!siteMatch) {
	errors.push('astro.config.mjs is missing the canonical site URL.');
} else {
	const siteUrl = new URL(siteMatch[1]);
	const cname = (await readFile(cnamePath, 'utf8')).trim();
	if (siteUrl.hostname !== cname) {
		errors.push(`public/CNAME (${cname}) does not match the configured site host (${siteUrl.hostname}).`);
	}

	const readme = await readFile(readmePath, 'utf8');
	const publicUrlPattern = new RegExp(
		`https://${siteUrl.hostname.replaceAll('.', '\\.')}(/[^)\\s]*)?`,
		'g',
	);
	for (const match of readme.matchAll(publicUrlPattern)) {
		const route = normalizeRoute(match[1] || '/');
		if (!routes.has(route)) errors.push(`README.md links to missing public route ${route}`);
	}
}

if (errors.length > 0) {
	console.error('Documentation consistency check failed:\n');
	for (const error of errors) console.error(`- ${error}`);
	process.exitCode = 1;
} else {
	console.log(`Documentation consistency check passed for ${docs.length} pages.`);
}
