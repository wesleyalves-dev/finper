import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Finper',
  description: 'Gestão pessoal de ativos'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="h-screen bg-gray-100">{children}</body>
    </html>
  )
}
