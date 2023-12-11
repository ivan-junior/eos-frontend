import SystemLogout from '@/components/SystemLogout'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Sair'
}

export default function Logout() {
	return (
		<div className='p-4 sm:p-8 w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 gap-5 animate-smooth-display'>
			<SystemLogout />
		</div>
	)
}
