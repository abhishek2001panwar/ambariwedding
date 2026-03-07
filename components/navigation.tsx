"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
  
]

// Custom hamburger icon with smooth animation
const HamburgerIcon = ({ isOpen, scrolled }: { isOpen: boolean; scrolled: boolean }) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <div className="w-full h-full relative">
      {/* Top line */}
      <span
        className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ease-in-out ${
          scrolled || isOpen ? "bg-foreground" : "bg-background"
        }`}
        style={{
          top: isOpen ? "50%" : "20%",
          transform: isOpen ? "translateY(-50%) rotate(45deg)" : "translateY(-50%) rotate(0)",
        }}
      />
      {/* Middle line */}
      <span
        className={`absolute left-0 top-1/2 w-full h-[1.5px] -translate-y-1/2 transition-all duration-300 ease-in-out ${
          scrolled || isOpen ? "bg-foreground" : "bg-background"
        }`}
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "translateY(-50%) scaleX(0)" : "translateY(-50%) scaleX(1)",
        }}
      />
      {/* Bottom line */}
      <span
        className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ease-in-out ${
          scrolled || isOpen ? "bg-foreground" : "bg-background"
        }`}
        style={{
          top: isOpen ? "50%" : "80%",
          transform: isOpen ? "translateY(-50%) rotate(-45deg)" : "translateY(-50%) rotate(0)",
        }}
      />
    </div>
  </div>
)

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      setHidden(currentY > lastScrollY && currentY > 400)
      setLastScrollY(currentY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || isOpen ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
          <Link
            href="/"
            className="relative z-[60] transition-opacity duration-300 hover:opacity-80"
          >
            <Image 
            height={20}
            width={32}
            className="w-32 h-20 object-contain" src="/logo.png" alt="Logo" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-500 hover:opacity-100 ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-background/60 hover:text-background"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[60] transition-transform duration-300 hover:scale-110"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon isOpen={isOpen} scrolled={scrolled} />
          </button>
        </nav>
      </header>

      {/* Full-page overlay menu - Mobile only */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-700 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          background: "linear-gradient(135deg, #fdfbf7 0%, #f5f0e8 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full transition-all duration-1000 ${
            isOpen ? "opacity-10 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)",
            transform: isOpen ? "translate(30%, -30%)" : "translate(50%, -50%)",
          }}
        />
        <div
          className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full transition-all duration-1000 delay-100 ${
            isOpen ? "opacity-10 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            background: "radial-gradient(circle, #8aab9e 0%, transparent 70%)",
            transform: isOpen ? "translate(-30%, 30%)" : "translate(-50%, 50%)",
          }}
        />

        {/* Menu content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            {/* Navigation links */}
            <nav className="space-y-1">
              {navLinks.map((link, i) => (
                <div
                  key={link.label}
                  className={`overflow-hidden transition-all duration-700 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${isOpen ? i * 80 + 200 : 0}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group block relative py-2"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-light w-8">
                        0{i + 1}
                      </span>
                      <h2
                        className="text-[clamp(1.75rem,7vw,3.5rem)] font-light tracking-[-0.02em] text-foreground transition-all duration-500 group-hover:translate-x-4"
                        style={{
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {link.label}
                      </h2>
                    </div>
                    <div
                      className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ marginTop: "4px" }}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Additional info */}
            <div
              className={`mt-12 flex flex-col gap-6 transition-all duration-700 delay-700 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">
                  Get in Touch
                </p>
                <a
                  href="mailto:hello@ambariweddings.com"
                  className="text-sm text-foreground/70 hover:text-[#c9a96e] transition-colors duration-300"
                >
                 ambariweddings@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <Link
                    href="https://www.instagram.com/ambari_weddings?igsh=MWxtd250Z3NoZGEydg=="
                    className="text-sm text-foreground/70 hover:text-[#c9a96e] transition-colors duration-300"
                  >
                    Instagram
                  </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
