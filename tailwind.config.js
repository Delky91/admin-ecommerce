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
				//if u change the primary and secundary u need to check  box-shadow c-hover
				primary: "#463172",
				secundary: "#7C57CA",
				mid: "#62459F",
				txColor: "#ebefdc",
				bgColor: "#494867",
				bgColor2: "#282d53",
				accent: "#3d6ab3",
			},
			boxShadow: {
				"t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
				"t-md":
					"0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				"t-lg":
					"0 -10px 15px -3px rgba(0, 0, 0, 0.1), 5px -5px 8px -2px rgba(0, 0, 0, 0.1) ",
				"c-hover": "0px 0px 4px 1px rgba(255,255,255, 0.3)",
			},
		},
	},
	plugins: [],
};
