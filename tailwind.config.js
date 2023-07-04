/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#463172",
				highligts: "#EAE8FB",
				txColor: "#ebefdc",
				bgColor: "#494867",
			},
		},
	},
	plugins: [],
};
