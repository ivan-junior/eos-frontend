'use client'
import Cookies from 'js-cookie'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SystemLogout() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [isMounted])

	if (!isMounted) {
		return null
	}

	const logout = () => {
		Cookies.remove('token')
		document.location.href = document.location.origin + '/login'
	}

	setTimeout(() => {
		logout()
	}, 1000)

	return (
		<div className='flex flex-col items-center gap-4'>
			<Loader size={30} className='animate-spin text-eos-secondary' />
			Bye bye....
		</div>
	)
}
