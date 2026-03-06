import Link from "next/link"
import { Button } from "./button"


const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
  
]


const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/ambari_weddings?igsh=MWxtd250Z3NoZGEydg==" },
  
]

export function Footer() {
  return (
    <footer className="px-6 py-16 md:px-12 lg:px-20 border-t border-border bg-foreground text-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-20">
        {/* Brand and description */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.2em] uppercase text-background hover:text-primary transition-colors duration-300"
          >
            Ambari Weddings
          </Link>
          <p
            className="text-sm leading-[1.75] text-background/70 mt-2 max-w-xs"
          >
            Every great love story deserves a beautiful beginning. Let's create yours together.
          </p>
          <p className="text-sm leading-[1.75] text-background/70 mt-2 max-w-xs">
            Crafting timeless wedding experiences in Bengaluru and beyond. Personal, elegant, unforgettable.
          </p>
        </div>

        {/* Right column: Stay Inspired, Navigation, Social */}
        <div className="md:col-span-7 md:col-start-6 flex flex-col gap-8">
          {/* Stay Inspired on top */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/60 mb-2">Begin Your Journey</p>
            <p className="text-sm text-background/70 mb-2">Schedule your consultation and discover how we transform dreams into unforgettable <br />
celebrations that honor your story and touch your heart.</p>
           
          </div>
          {/* Navigation and Social below */}
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50 mb-3">Navigation</p>
              <div className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-background/70  transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50 mb-3">Social</p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-background/70  transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-2 border-t border-border gap-4">
        <p className="text-[11px] tracking-[0.1em] text-background/50">
          {"Ambari Weddings. All rights reserved."}
        </p>
        <p className="text-[11px] tracking-[0.1em] text-background/50">
          Bengaluru, Karnataka
        </p>
      </div>
    </footer>
  )
}
