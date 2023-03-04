/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bgColor: '#191414',
				sidebarColor: '#000',
				headerColor: '#000',
				textColor: '#fff',
				accentColor: '#1db954',
				menuBackgroundColor: '#2e2e2e',
				lightGray: '#a7a7a7',
				mediumGray: '#2e2e2e',
				darkGray: '#181818',
				borderColor: '#ffffff26',
				menuText: '#fff',
				error: '#c24141',
				warning: '#e7a917'
			}
		}
	},
	plugins: []
};
