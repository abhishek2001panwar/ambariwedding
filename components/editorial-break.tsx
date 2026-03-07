"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { OptimizedVideo } from "./optimized-video"

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
          <OptimizedVideo
            src="https://res.cloudinary.com/dxxvbrgie/video/upload/q_auto,f_auto/v1772820287/brand_ipduie.mp4"
            className="w-full aspect-[16/10] object-cover"
            muted
            playsInline
            loop
            autoPlay
            lazy
          />
        </div>
        <div
          ref={quoteRef}
          className={`lg:col-span-4 lg:col-start-9 transition-all duration-1000 delay-200  gap-5${
            quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground mb-3"
          
          >Brand Promise</h1>
          <div className="w-10 h-px bg-foreground/20 mb-8" />
          <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] font-extralight leading-[1.35] tracking-tight text-foreground text-balance">
            {'"'}At Ambari, we believe every couple deserves their moment of true celebration.{'"'}
          </blockquote>
          <p className="text-sm md:text-base font-light leading-[1.8] text-foreground/70 mt-6">
Drawing from 
ancient traditions of hospitality and joy, we create weddings that honor the past while embracing 
your future together. 
Your love story becomes unforgettable - and we make sure it feels that way too. 
            </p>
          <Button onClick={()=>router.push('/portfolio')} variant="outline" className="mt-8">
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
         
 