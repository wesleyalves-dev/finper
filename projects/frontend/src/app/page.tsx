import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold">Hello World!!!</h1>
      <Link href="/sign-in">Sign-In</Link>
    </main>
  )
}
