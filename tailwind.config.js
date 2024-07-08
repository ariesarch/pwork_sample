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
				primaryDark: '#585e62',
				primaryBgDark: '#2E363B',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
