'use client'
import React, { useEffect, useRef, useState } from "react"
import { OptimizedVideo } from "./optimized-video"
import { getProxyVideoUrl } from "@/lib/videoProxy"

const testimonials = [
  "They didn't just plan our wedding. They created our perfect day and made us feel like the most important people in the world.",
  "Every detail felt intentional, every moment felt sacred. They understood not just what we wanted, but who we are.",
  "Our families are still talking about how beautifully everything honored our traditions while feeling completely personal to us.",
]

const videos = [
  "https://hsrtiles.in/wp-content/uploads/2026/04/AW_testimonial_xjjdey.webm",
  "https://hsrtiles.in/wp-content/uploads/2026/04/Testimonial_1_1_g5dyft.mp4",
  "https://hsrtiles.in/wp-content/uploads/2026/04/Testimonial_2_1_xm1x4v.mp4",
  "https://hsrtiles.in/wp-content/uploads/2026/11/IMG_6413-2.mp4",
]

function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

function VideoCard({ src, animationStyle }) {
  const proxiedSrc = getProxyVideoUrl(src)

  return (
    <div
      style={{
        ...animationStyle,
        minWidth: 0,
        width: "100%",
      }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          aspectRatio: "9/16",
          borderRadius: "24px",
          boxShadow: "0 8px 48px 0 rgba(120,100,80,0.18), 0 2px 12px 0 rgba(0,0,0,0.08)",
        }}
      >
        {/* Inset border shimmer */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: "24px",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
          }}
        />

        <OptimizedVideo
          src={src}
          className="absolute inset-0 w-full h-full object-cover block"
          controls
          muted
          playsInline
          loop
          lazy={true}
        />
      </div>
    </div>
  )
}

function Feedback() {
  const [sectionRef, sectionInView] = useInView()

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-20 md:px-12 lg:px-20 bg-background overflow-hidden"
    >
      {/* Soft ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(180,160,140,0.10) 0%, transparent 80%)",
        }}
      />

      <div className="relative max-w-xl mx-auto flex flex-col items-center gap-10">

        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
            What Our Couples Say
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-wide text-foreground">
            Words from the Heart
          </h2>
          <div
            className="mx-auto mt-4 h-px bg-foreground/15"
            style={{
              width: sectionInView ? "64px" : "0px",
              transition: "width 1s ease 0.4s",
            }}
          />
        </div>

        {/* 3 Story Cards */}
        <div className="flex flex-col gap-4 w-full">
          {testimonials.map((quote, idx) => (
            <div
              key={idx}
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.7s ease ${0.3 + idx * 0.15}s, transform 0.7s ease ${0.3 + idx * 0.15}s`,
              }}
            >
              <div
                className="relative bg-white/70 rounded-2xl px-6 py-5 text-center"
                style={{
                  boxShadow: "0 2px 24px 0 rgba(160,140,120,0.10), 0 1px 4px 0 rgba(0,0,0,0.04)",
                  border: "1px solid rgba(180,160,140,0.13)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="absolute top-3 left-5 text-3xl font-serif leading-none select-none"
                  style={{ color: "rgba(180,160,140,0.25)" }}
                  aria-hidden
                >
                  "
                </span>
                <p className="text-[14px] md:text-[15px] font-light text-foreground/70 leading-relaxed pt-2">
                  {quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Videos in a 2x2 Grid with native default controls */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto py-8 px-2"
      >
        {videos.map((src, idx) => (
          <VideoCard
            key={idx}
            src={src}
            animationStyle={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
              transition: `opacity 0.9s ease ${0.75 + idx * 0.15}s, transform 0.9s ease ${0.75 + idx * 0.15}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Feedback