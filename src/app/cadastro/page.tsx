import SignUpForm from '@/components/SignUpForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cadastro'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function SignUp() {
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 text-black dark:text-white dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Cadastre-se</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-lg'>
				<SignUpForm />
			</div>
		</div>
	)
}
