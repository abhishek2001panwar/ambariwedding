import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ambari Weddings - Crafting Timeless Wedding Experiences in Bengaluru and Beyond',
  description: 'Ambari Weddings is a premier wedding planning service based in Bengaluru, India. We specialize in creating personalized, elegant, and unforgettable wedding experiences for couples. Our team of expert planners works closely with you to bring your vision to life, ensuring every detail is perfect. From intimate ceremonies to grand celebrations, we are dedicated to making your special day truly magical.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <Navigation />
      <body className="font-sans antialiased">{children}</body>
      <Footer />
    </html>
  )
}
