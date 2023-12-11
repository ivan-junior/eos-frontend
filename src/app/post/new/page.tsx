import NewPostForm from '@/components/NewPostForm'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Novo Post'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function NewPost() {
	const token = cookies().get('token')?.value
	if (!token) {
		redirect('/login')
	}
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 text-black dark:text-white dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Novo Post</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-2xl'>
				<NewPostForm />
			</div>
		</div>
	)
}
