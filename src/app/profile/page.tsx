import ProfileForm from '@/components/ProfileForm'
import getUserFromToken from '@/lib/user'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Perfil'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Profile() {
	const token = cookies().get('token')?.value
	if (!token) {
		redirect('/login')
	}
	const user = getUserFromToken()
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/one/${user.userId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	const json = await res.json()
	return (
		<div className='p-4 sm:p-8 w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 gap-5'>
			<div className='text-3xl'>Perfil</div>
			<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-lg'>
				<ProfileForm userData={json} />
			</div>
		</div>
	)
}
