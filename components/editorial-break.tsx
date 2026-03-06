"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export function EditorialBreak() {
  const router = useRouter()
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal(0.15)
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal(0.2)


  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div
          ref={imgRef}
          className={`lg:col-span-7 overflow-hidden transition-all duration-1000 ${
            imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <video
            src="https://res.cloudinary.com/dxxvbrgie/video/upload/v1772786096/aboutvideo_mktthw.mp4"
            className="w-full aspect-[16/10] object-cover  transition-all duration-1000"
            muted
            playsInline
            loop
            autoPlay
          />
        </div>
        <div
          ref={quoteRef}
          className={`lg:col-span-4 lg:col-start-9 transition-all duration-1000 delay-200  gap-5${
            quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-10 h-px bg-foreground/20 mb-8" />
          <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] font-extralight leading-[1.35] tracking-tight text-foreground text-balance">
            {'"'}At Ambari, we believe every couple deserves their moment of true celebration.{'"'}
          </blockquote>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-8">
            From Dreams to Dynasty

          </p>
          <Button onClick={()=>router.push('/gallery')} variant="outline" className="mt-2 md:mt-5">
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
