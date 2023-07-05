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
				txColor: "#ebefdc",
				bgColor: "#494867",
				accent: "#3d6ab3",
				atention: "#3a9898",
			},
		},
	},
	plugins: [],
};
