// Project categories, in the order they appear on the Projects page.
// To add a category: add it here, then use its id in a project's `category` field.
export const categories = {
	school: { label: 'School', description: 'Coursework and projects from my studies.' },
	personal: { label: 'Personal', description: 'Hobby projects I built for fun or to learn something.' },
	work: { label: 'Work', description: 'Projects from jobs, internships and freelance work.' },
	competition: { label: 'Competitions', description: 'Hackathons, game jams and other competitions.' },
} as const;

export type Category = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [Category, ...Category[]];

export const statuses = {
	completed: 'Completed',
	'in-progress': 'In progress',
	paused: 'Paused',
} as const;

export type Status = keyof typeof statuses;
export const statusIds = Object.keys(statuses) as [Status, ...Status[]];

const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

/** "2025-09" → "Sep 2025" */
function formatMonth(month: string) {
	const [year, m] = month.split('-').map(Number);
	return monthFormat.format(new Date(year, m - 1));
}

/** "Sep 2025 – Dec 2025", "Sep 2025 – now", or just "Sep 2025" for a one-month project. */
export function formatPeriod(start: string, end?: string) {
	if (!end) return `${formatMonth(start)} – now`;
	if (end === start) return formatMonth(start);
	return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export function formatTeam(team: number) {
	return team === 1 ? 'Solo' : `Team of ${team}`;
}
