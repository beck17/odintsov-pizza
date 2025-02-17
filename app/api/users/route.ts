import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET() {
	const users = await prisma.user.findMany()
	return NextResponse.json(users)
}

interface UserInterface {
	id: number,
	fullName: string,
	email: string,
	password: string,
}

// export async function POST(req: NextRequest) {
// 	const { fullName, email, password }: UserInterface = await req.json()
//
// 	const user = await prisma.user.create({
// 		data: {
// 			fullName, email, password,
// 		},
// 	})
//
// 	return NextResponse.json(user)
// }

export async function DELETE(req: NextRequest) {
	const { id }: UserInterface = await req.json()

	const user = await prisma.user.findUnique({
		where: {
			id,
		}
	})

	if(!user) return NextResponse.json({ message: 'user not found' })

	await prisma.user.deleteMany({
		where: {
			id
		}
	})

	return NextResponse.json({ message: 'user deleted' })
}