import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
			<meta title="author" content="Luis Miño Bustos" />
			</Head>
			<body className='scroll-smooth'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
