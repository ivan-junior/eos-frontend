'use client'

import Alert from './Alert'
import Button from './Button'
import Input from './Input'
import { ChangeEvent, FormEvent, useState } from 'react'
import Textarea from './Textarea'
import Cookies from 'js-cookie'

export default function NewPostForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [preview, setPreview] = useState<string | null>(null)

	const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target

		if (!files) return
		const previewUrl = URL.createObjectURL(files[0])

		setPreview(previewUrl)
	}

	const handleNewPostFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		setIsLoading(true)
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/add`, {
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'POST',
			body: formData
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			document.location.href = document.location.origin + '/feed'
		}
		setIsLoading(false)
	}

	return (
		<form className='space-y-4' onSubmit={handleNewPostFormSubmit}>
			{isAlertMessageVisible && <Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />}
			<input type='hidden' name='id' />
			<div className='flex flex-col'>
				<label htmlFor='title' className='text-lg'>
					Título do Post
				</label>
				<Input type='text' id='title' name='title' placeholder='Digite o título do post' required />
			</div>
			<div className='flex flex-col'>
				<Textarea
					name='description'
					required
					placeholder='O que está pensando? Seja lá o que for, digite da maneira mais criativa possível :) ...'
					rows={10}
				/>
			</div>
			<div className='flex items-center justify-between border p-2 rounded-lg'>
				<label htmlFor='thumbnail' className='cursor-pointer'>
					Selecione uma imagem...
				</label>
				<span onClick={() => setPreview(null)} className='cursor-pointer'>
					X
				</span>
			</div>
			<input
				type='file'
				name='thumbnail'
				id='thumbnail'
				accept='image/*'
				className='invisible h-0 w-0'
				onChange={onFileSelect}
			/>
			{preview && <img src={preview} alt='' className='w-full aspect-video rounded-lg object-cover' />}
			<div className='flex justify-end'>
				<Button type='submit' isLoading={isLoading}>
					Criar
				</Button>
			</div>
		</form>
	)
}
