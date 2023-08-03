/* eslint-disable @next/next/no-img-element */
import Layout from "./components/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>E-commerce dashboard</title>
				<meta charSet='UTF-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<meta
					name='description'
					content='Admin control panel for a ecommerce'
				/>
				<meta
					name='keywords'
					content='ecommerce, shop, portfolio'
				/>
			</Head>
			<Layout>
				<div className='flex justify-between text-blue-900 '>
					<h2>
						Hello, <b>{session?.user?.name}</b>
					</h2>
					<div className='flex gap-1 overflow-hidden text-black bg-gray-300 rounded-lg'>
						<img
							src={session?.user?.image}
							alt='user photo'
							className='w-6 h-6'
						/>
						<span className='px-2'>{session?.user?.name}</span>
					</div>
				</div>
			</Layout>
		</>
	);
}
