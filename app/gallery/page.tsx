"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { getProxyVideoUrl } from "@/lib/videoProxy"
import { OptimizedVideo } from "@/components/optimized-video"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type MediaItem =
  | { type: "video"; src: string; label?: string; orientation?: "portrait" | "landscape" }
  | { type: "photo"; src: string; alt?: string; orientation?: "portrait" | "landscape" }

// ─────────────────────────────────────────────────────────────────────────────
// ALL GALLERY DATA
// ─────────────────────────────────────────────────────────────────────────────

const ALL_GALLERY_ITEMS: MediaItem[] = [
  // LANDSCAPE ITEMS
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/AW_reel7_mikypz.mp4",
    label: "Reception",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/Video_17_t3rxqn.mp4",
    label: "Sangeet",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/IMG_7517.mp4",
    label: "Grand Celebration",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/IMG_7516.mp4",
    label: "Night Lights",
    orientation: "landscape",
  },

  // PORTRAIT ITEMS
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/Video_13_qj0tfk.webm",
    label: "The Wedding",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/couple_entry_dtqu9y.mp4",
    label: "Haldi",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/Video_9_p7dbzl.mp4",
    label: "Sacred Vows",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/04/Video_6_umurkc.mp4",
    label: "Carnival",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Video-19.mp4",
    label: "Phere Moments",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Video-18.mp4",
    label: "Royal Entry",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Video-17-1.mp4",
    label: "Rituals & Joy",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Video-16.mp4",
    label: "Mehendi Beats",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/South-Indian-Traditional.mp4",
    label: "Warm Smiles",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Ambari.mp4",
    label: "Floral Shower",
    orientation: "portrait",
  },
  // {
  //   type: "video",
  //   src: "https://hsrtiles.in/wp-content/uploads/2026/08/Amba.mp4",
  //   label: "Bridal Glow",
  //   orientation: "portrait",
  // },
  {
    type: "video",
    src: "https://hsrtiles.in/wp-content/uploads/2026/08/Amb.mp4",
    label: "Festive Vibes",
    orientation: "portrait",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const PlayIcon  = () => <svg viewBox="0 0 24 24" fill="white" width="11" height="11"><polygon points="6,3 20,12 6,21"/></svg>
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="white" width="11" height="11"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO CELL
// ─────────────────────────────────────────────────────────────────────────────
function VideoCell({ src, label, orientation }: { src: string; label?: string; orientation?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [vis,      setVis]      = useState(false)
  const [hov,      setHov]      = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true)
        setTimeout(() => {
          videoRef.current?.play().catch(() => {})
          setPlaying(true)
        }, 100)
      } else {
        videoRef.current?.pause()
        setPlaying(false)
      }
    }, { 
      threshold: 0.05,
      rootMargin: "200px"
    })
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }, [])

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: "8px", overflow: "hidden",
        background: "#1a1410", width: "100%", height: "100%",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <video
        ref={videoRef}
        src={getProxyVideoUrl(src)}
        autoPlay={false}
        muted 
        playsInline
        loop
        preload="none"
        onError={() => {}}
        onTimeUpdate={() => {
          const v = videoRef.current
          if (v?.duration) setProgress((v.currentTime / v.duration) * 100)
        }}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: "center center",
          display: "block",
          transform: hov ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.8s ease",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,5,3,0.75) 0%, rgba(8,5,3,0.1) 45%, transparent 70%)",
        pointerEvents: "none",
      }}/>

     

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 16px",
        display: "flex", alignItems: "center", gap: "10px", zIndex: 10
      }}>
        <button onClick={toggle} style={{
          width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        
        <div style={{
          flex: 1, height: "1px",
          background: "rgba(255,255,255,0.12)", borderRadius: "1px", overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "#c9a96e", transition: "width 0.2s linear",
          }}/>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO CELL
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCell({ src, alt, orientation }: { src: string; alt?: string; orientation?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: "8px", overflow: "hidden",
        background: "#e8e2da", width: "100%", height: "100%",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        boxShadow: hov ? "0 24px 56px rgba(26,20,16,0.16)" : "0 4px 16px rgba(26,20,16,0.06)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={src}
          alt={alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          quality={85}
          loading="lazy"
          style={{
            objectPosition: "center center",
            transform: hov ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s ease",
          }}
        />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, transparent 50%, rgba(201,169,110,0.12) 100%)",
        opacity: hov ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none",
      }}/>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA CELL
// ─────────────────────────────────────────────────────────────────────────────
function MediaCell({ item }: { item: MediaItem }) {
  if (item.type === "video") return <VideoCell src={item.src} label={item.label} orientation={item.orientation} />
  return <PhotoCell src={item.src} alt={item.alt} orientation={item.orientation} />
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY SECTION
// ─────────────────────────────────────────────────────────────────────────────
function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVis, setHeaderVis] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVis(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) io.observe(headerRef.current)
    return () => io.disconnect()
  }, [])

  // Separate Landscape & Portrait Videos
  const landscapeItems = ALL_GALLERY_ITEMS.filter((item) => item.orientation === "landscape")
  const portraitItems  = ALL_GALLERY_ITEMS.filter((item) => item.orientation === "portrait")

  return (
    <section style={{
      background: "#0d0b09",
      padding: "clamp(48px, 8vw, 120px) clamp(16px, 4vw, 48px)",
    }}>
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "clamp(40px, 6vw, 80px)",
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <p style={{
          fontSize: "10px", letterSpacing: "0.55em", textTransform: "uppercase",
          color: "#c9a96e", fontWeight: 300, marginBottom: "16px",
        }}>
          Our Gallery
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 5.5vw, 72px)",
          fontWeight: 300, color: "#f5f0e8",
          lineHeight: 0.95, letterSpacing: "-0.03em",
          margin: "0 0 16px",
        }}>
          Every frame,{" "}
          <em style={{ color: "#c9a96e", fontStyle: "italic" }}>a story</em>
        </h2>
      </div>

      {/* 1. LANDSCAPE SECTION — MAX-W-8XL */}
      <div className="max-w-[1920px] mx-auto mb-20 md:mb-32">
        <div className="mb-6 flex items-center gap-4 opacity-70">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
            Cinematic Highlights
          </span>
          <div className="flex-1 h-px bg-[#c9a96e]/20" />
        </div>

        {/* Landscape Grid (Full Widescreen 16/9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {landscapeItems.map((item, index) => (
            <div key={index} className="w-full aspect-[16/9] min-h-[260px] sm:min-h-[380px]">
              <MediaCell item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* 2. PORTRAIT SECTION — 2 PER ROW */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-4 opacity-70">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
            Portrait Reels (2 Per Row)
          </span>
          <div className="flex-1 h-px bg-[#c9a96e]/20" />
        </div>

        {/* Portrait Grid (2 Each / 9:16 Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {portraitItems.map((item, index) => (
            <div key={index} className="w-full aspect-[9/10] max-h-[800px]">
              <MediaCell item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Divider */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-32 flex items-center gap-5 opacity-15">
        <div className="flex-1 h-px bg-[#c9a96e]" />
        <svg viewBox="0 0 200 16" className="w-20" fill="none">
          <circle cx="100" cy="8" r="3" fill="#c9a96e" />
          <circle cx="88" cy="8" r="1.5" fill="#c9a96e" />
          <circle cx="112" cy="8" r="1.5" fill="#c9a96e" />
        </svg>
        <div className="flex-1 h-px bg-[#c9a96e]" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          src="https://ik.imagekit.io/d9tsatbk5/gallery_anmzec.mp4?tr=q-65,h-720,f-auto"
          autoPlay
          loop
          muted
          playsInline
          lazy={false}
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-foreground/60 md:bg-foreground/50" />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-20 md:pb-20">
        <div className="max-w-5xl">
          <div className={`overflow-hidden mb-5 transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/50">
              A Visual Journey - Our Gallery
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-background">
              Portraits that breathe.
              <br className="hidden md:block" />
              Landscapes that sing.
              <br className="hidden md:block" />
              <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Every frame, curated.</em>
            </h1>
          </div>

          <div className={`mt-7 transition-all duration-1000 delay-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div style={{
              display: "inline-flex", gap: "16px", alignItems: "center",
              padding: "8px 18px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "40px", backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.04)",
            }}>
              <span style={{
                fontSize: "clamp(7px, 1.5vw, 8px)",
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(201,169,110,0.7)",
              }}>
                Decor · Moments · Couples · Cinematics
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-12 md:mt-16 flex items-center gap-6 transition-all duration-1000 delay-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="w-10 md:w-12 h-px bg-background/30" />
          <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-background/40">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  return (
    <>
      
      <GallerySection />
    </>
  )
}