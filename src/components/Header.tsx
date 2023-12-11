import Logo from './Logo'
import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<div className='border-b border-gray-200 shadow shadow-gray-300 dark:shadow-none dark:border-none dark:bg-gray-800'>
				<div className='flex items-center justify-between p-8'>
					<Logo />
					<div className='flex gap-8'>
						<Link href='/profile'>Perfil</Link>
						<Link href='/feed'>Feed</Link>
						<Link href='/post/new'>Novo post</Link>
						<Link href='/admin'>Admin</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
