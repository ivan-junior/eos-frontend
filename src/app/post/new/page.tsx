import NewPostForm from '@/components/NewPostForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Novo Post'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function NewPost() {
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Novo Post</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-2xl'>
				<NewPostForm />
			</div>
		</div>
	)
}
