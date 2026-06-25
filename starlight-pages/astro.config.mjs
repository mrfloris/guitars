// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://guitars.mrfloris.com',
	integrations: [
		starlight({
			title: 'Guitars And Gear',
			description: 'Floris guitar collection, gear archive, pedalboard plans, songs, and stories.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/mrfloris/guitars' }],
			sidebar: [
				{
					label: 'Guitars',
					items: [
						{ label: 'Inventory', slug: 'guitars' },
						{ label: 'Gibson ES-335', slug: 'guitars/gibson-es335' },
						{ label: 'Epiphone Les Paul', slug: 'guitars/epiphone-lespaul' },
						{ label: 'Ibanez Semi-Acoustic', slug: 'guitars/ibanez-acoustic' },
						{ label: 'Lindo Koya', slug: 'guitars/lindo-koya' },
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
					label: 'Practice And Plans',
					items: [
						{ label: 'Songs And Tabs', slug: 'music/songs' },
						{ label: 'Wishlist', slug: 'wishlist' },
						{ label: 'Blog', slug: 'blog' },
					],
				},
			],
		}),
	],
});
