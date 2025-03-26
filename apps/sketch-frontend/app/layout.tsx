import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/AuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drawify - Collaborative Whiteboard Tool',
  description:
    'Create diagrams, wireframes, and illustrations with our intuitive whiteboard tool.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
        {<AppBar />}
        {children}
        <Toaster richColors position="top-right" />
        {<Footer />}
        </AuthProvider>
      </body>
    </html>
  )
}

