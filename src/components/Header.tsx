import Logo from './Logo'
import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<div className='border-b border-gray-200 shadow shadow-gray-300 bg-white text-zinc-900 font-medium dark:shadow-none dark:border-none dark:bg-gray-800 dark:text-white'>
				<div className='flex items-center justify-between p-8'>
					<Logo />
					<div className='flex gap-8'>
						<Link href='/profile' className='hover:scale-[1.05] transition-transform'>
							Perfil
						</Link>
						<Link href='/feed' className='hover:scale-[1.05] transition-transform'>
							Feed
						</Link>
						<Link href='/post/new' className='hover:scale-[1.05] transition-transform'>
							Novo post
						</Link>
						<Link href='/admin' className='hover:scale-[1.05] transition-transform'>
							Relatório de posts
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
