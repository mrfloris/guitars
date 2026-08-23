// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://guitars.mrfloris.com',
	integrations: [
		starlight({
			title: "Floris' Guitars & Gear",
			description: 'Floris guitar collection, gear archive, pedalboard plans, songs, and stories.',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/mrfloris/guitars' }],
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Collection Overview', slug: 'guitars' },
						{ label: 'About This Archive', slug: 'about/archive' },
					],
				},
				{
					label: 'Guitars',
					items: [
						{ label: "Gibson '64 ES-335", slug: 'guitars/gibson-es335' },
						{ label: 'Gibson SJ-200', slug: 'guitars/gibson-sj200' },
						{ label: "Gibson '60 Les Paul", slug: 'guitars/gibson-les-paul-1960' },
						{ label: 'Epiphone Les Paul', slug: 'guitars/epiphone-lespaul' },
						{ label: 'Ibanez Semi-Acoustic', slug: 'guitars/ibanez-acoustic' },
						{ label: 'Lindo Koya', slug: 'guitars/lindo-koya' },
						{ label: 'Inherited Sitar', slug: 'guitars/sitar' },
					],
				},
				{
					label: 'Gear',
					items: [
						{ label: 'Amps', slug: 'gear/amps' },
						{ label: 'Pedalboards', slug: 'gear/pedalboards' },
						{ label: 'Accessories', slug: 'gear/accessories' },
					],
				},
				{
					label: 'Practice & Plans',
					items: [
						{ label: 'Songs & Tabs', slug: 'music/songs' },
						{ label: 'Wishlist', slug: 'wishlist' },
						{ label: 'Journal', slug: 'blog' },
					],
				},
			],
		}),
	],
});
