import { existsSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Personal content lives in `content/`, which is gitignored. A fresh clone
// (or a CI build) doesn't have it, so fall back to the committed template.
const contentDir = existsSync('./content') ? './content' : './content.example';
if (contentDir === './content.example') {
	console.warn('[content] content/ not found, using placeholder content from content.example/');
}

const profile = defineCollection({
	loader: glob({ pattern: 'profile.md', base: contentDir }),
	schema: z.object({
		name: z.string(),
		handle: z.string(),
		role: z.string(),
		tagline: z.string(),
		location: z.string().optional(),
		email: z.email(),
		socials: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
		skills: z.array(z.string()).default([]),
		experience: z
			.array(
				z.object({
					period: z.string(),
					title: z.string(),
					place: z.string(),
					description: z.string().optional(),
				}),
			)
			.default([]),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: `${contentDir}/projects` }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		year: z.number(),
		tags: z.array(z.string()).default([]),
		url: z.url().optional(),
		repo: z.url().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { profile, projects };
