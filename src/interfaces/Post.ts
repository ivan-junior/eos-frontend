export interface Post {
	error?: string
	id: string
	userId: string
	title: string
	description: string
	thumbnailUrl: string
	createdAt: string
	updatedAt: string
	commentaries: Commentary[]
	metadata: PostMetadata
	user: User
}

export interface Commentary {
	id: string
	userId: string
	postId: string
	description: string
	createdAt: string
	updatedAt: string
	user: User
}

export interface PostMetadata {
	id: string
	postId: string
	viewCount: number
	likeCount: number
	dislikeCount: number
}

export interface User {
	id: string
	name: string
}
