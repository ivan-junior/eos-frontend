import { cookies } from 'next/headers'
import { Post } from '@/interfaces/Post'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Admin() {
	const token = cookies().get('token')?.value
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/all`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	const posts: Post[] = await res.json()
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Relatório de Posts</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full'>
				<div className='border rounded-lg'>
					<table className='w-full text-sm text-left rounded-lg'>
						<thead className='uppercase rounded-lg'>
							<tr className='rounded-lg'>
								<th className='py-4 px-2 border-r'>Título</th>
								<th className='py-4 px-2 border-r'>Comentários</th>
								<th className='py-4 px-2 border-r'>Visualizações</th>
								<th className='py-4 px-2'>Curtidas</th>
							</tr>
						</thead>
						<tbody className=''>
							{posts.map((post) => {
								return (
									<tr key={post.id} className='rounded-lg  border-t'>
										<td className='py-4 px-2 border-r'>{post.title}</td>
										<td className='py-4 px-2 border-r'>{post.commentaries.length}</td>
										<td className='py-4 px-2 border-r'>{post.metadata.viewCount}</td>
										<td className='py-4 px-2'>{post.metadata.likeCount}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
