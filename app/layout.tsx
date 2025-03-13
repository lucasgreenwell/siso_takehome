import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SISO Take Home',
  description: 'SISO Take Home',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
