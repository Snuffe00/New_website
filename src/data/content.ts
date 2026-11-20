import { getCollection, getEntry } from 'astro:content';

export async function getProfile() {
	const profile = await getEntry('profile', 'profile');
	if (!profile) throw new Error('Missing profile.md in the content folder');
	return profile;
}

/** Projects, newest first. */
export async function getProjects() {
	const projects = await getCollection('projects');
	return projects.sort((a, b) => b.data.year - a.data.year);
}
