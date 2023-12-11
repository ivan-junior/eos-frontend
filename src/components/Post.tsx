'use client'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MessageSquare, Pencil, ThumbsDown, ThumbsUp, Trash, User2 } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Alert from './Alert'
import { useRouter } from 'next/navigation'
import Textarea from './Textarea'
import Button from './Button'
import { Commentary, Post, PostMetadata } from '@/interfaces/Post'
import CommentaryComponent from './Commentary'
import { UserDecoded } from '@/lib/user'
import decode from 'jwt-decode'
dayjs.extend(relativeTime)
dayjs.locale(ptBr)

export default function Post({ postData }: { postData: Post }) {
	const router = useRouter()
	const [isMounted, setIsMounted] = useState(false)
	const [isAlertMessageVisible, setIsAlertMessageVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [post, setPost] = useState<Post>(postData)
	const [postMetada, setPostMetadata] = useState<PostMetadata>(postData.metadata)
	const [postComments, setPostComments] = useState<Commentary[]>(postData.commentaries)
	const [isFormAddNewCommentVisible, setIsFormAddNewCommentVisible] = useState(false)
	const [isFormEditPostVisible, setIsFormEditPostVisible] = useState(false)
	const [isFormDeletePostVisible, setIsFormDeletePostVisible] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}
	const user: UserDecoded = decode(`${Cookies.get('token')}`)

	async function handleLike(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/metadata/${formData.get('postId')}/like`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'PATCH'
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			setPostMetadata(json)
		}
	}

	async function handleDislike(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/metadata/${formData.get('postId')}/dislike`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'PATCH'
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			setPostMetadata(json)
		}
	}

	async function handleDelete(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/delete/${formData.get('postId')}`, {
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
			router.refresh()
		}
	}

	async function handleNewCommentarySubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${formData.get('postId')}/add`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			},
			method: 'POST',
			body: JSON.stringify({
				title: formData.get('postTitle'),
				description: formData.get('description')
			})
		})
		const json = await res.json()
		if (json.error) {
			setErrorMessage(json.error)
			setIsAlertMessageVisible(true)
		} else {
			setPostComments([...postComments, json])
		}
	}

	async function handleUpdatePostFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/edit/${formData.get('postId')}`, {
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
			setPost(json)
			setIsFormEditPostVisible(false)
		}
	}

	const updatePostCommentsById = (commentaryId: string) => {
		const newCommentaryList = postComments.filter((postComment) => postComment.id != commentaryId)
		setPostComments(newCommentaryList)
	}

	return (
		<div className='p-4 sm:p-8 bg-white dark:bg-gray-800 w-full rounded-lg max-w-3xl space-y-4'>
			<div className='flex flex-col'>
				<div className='flex items-center gap-4'>
					<div className='border rounded-full'>
						<User2 size={32} />
					</div>
					<div className='flex flex-col'>
						<div className='text-sm'>{post.user.name} Postou</div>
						<div className='text-xs'>{dayjs(post.createdAt).fromNow()}</div>
					</div>
				</div>
				<div className='my-2'>{post.description}</div>
				{post.thumbnailUrl && (
					<div className='w-full'>
						<img src={post.thumbnailUrl} alt='Post image' className='max-w-xs' />
					</div>
				)}
				<div className='flex gap-4 text-xs mt-2'>
					<div>{postMetada.likeCount} curtidas</div>
					<div>{postMetada.dislikeCount} dislikes</div>
					<div>{postMetada.viewCount} visualizações</div>
					<div>
						{postComments.length == 0
							? 'Nenhum comentário por enquanto'
							: postComments.length == 1
								? '1 comentário'
								: `${postComments.length} comentários`}
					</div>
				</div>
				<div className='flex justify-around mt-4 border-t border-t-zinc-600 px-4 pt-4'>
					<div>
						<form onSubmit={handleLike} className='flex gap-2 items-center'>
							<input type='hidden' name='postId' defaultValue={post.id} />
							<button type='submit' className='bg-transparent'>
								<ThumbsUp size={24} />
							</button>
						</form>
					</div>
					<div>
						<form onSubmit={handleDislike} className='flex gap-2 items-center'>
							<input type='hidden' name='postId' defaultValue={post.id} />
							<button type='submit' className='bg-transparent'>
								<ThumbsDown size={24} />
							</button>
						</form>
					</div>
					{post.userId === user.userId && (
						<>
							<div>
								<Pencil
									size={24}
									onClick={() => setIsFormEditPostVisible(!isFormAddNewCommentVisible)}
									className='cursor-pointer'
								/>
							</div>
							<div>
								<Trash
									size={24}
									onClick={() => setIsFormDeletePostVisible(!isFormAddNewCommentVisible)}
									className='cursor-pointer'
								/>
							</div>
						</>
					)}
					<div>
						<MessageSquare
							size={24}
							onClick={() => setIsFormAddNewCommentVisible(!isFormAddNewCommentVisible)}
							className='cursor-pointer'
						/>
					</div>
				</div>
				{isFormEditPostVisible && (
					<div>
						<form onSubmit={handleUpdatePostFormSubmit} className='flex flex-col gap-2 mt-4'>
							<input type='hidden' name='postId' defaultValue={post.id} />
							<input type='hidden' name='postTitle' defaultValue={post.title} />
							<Textarea name='description' defaultValue={post.description} />
							<div className='flex justify-end gap-4'>
								<Button type='button' onClick={() => setIsFormEditPostVisible(false)}>
									Cancelar
								</Button>
								<Button type='submit'>Salvar</Button>
							</div>
						</form>
					</div>
				)}
				{isFormDeletePostVisible && (
					<div>
						<form onSubmit={handleDelete} className='flex flex-col items-end gap-2 mt-4'>
							<input type='hidden' name='postId' defaultValue={post.id} />
							<span>Tem certeza que deseja excluir o post?</span>
							<div className='flex justify-end gap-4'>
								<Button type='button' onClick={() => setIsFormDeletePostVisible(false)}>
									Cancelar
								</Button>
								<Button type='submit'>Sim</Button>
							</div>
						</form>
					</div>
				)}
				{isFormAddNewCommentVisible && (
					<div className='my-4'>
						<form onSubmit={handleNewCommentarySubmit} className=''>
							<input type='hidden' defaultValue={post.id} name='postId' />
							<Textarea name='description' />
							<div className='flex justify-end gap-4'>
								<Button type='button' onClick={() => setIsFormAddNewCommentVisible(false)}>
									Cancelar
								</Button>
								<Button type='submit'>Comentar</Button>
							</div>
						</form>
						{postComments.map((commentary) => {
							return (
								<CommentaryComponent
									key={commentary.id}
									postId={post.id}
									postAuthorId={post.user.id}
									commentaryData={commentary}
									updatePostCommentsById={updatePostCommentsById}
								/>
							)
						})}
					</div>
				)}
				{isAlertMessageVisible && (
					<div className='my-4'>
						<Alert message={errorMessage} onClick={() => setIsAlertMessageVisible(false)} />
					</div>
				)}
			</div>
		</div>
	)
}
