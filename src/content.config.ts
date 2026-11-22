import { existsSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds, statusIds } from './data/projects';

// Personal content lives in `content/`, which is gitignored. A fresh clone
// (or a CI build) doesn't have it, so fall back to the committed template.
const contentDir = existsSync('./content') ? './content' : './content.example';
if (contentDir === './content.example') {
	console.warn('[content] content/ not found, using placeholder content from content.example/');
}

// "YYYY-MM", e.g. "2025-09"
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use the format "YYYY-MM", e.g. "2025-09"');

// Optional field that also accepts an empty line (`hours:` with no value),
// which YAML reads as null. Empty fields are then simply left off the page.
const optional = <T extends z.ZodType>(schema: T) =>
	z.preprocess((value) => (value === null ? undefined : value), schema.optional());

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
					description: optional(z.string()),
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
		category: z.enum(categoryIds),
		status: optional(z.enum(statusIds)).transform((status) => status ?? 'completed'),
		start: month,
		end: optional(month),
		hours: optional(z.number().positive()),
		team: optional(z.number().int().positive()),
		role: optional(z.string()),
		course: optional(z.string()),
		organization: optional(z.string()),
		tags: optional(z.array(z.string())).transform((tags) => tags ?? []),
		url: optional(z.url()),
		repo: optional(z.url()),
		featured: optional(z.boolean()).transform((featured) => featured ?? false),
	}),
});

export const collections = { profile, projects };
