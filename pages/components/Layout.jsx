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
			<div className='flex flex-col flex-wrap justify-center w-screen h-screen'>
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
		);
	}

	return (
		<div className='min-h-screen'>
			<div className='flex items-center md:hidden'>
				<button
					type='button'
					className='fixed p-1 rounded-full left-4 top-2 '
					onClick={() => setShowNav(true)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='text-txColor icon dark:text-white'>
						<path
							fillRule='evenodd'
							d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				<div className='flex justify-center mt-3 grow md:mr-6'>
					<Logo />
				</div>
			</div>
			<div className='flex'>
				<Nav
					show={showNav}
					closeNav={closeNav}
				/>
				<div className='flex-grow md:p-4 py-4 px-2 '>{children}</div>
			</div>
		</div>
	);
}
