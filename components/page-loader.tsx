"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true on client side
    setIsMounted(true)

    // Faster loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoaded(true), 200)
          return 100
        }
        // Much faster increment for quicker loading
        const increment = prev < 70 ? Math.random() * 25 + 15 : Math.random() * 10 + 5
        return Math.min(prev + increment, 100)
      })
    }, 80)

    // Check if page is actually loaded
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => setIsLoaded(true), 200)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  // Don't render anything on server side
  if (!isMounted || isLoaded) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* Logo */}
      <div className="relative mb-12 animate-fade-in w-24 h-24 md:w-32 md:h-32">
        <div className="absolute inset-0 blur-xl opacity-30 bg-[#c9a96e]/40 rounded-full" />
        <Image
          src="/logo.png"
          alt="Ambari Weddings"
          width={128}
          height={128}
          priority
          className="relative object-contain filter drop-shadow-xl"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>

      {/* Brand Name */}
      <div className="mb-8 text-center animate-fade-in-delay">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-foreground/80">
          Ambari Weddings
        </h1>
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-foreground/40 mt-2">
          Crafting Timeless Experiences
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 md:w-80 mb-4">
        <div className="h-px bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c9a96e]/60 via-[#c9a96e] to-[#c9a96e]/60 transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 20px rgba(201,169,110,0.5)",
            }}
          />
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-sm md:text-base font-light text-foreground/60 tracking-wider">
        {Math.round(progress)}%
      </div>

      {/* Decorative Ornament */}
      <div className="mt-12 animate-fade-in-delay-2">
        <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
          <circle cx="24" cy="24" r="21" stroke="#c9a96e" strokeWidth="0.6" opacity="0.3" />
          <circle cx="24" cy="24" r="2.5" fill="#c9a96e" opacity="0.4">
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <line x1="24" y1="3" x2="24" y2="12" stroke="#c9a96e" strokeWidth="0.6" opacity="0.3" />
          <line x1="24" y1="36" x2="24" y2="45" stroke="#c9a96e" strokeWidth="0.6" opacity="0.3" />
          <line x1="3" y1="24" x2="12" y2="24" stroke="#c9a96e" strokeWidth="0.6" opacity="0.3" />
          <line x1="36" y1="24" x2="45" y2="24" stroke="#c9a96e" strokeWidth="0.6" opacity="0.3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  )
}
