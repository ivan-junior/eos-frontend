'use client'
import { FormEvent, useState } from 'react'
import Input from './Input'
import Button from './Button'
import Alert from './Alert'
import Cookies from 'js-cookie'
import Link from 'next/link'

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/authenticate`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			Cookies.set('token', json.token, { expires: 1 })
			document.location.href = document.location.origin + '/feed'
		}
		setIsLoading(false)
	}
	return (
		<form className='space-y-4' onSubmit={handleLoginSubmit}>
			{isAlertMessageVisible && <Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />}
			<div className='flex flex-col'>
				<label htmlFor='email' className='text-lg'>
					Email
				</label>
				<Input type='email' id='email' name='email' placeholder='Digite seu Email' />
			</div>
			<div className='flex flex-col'>
				<label htmlFor='password' className='text-lg'>
					Senha
				</label>
				<Input type='password' id='password' name='password' placeholder='Digite sua senha' />
			</div>
			<div className='flex justify-between'>
				<Link href='/cadastro'>
					<Button type='button'>Cadastre-se</Button>
				</Link>
				<Button type='submit' isLoading={isLoading}>
					Entrar
				</Button>
			</div>
		</form>
	)
}
