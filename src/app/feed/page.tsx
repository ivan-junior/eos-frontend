import { cookies } from 'next/headers'
import Post from '@/components/Post'
import { Post as PostInterface } from '@/interfaces/Post'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Seu Feed'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Feed() {
	const token = cookies().get('token')?.value
	if (!token) {
		redirect('/login')
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/all`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	const posts: PostInterface[] = await res.json()
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Feed</div>
			{posts.map((post) => {
				return <Post postData={post} key={post.id} />
			})}
		</div>
	)
}
