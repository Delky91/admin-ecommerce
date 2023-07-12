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
				<div className='bgBackground w-screen h-screen flex justify-center flex-col'>
					<div className='border rounded-xl bg-slate-400 bg-opacity-75 px-16 shadow-lg py-10 backdrop-blur-md max-sm:px-8 md:mx-auto w-90% mx-4'>
						<h2 className='mb-5 font-bold text-3xl'>Login</h2>
						<p className='mb-10'>Login with your google account.</p>
						<div className='flex justify-center'>
							<button
								className='flex gap-2 border px-3 py-2 rounded-full w-full justify-center bg-gray-100 text-secundary backdrop-blur-md bg-opacity-80 shadow hover:shadow-black/50  shadow-black/50 hover:bg-opacity-100 transition-colors duration-200 active:bg-bgColor active:text-txColor hover:shadow-md'
								onClick={() => signIn("google")}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon'
									preserveAspectRatio='xMidYMid'
									viewBox='0 0 256 262'
									id='google'>
									<path
										fill='#4285F4'
										d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
									/>
									<path
										fill='#34A853'
										d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
									/>
									<path
										fill='#FBBC05'
										d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
									/>
									<path
										fill='#EB4335'
										d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
									/>
								</svg>
								Sign in with Google
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className='bgBackground min-h-screen'>
			<div className='md:hidden flex items-center'>
				<button
					type='button'
					className='fixed hover:border rounded-full p-1 hover:border-white/20 left-4 top-2 hover:bg-bgFrom/20'
					onClick={() => setShowNav(true)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='icon text-white'>
						<path
							fillRule='evenodd'
							d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				<div className='flex grow justify-center md:mr-6 mt-3'>
					<Logo />
				</div>
			</div>
			<div className=' flex'>
				<Nav
					show={showNav}
					closeNav={closeNav}
				/>
				<div className=' flex-grow p-4'>{children}</div>
			</div>
		</div>
	);
}
