'use client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import Alert from './Alert'
import Input from './Input'
import Button from './Button'
import Select from './Select'

export default function SignUpForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	async function handleSignUpSubmit(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/add`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
				password: formData.get('password'),
				profile: formData.get('profile')
			})
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			router.push('/login')
		}
		setIsLoading(false)
	}
	return (
		<form className='space-y-4' onSubmit={handleSignUpSubmit}>
			{isAlertMessageVisible && <Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />}
			<div className='flex flex-col'>
				<label htmlFor='name' className='text-lg'>
					Nome Completo
				</label>
				<Input type='text' id='name' name='name' placeholder='Digite seu Nome Completo' />
			</div>
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
			<div className='flex flex-col'>
				<label htmlFor='profile' className='text-lg'>
					Perfil
				</label>
				<Select name='profile'>
					<option value=''>Selecione</option>
					<option value='user'>User</option>
					<option value='admin'>Admin</option>
				</Select>
				<div className='text-xs mt-2'>
					(apenas para o teste, já que não é normal o usuário que se cadastra selecionar o próprio perfil)
				</div>
			</div>
			<div className='flex justify-end'>
				<Button type='submit' isLoading={isLoading}>
					Cadastrar
				</Button>
			</div>
		</form>
	)
}
