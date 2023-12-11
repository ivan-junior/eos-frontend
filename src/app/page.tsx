import { redirect } from 'next/navigation'
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
	redirect('/login')
}
