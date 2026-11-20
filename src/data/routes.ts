// Single source of truth for the site's pages. Used by the nav and the terminal.
export const routes = [
	{ path: '/', name: 'home', label: 'Home' },
	{ path: '/projects', name: 'projects', label: 'Projects' },
	{ path: '/about', name: 'about', label: 'About' },
	{ path: '/contact', name: 'contact', label: 'Contact' },
] as const;
