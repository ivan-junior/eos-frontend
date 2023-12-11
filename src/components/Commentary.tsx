import { Commentary } from '@/interfaces/Post'
import { UserDecoded } from '@/lib/user'
import dayjs from 'dayjs'
import { User2, Pencil, Trash } from 'lucide-react'
import Textarea from './Textarea'
import { FormEvent, useState } from 'react'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'
import Alert from './Alert'
import Button from './Button'

interface CommentaryComponentProps {
	commentaryData: Commentary
	postId: string
	postAuthorId: string
	updatePostCommentsById?: (commentaryId: string) => void
}

export default function CommentaryComponent({
	commentaryData,
	postAuthorId,
	updatePostCommentsById
}: CommentaryComponentProps) {
	const [isEditCommentaryFormVisible, setIsEditCommentaryFormVisible] = useState(false)
	const [isDeleteCommentaryFormVisible, setIsDeleteCommentaryFormVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [commentary, setCommentary] = useState<Commentary>(commentaryData)
	const user: UserDecoded = decode(`${Cookies.get('token')}`)

	async function handleEditCommentary(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/edit/${formData.get('commentaryId')}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'PUT',
			body: JSON.stringify({
				description: formData.get('description')
			})
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			setCommentary(json)
			setIsEditCommentaryFormVisible(false)
		}
	}

	async function handleDeleteCommentary(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/delete/${formData.get('commentaryId')}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'DELETE'
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			updatePostCommentsById && updatePostCommentsById(String(formData.get('commentaryId')))
		}
	}

	return (
		<div className='bg-zinc-200 dark:bg-gray-700 p-2 my-4 rounded-lg'>
			<div className='flex items-center gap-4'>
				<div className='border rounded-full'>
					<User2 size={24} />
				</div>
				<div className='flex flex-col'>
					<div className='text-sm'>{commentary.user.name} Postou</div>
					<div className='text-xs'>{dayjs(commentary.createdAt).fromNow()}</div>
				</div>
			</div>
			<div className='mt-1'>{commentary.description}</div>
			<div className='flex justify-end gap-4 my-1'>
				{commentary.userId === user.userId && (
					<Pencil
						size={20}
						onClick={() => setIsEditCommentaryFormVisible(!isEditCommentaryFormVisible)}
						className='cursor-pointer'
					/>
				)}
				{(commentary.userId === user.userId || user.userId === postAuthorId) && (
					<Trash
						size={20}
						onClick={() => setIsDeleteCommentaryFormVisible(!isDeleteCommentaryFormVisible)}
						className='cursor-pointer'
					/>
				)}
			</div>
			{isEditCommentaryFormVisible && (
				<form onSubmit={handleEditCommentary}>
					<input type='hidden' defaultValue={commentary.id} name='commentaryId' />
					<Textarea defaultValue={commentary.description} name='description' />
					<div className='flex justify-end gap-4'>
						<Button type='button' onClick={() => setIsEditCommentaryFormVisible(false)}>
							Cancelar
						</Button>
						<Button type='submit'>Salvar</Button>
					</div>
				</form>
			)}
			{isDeleteCommentaryFormVisible && (
				<form onSubmit={handleDeleteCommentary}>
					<input type='hidden' defaultValue={commentary.id} name='commentaryId' />
					<span>Tem certeza que deseja remover o comentário da postagem?</span>
					<div className='flex justify-end gap-4'>
						<Button type='button' onClick={() => setIsDeleteCommentaryFormVisible(false)}>
							Não
						</Button>
						<Button type='submit'>Sim</Button>
					</div>
				</form>
			)}
			{isAlertMessageVisible && (
				<div className='my-4'>
					<Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />
				</div>
			)}
		</div>
	)
}
