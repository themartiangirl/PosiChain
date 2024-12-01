import { NextResponse } from 'next/server'

let messages: string[] = [
  "You're capable of amazing things!",
  "Your potential is limitless!",
  "Believe in yourself, and others will too!",
]

export async function GET() {
  const randomIndex = Math.floor(Math.random() * messages.length)
  const randomMessage = messages[randomIndex]
  return NextResponse.json({ message: randomMessage })
}


