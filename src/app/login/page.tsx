import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Login'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Login() {
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 text-black dark:text-white dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Login</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-lg'>
				<LoginForm />
			</div>
		</div>
	)
}
