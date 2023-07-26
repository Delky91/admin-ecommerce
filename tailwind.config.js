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
				primary: "#475BE8",
				secundary: "#F29A2E",
				bgColor: "#FAFAFA",
				txColor: "#292929",
				txInactive: "#808191",
				accent: "#4CE13F",
			},
			boxShadow: {
				"c-hover": "0px 0px 4px 1px rgba(255,255,255, 0.3)",
			},
			backgroundImage: {
				"layout-bg":
					"url(https://lomb-next-ecommerce.s3.amazonaws.com/1689398007562.webp)",
			},
			blur: {
				xs: "2px",
				xxs: "1px",
			},
		},
	},
	plugins: [],
};
