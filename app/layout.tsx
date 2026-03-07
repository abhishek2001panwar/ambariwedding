import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageLoader } from "@/components/page-loader"

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ambari Weddings - Crafting Timeless Wedding Experiences in Bengaluru and Beyond',
  description: 'Ambari Weddings is a premier wedding planning service based in Bengaluru, India. We specialize in creating personalized, elegant, and unforgettable wedding experiences for couples. Our team of expert planners works closely with you to bring your vision to life, ensuring every detail is perfect. From intimate ceremonies to grand celebrations, we are dedicated to making your special day truly magical.',
  keywords: ['wedding planning', 'Bengaluru weddings', 'luxury weddings', 'wedding planner India', 'event planning', 'wedding decor'],
  authors: [{ name: 'Ambari Weddings' }],
  openGraph: {
    title: 'Ambari Weddings - Crafting Timeless Wedding Experiences',
    description: 'Premier wedding planning service in Bengaluru. Creating personalized, elegant, and unforgettable wedding experiences.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PageLoader />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
