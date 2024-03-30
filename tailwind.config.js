/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'text-color': 'var(--text-color)',
				'input-border': 'var(--input-border)',
				'input-active': 'var(--input-active)',
				'error-color': 'var(--error-color)',
				'inactive-button': 'var(--inactive-button)',
				'default-button': 'var(--default-button)',
				'hover-button': 'var(--hover-button)',
			},
		},
	},
	plugins: [],
};
