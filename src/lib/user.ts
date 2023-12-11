import decode from 'jwt-decode'
import { cookies } from 'next/headers'

export interface UserDecoded {
	userId: string
	profile: string
}

export default function getUserFromToken() {
	const token = cookies().get('token')?.value

	if (!token) {
		throw new Error('Sessão expirada, por favor, faça o login novamente!')
	}

	const user: UserDecoded = decode(token)

	return user
}
