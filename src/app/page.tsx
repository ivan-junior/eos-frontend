import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
	title: {
		template: '%s | EOS Teste',
		default: 'EOS Teste'
	},
	description: 'Desafio da EOS para vaga de Dev Fullstack'
}

export default function Home() {
	const token = cookies().get('token')?.value
	if (!token) {
		redirect('/login')
	} else {
		redirect('/feed')
	}
}
