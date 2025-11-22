import type { Metadata } from 'next'
import { Cinzel, Dancing_Script, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-serif' })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: '--font-script' })
const openSans = Open_Sans({ subsets: ["latin"], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Samhita Music Forum - Hindustani Classical Music in Sirsi',
  description: 'Learn tabla, vocal, and Hindustani classical music at Samhita Music Forum in Sirsi, Karnataka',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${cinzel.variable} ${dancingScript.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
