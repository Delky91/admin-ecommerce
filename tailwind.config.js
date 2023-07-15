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
				primary: "#f7d564",
				secundary: "#020717",
				bgColor: "#172554",
				txColor: "#e8edfd",
				accent: "#1541d1",
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
