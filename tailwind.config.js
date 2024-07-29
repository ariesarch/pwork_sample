/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/App.{js,jsx,ts,tsx}',
		'./src/screens/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'patchwork-dark-50': '#585e62',
				'patchwork-dark-100': '#2E363B',
				'patchwork-grey-50': '#f8f8f8',
				'patchwork-grey-70': '#434A4F',
				'patchwork-grey-100': '#828689',
				'patchwork-grey-400': '#969A9D',
				'patchwork-dark-900': '#000',
				'patchwork-light-50': '#f1f4f8',
				'patchwork-light-100': '#f2f7fc',
				'patchwork-light-900': '#fff',
				'patchwork-red-50': '#FF3C26',
				'patchwork-red-600': '#ED1800',
			},
			spacing: {
				'34': '8.125rem',
			}
		},
	},
	plugins: [],
	// darkMode: 'class',
};
