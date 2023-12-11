'use client'
import Input from './Input'
import Button from './Button'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Alert from './Alert'
import Select from './Select'
import Cookies from 'js-cookie'

interface UserData {
	id: string
	name: string
	email: string
	profile: string
	createdAt: string
	updatedAt: string
}

export default function ProfileForm({ userData }: { userData: UserData }) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	async function handleUpdateUserForm(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/edit/${formData.get('id')}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'PUT',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
				profile: formData.get('profile'),
				password: formData.get('password')
			})
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			router.refresh()
		}
		setIsLoading(false)
	}

	return (
		<form className='space-y-4' onSubmit={handleUpdateUserForm}>
			{isAlertMessageVisible && <Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />}
			<input type='hidden' name='id' defaultValue={userData.id} />
			<div className='flex flex-col'>
				<label htmlFor='name' className='text-lg'>
					Nome Completo
				</label>
				<Input type='text' id='name' name='name' placeholder='Digite seu Nome Completo' defaultValue={userData.name} />
			</div>
			<div className='flex flex-col'>
				<label htmlFor='email' className='text-lg'>
					Email
				</label>
				<Input type='email' id='email' name='email' placeholder='Digite seu Email' defaultValue={userData.email} />
			</div>
			<div className='flex flex-col'>
				<label htmlFor='profile' className='text-lg'>
					Perfil
				</label>
				<Select name='profile' defaultValue={userData.profile}>
					<option value=''>Selecione</option>
					<option value='user'>User</option>
					<option value='admin'>Admin</option>
				</Select>
				<div className='text-xs mt-2'>
					(apenas para o teste, já que não é normal o usuário alterar o próprio perfil)
				</div>
			</div>
			<div className='flex flex-col'>
				<label htmlFor='password' className='text-lg'>
					Senha
				</label>
				<Input
					type='password'
					id='password'
					name='password'
					placeholder='Deixe a senha em branco caso não queira alterá-la'
				/>
			</div>
			<div className='flex justify-end'>
				<Button type='submit' isLoading={isLoading}>
					Salvar
				</Button>
			</div>
		</form>
	)
}
