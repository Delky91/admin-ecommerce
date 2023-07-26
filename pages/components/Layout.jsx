/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./nav.jsx";
import { useState } from "react";
import Logo from "./Logo.jsx";
import Head from "next/head.js";

export default function Layout({ children }) {
	const { data: session } = useSession();
	const [showNav, setShowNav] = useState(false);

	// Función para cerrar el menú
	const closeNav = () => {
		setShowNav(false);
	};

	if (!session) {
		return (
			<>
				<Head>
					<title>My page</title>
					<meta charset='UTF-8' />
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
				<div className='flex flex-col flex-wrap justify-center w-screen h-screen bg-bgColor'>
					<div className='flex flex-col md:flex-row'>
						<div className='mx-auto md:pl-5 max-sm:px-8 md:ml-auto md:mr-2'>
							<h2 className='mb-5 text-3xl font-bold'>Welcome back!</h2>
							<p className='mb-10'>
								Login with your google account to login to your admin panel.
							</p>
							<button
								className='flex gap-3 px-3 py-2 text-white rounded-lg bg-primary/90 hover:shadow-md hover:shadow-black/70 hover:bg-primary'
								onClick={() => signIn("google")}>
								<img
									src='/images/GoogleLogo.svg'
									alt='Google logo'
									className='icon'
								/>
								Sign in with Google
							</button>
						</div>

						<div className='mx-auto md:block hidden max-w-md w-[400px] md:mr-auto md:ml-2 border rounded-lg bg-layout-bg bg-center bg-no-repeat bg-cover h-[400px]'></div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className='min-h-screen bg-bgColor'>
			<div className='flex items-center md:hidden'>
				<button
					type='button'
					className='fixed p-1 rounded-full hover:border hover:border-txColor/10 left-4 top-2 hover:bg-txColor/10'
					onClick={() => setShowNav(true)}>
					<img
						src='/images/hamburguer.svg'
						alt='Open Nav Button'
						className='text-txColor icon'
					/>
				</button>

				<div className='flex justify-center mt-3 grow md:mr-6'>
					<Logo />
				</div>
			</div>
			<div className='flex '>
				<Nav
					show={showNav}
					closeNav={closeNav}
				/>
				<div className='flex-grow p-4 '>{children}</div>
			</div>
		</div>
	);
}
