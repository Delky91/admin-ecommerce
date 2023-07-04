import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./nav";
import { useState } from "react";
import Logo from "./Logo.jsx";

export default function Layout({ children }) {
	const { data: session } = useSession();
	const [showNav, setShowNav] = useState(false);

	if (!session) {
		return (
			<div className='bg-bgColor w-screen h-screen flex items-center'>
				<div className='text-center w-full'>
					<button
						className='bg-primary p-2 px-4 rounded-lg shadow shadow-black border-1 border-white hover:shadow-inner hover:font-bold text-white'
						onClick={() => signIn("google")}>
						Sign in with Google
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-bgColor min-h-screen'>
			<div className='md:hidden flex items-center'>
				<button
					type='button'
					className='p-4'
					onClick={() => setShowNav(true)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='w-6 h-6'>
						<path
							fillRule='evenodd'
							d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
				<div className='flex grow justify-center mr-6'>
					<Logo />
				</div>
			</div>
			<div className=' flex'>
				<Nav show={showNav} />
				<div className=' flex-grow p-4'>{children}</div>
			</div>
		</div>
	);
}
