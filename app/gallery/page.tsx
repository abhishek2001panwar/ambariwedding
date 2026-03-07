"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type MediaItem =
  | { type: "video"; src: string; label?: string; orientation?: "portrait" | "landscape" }
  | { type: "photo"; src: string; alt?: string; orientation?: "portrait" | "landscape" }

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY DATA
// ─────────────────────────────────────────────────────────────────────────────

const GALLERY_ITEMS: MediaItem[] = [
  // Row 1 — Wedding × Reception × Haldi
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832667/Video_16_iveleu.mp4",
    label: "The Wedding",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832669/Video_15_uf3gsl.mp4",
    label: "Reception",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832676/Video_13_qj0tfk.mp4",
    label: "Haldi",
    orientation: "portrait",
  },

  // Row 2 — Sangeet × Wedding × Carnival
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832676/Video_17_t3rxqn.mp4",
    label: "Sangeet",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832675/Video_9_p7dbzl.mp4",
    label: "Sacred Vows",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832676/AW_reel7_mikypz.mp4",
    label: "Carnival",
    orientation: "landscape",
  },

  // Row 3 — Haldi × Carnival × Sangeet
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832687/Video_10_fscmcq.mp4",
    label: "Haldi Joy",
    orientation: "portrait",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772832691/REEL4_xtbdxq.mp4",
    label: "Carnival",
    orientation: "landscape",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784322/Video_4_fodf7i.mp4",
    label: "Sangeet Night",
    orientation: "portrait",
  },

 
]

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINT HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop")
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop")
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return bp
}

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
        videoRef.current?.play().catch(() => {})
        setPlaying(true)
      } else {
        videoRef.current?.pause()
        setPlaying(false)
      }
    }, { threshold: 0.15 })
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
        position: "relative", borderRadius: "4px", overflow: "hidden",
        background: "#111", width: "100%", height: "100%",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <video
        ref={videoRef}
        src={src} 
        autoPlay
        muted 
        playsInline 
        webkit-playsinline="true"
        loop
        preload="metadata"
        onTimeUpdate={() => {
          const v = videoRef.current
          if (v?.duration) setProgress((v.currentTime / v.duration) * 100)
        }}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: orientation === "portrait" ? "center top" : "center center",
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
        padding: "12px 14px",
        display: "flex", alignItems: "center", gap: "9px",
      }}>
        <button onClick={toggle} style={{
          width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
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
        position: "relative", borderRadius: "4px", overflow: "hidden",
        background: "#e8e2da", width: "100%", height: "100%",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        boxShadow: hov ? "0 24px 56px rgba(26,20,16,0.16)" : "0 4px 16px rgba(26,20,16,0.06)",
      }}
    >
      <img
        src={src} alt={alt || ""}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: orientation === "portrait" ? "center top" : "center center",
          display: "block",
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.8s ease",
        }}
      />
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
// BENTO ROW — responsive layout per breakpoint
// ─────────────────────────────────────────────────────────────────────────────
function BentoRow({
  items,
  rowIndex,
  bp,
}: {
  items: MediaItem[]
  rowIndex: number
  bp: "mobile" | "tablet" | "desktop"
}) {
  const [a, b, c] = items

  // ── MOBILE: single column, each cell natural height ──────────────────────
  if (bp === "mobile") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {[a, b, c].filter(Boolean).map((item, i) => (
          <div key={i} style={{ height: item.orientation === "portrait" ? "280px" : "200px" }}>
            <MediaCell item={item} />
          </div>
        ))}
      </div>
    )
  }

  // ── TABLET: center spans full width top; flanks side-by-side below ───────
  if (bp === "tablet") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {b && (
          <div style={{ height: "320px" }}>
            <MediaCell item={b} />
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {a && <div style={{ height: "240px" }}><MediaCell item={a} /></div>}
          {c && <div style={{ height: "240px" }}><MediaCell item={c} /></div>}
        </div>
      </div>
    )
  }

  // ── DESKTOP: alternating bento patterns ──────────────────────────────────
  const isPatternA = rowIndex % 2 === 0
  const cols   = isPatternA ? "0.72fr 1.56fr 0.72fr" : "1.28fr 0.94fr 1.28fr"
  const height = isPatternA ? "480px" : "360px"

  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: "6px", height }}>
      {[a, b, c].filter(Boolean).map((item, i) => (
        <MediaCell key={i} item={item} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY SECTION
// ─────────────────────────────────────────────────────────────────────────────
function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVis, setHeaderVis] = useState(false)
  const bp = useBreakpoint()

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVis(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) io.observe(headerRef.current)
    return () => io.disconnect()
  }, [])

  const rows: MediaItem[][] = []
  for (let i = 0; i < GALLERY_ITEMS.length; i += 3) {
    rows.push(GALLERY_ITEMS.slice(i, i + 3))
  }

  return (
    <section style={{
      background: "#0d0b09",
      padding: "clamp(48px, 8vw, 120px) clamp(16px, 5vw, 60px)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(32px, 5vw, 80px)",
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <p style={{
            fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
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

        {/* Grid rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {rows.map((rowItems, i) => (
            <BentoRow key={i} items={rowItems} rowIndex={i} bp={bp} />
          ))}
        </div>

        {/* Footer rule */}
        <div style={{
          marginTop: "clamp(32px, 5vw, 80px)",
          display: "flex", alignItems: "center", gap: "20px", opacity: 0.15,
        }}>
          <div style={{ flex: 1, height: "1px", background: "#c9a96e" }}/>
          <svg viewBox="0 0 200 16" style={{ width: "80px" }} fill="none">
            <circle cx="100" cy="8" r="3" fill="#c9a96e"/>
            <circle cx="88" cy="8" r="1.5" fill="#c9a96e"/>
            <circle cx="112" cy="8" r="1.5" fill="#c9a96e"/>
          </svg>
          <div style={{ flex: 1, height: "1px", background: "#c9a96e" }}/>
        </div>
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
        <video
          src="https://res.cloudinary.com/dxxvbrgie/video/upload/q_auto,f_auto/v1772786084/gallery_anmzec.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
        {/* Stronger gradient on mobile so text stays legible */}
        <div className="absolute inset-0 bg-foreground/60 md:bg-foreground/50" />
        {/* Extra bottom vignette for text readability on mobile */}
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