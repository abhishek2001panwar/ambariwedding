'use client'
import React, { useEffect, useRef, useState } from "react"
import { OptimizedVideo } from "./optimized-video"

const testimonials = [
  "They didn't just plan our wedding. They created our perfect day and made us feel like the most important people in the world.",
  "Every detail felt intentional, every moment felt sacred. They understood not just what we wanted, but who we are.",
  "Our families are still talking about how beautifully everything honored our traditions while feeling completely personal to us.",
]

const videos = [
  "https://res.cloudinary.com/dxxvbrgie/video/upload/q_auto,f_auto/v1772823167/AW_testimonial_xjjdey.mp4",
  "https://res.cloudinary.com/dxxvbrgie/video/upload/v1773233824/Testimonial_1_1_g5dyft.mp4",
  "https://res.cloudinary.com/dxxvbrgie/video/upload/v1773233818/Testimonial_2_1_xm1x4v.mp4",
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

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function UnmuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

// Each video card manages its own mute state independently
function VideoCard({ src, animationStyle }) {
  const [muted, setMuted] = useState(true)
  const containerRef = useRef(null)

  const toggleMute = () => {
    const video = containerRef.current?.querySelector("video")
    if (video) {
      video.muted = !video.muted
      setMuted(video.muted)
    }
  }

  return (
    <div
      style={{
        ...animationStyle,
        flex: "1 1 0",
        minWidth: 0,
        width: "100%",
      }}
    >
      <div
        ref={containerRef}
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

        {/* Mute / Unmute button */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 z-20 flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            cursor: "pointer",
            transition: "background 0.2s ease",
            boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.58)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.38)"}
        >
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>

        <video
          src={src}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{}}
          muted
          playsInline
          loop
          autoPlay
         
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

      {/* 3 Videos — each with its own independent mute state */}
      <div
        className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto py-5 px-2"
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