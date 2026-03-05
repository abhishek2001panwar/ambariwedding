"use client";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";


import React, { useEffect, useRef, useState, useCallback } from "react";


function page() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Navigation />
      <section
        ref={ref}
        className="relative h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* <video
          src="https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-12.mp4"
          autoPlay
          loop
          muted
          className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${
            visible ? "scale-100" : "scale-100"
          }`}
        /> */}
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-20 md:pb-20">
          <div className="max-w-5xl">
            <div
              className={`overflow-hidden mb-6 transition-all duration-1000 delay-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50">
                Our Work{" "}
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-5xl  font-light leading-[1.05] tracking-[-0.03em] text-background text-balance">
                Every celebration tells a story.
                <br className="hidden md:block" />
                Every detail becomes a memory.
                <br className="hidden md:block" />
                This is the world of Ambari.{" "}
              </h1>
            </div>
          </div>

          <div
            className={`mt-16 md:mt-20 flex items-center gap-6 transition-all duration-1000 delay-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-px bg-background/30" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-background/40">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>
      <WorkSection />
      
    </div>
  );
}

export default page;




// ── DATA ──────────────────────────────────────────────────────────────────────
const chapters = [
  {
    id: "sangeet",
    num: "01",
    label: "The Sangeet",
    accent: "#c9a96e",
    items: [
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-46.png", alt: "Sangeet 1" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-9.mp4",  label: "Opening Night" },
      { type: "photo",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-47.png", alt: "Sangeet 2" },
      { type: "video",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-13.mp4",           label: "Dance Floor" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-33.jpg",  alt: "Sangeet 3" },
    ],
  },
  {
    id: "reception",
    num: "02",
    label: "The Reception",
    accent: "#8aab9e",
    items: [
      { type: "video",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-23.mp4",       label: "Grand Entrance" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/IMG_20260125_181955777-1-scaled.jpg", alt: "Reception 1" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-35.mp4",        label: "First Dance" },
      { type: "photo",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-25.jpg",        alt: "Reception 2" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-34.mp4",        label: "Celebrations" },
    ],
  },
  {
    id: "haldi",
    num: "03",
    label: "The Haldi",
    accent: "#c9a96e",
    items: [
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-13.jpg",  alt: "Haldi 1" },
      { type: "video",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-11.mp4",  label: "Golden Ritual" },
      { type: "photo",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-7.jpg",   alt: "Haldi 2" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-10.mp4", label: "Joy" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-3.jpg",   alt: "Haldi 3" },
    ],
  },
  {
    id: "wedding",
    num: "04",
    label: "The Wedding",
    accent: "#c9a96e",
    items: [
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-12.mp4",          label: "The Ceremony" },
      { type: "photo",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-44.png", alt: "Wedding 1" },
      { type: "video",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-36.mp4", label: "Sacred Vows" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-30.jpg", alt: "Wedding 2" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-31.jpg", alt: "Wedding 3" },
    ],
  },
  {
    id: "carnival",
    num: "05",
    label: "The Carnival",
    accent: "#b8908a",
    items: [
      { type: "photo",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-39.png",  alt: "Carnival 1" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-15.mp4", label: "The Carnival" },
      { type: "photo",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-40.png",  alt: "Carnival 2" },
      { type: "video",  aspect: "landscape", src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-37.mp4", label: "Revelry" },
      { type: "video",  aspect: "portrait",  src: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-17.mp4", label: "Magic" },
    ],
  },
];

// ── ICONS ─────────────────────────────────────────────────────────────────────
const PlayIcon  = () => <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><polygon points="6,3 20,12 6,21"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>;

// ── MEDIA ITEM ────────────────────────────────────────────────────────────────
function MediaItem({ item, accent, index }) {
  const videoRef = useRef(null);
  const wrapRef  = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const isPortrait = item.aspect === "portrait";

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (item.type === "video" && videoRef.current) {
          videoRef.current.play().catch(() => {});
          setPlaying(true);
        }
      } else {
        if (item.type === "video" && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [item.type]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
  }, []);

  const delay = `${index * 0.08}s`;

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.75s ${delay} ease, transform 0.75s ${delay} ease, box-shadow 0.4s ease`,
        borderRadius: "3px",
        overflow: "hidden",
        position: "relative",
        background: "#ede8e2",
        gridRow: isPortrait ? "span 2" : "span 1",
        boxShadow: hovered
          ? "0 20px 52px rgba(26,20,16,0.13)"
          : "0 2px 14px rgba(26,20,16,0.07)",
      }}
    >
      {item.type === "photo" ? (
        <>
          <img
            src={item.src}
            alt={item.alt}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.7s ease",
            }}
          />
          {/* warm gold wash on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(201,169,110,0.2) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
            pointerEvents: "none",
          }}/>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.src}
            muted playsInline loop
            onTimeUpdate={onTimeUpdate}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(20,14,10,0.6) 0%, transparent 50%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "12px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={togglePlay}
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.2s",
                }}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <span style={{
                fontSize: "9px", letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 300,
              }}>
                {item.label}
              </span>
              <div style={{
                flex: 1, height: "1.5px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "1px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", width: `${progress}%`,
                  background: accent, borderRadius: "1px",
                  transition: "width 0.2s linear",
                }}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── CHAPTER ───────────────────────────────────────────────────────────────────
function Chapter({ chapter, chapterIndex }) {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ marginBottom: "110px", position: "relative" }}>

      {/* Header */}
      <div
        ref={headerRef}
        style={{
          display: "flex", alignItems: "center", gap: "24px",
          marginBottom: "40px",
          opacity:    headerVisible ? 1 : 0,
          transform:  headerVisible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        <span style={{
          fontSize: "10px", letterSpacing: "0.42em",
          color: chapter.accent, fontWeight: 300, flexShrink: 0,
        }}>
          {chapter.num}
        </span>

        <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.3)" }}/>

        <h2 style={{
          fontSize: "clamp(26px, 3.5vw, 48px)",
          fontWeight: 300, color: "#1a1410",
          letterSpacing: "-0.02em", lineHeight: 1,
          flexShrink: 0,
        }}>
          {chapter.label.split(" ")[0]}{" "}
          <em style={{ color: chapter.accent, fontStyle: "" }}>
            {chapter.label.split(" ").slice(1).join(" ")}
          </em>
        </h2>

        <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.3)" }}/>
      </div>

      {/* 5-col × 2-row grid  —  portrait items span both rows */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(2, 248px)",
        gap: "8px",
      }}>
        {chapter.items.map((item, i) => (
          <MediaItem
            key={i}
            item={item}
            accent={chapter.accent}
            index={i + chapterIndex * 5}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ textAlign: "center", paddingTop: "56px", opacity: 0.22 }}>
        <svg viewBox="0 0 240 20" style={{ width: "160px" }} fill="none">
          <line x1="0"   y1="10" x2="90"  y2="10" stroke="#c9a96e" strokeWidth="0.7"/>
          <circle cx="110" cy="10" r="3.5" fill="#c9a96e"/>
          <circle cx="98"  cy="10" r="2"   fill="#c9a96e" opacity="0.5"/>
          <circle cx="122" cy="10" r="2"   fill="#c9a96e" opacity="0.5"/>
          <line x1="130" y1="10" x2="240" y2="10" stroke="#c9a96e" strokeWidth="0.7"/>
        </svg>
      </div>
    </section>
  );
}

// ── NAV DOTS ──────────────────────────────────────────────────────────────────
function NavDots({ active, onNav }) {
  return (
    <div style={{
      position: "fixed", right: "24px", top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "12px",
      zIndex: 100,
    }}>
      {chapters.map((ch, i) => (
        <button
          key={ch.id}
          onClick={() => onNav(ch.id)}
          title={ch.label}
          style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: active === i ? "#c9a96e" : "rgba(201,169,110,0.35)",
            border: active === i ? "none" : "1px solid rgba(201,169,110,0.45)",
            cursor: "pointer", padding: 0,
            transform: active === i ? "scale(1.5)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
function WorkSection() {
  const [activeDot, setActiveDot] = useState(0);
  const introRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIntroVisible(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      chapters.forEach((ch, i) => {
        const el = document.getElementById(`chapter-${ch.id}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveDot(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <NavDots active={activeDot} onNav={scrollTo} />

      <div style={{ background: "#fdf9f4", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 48px 60px" }}>

          {/* Section intro */}
          <div
            ref={introRef}
            style={{
              textAlign: "center", marginBottom: "96px",
              opacity:    introVisible ? 1 : 0,
              transform:  introVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <p style={{
              fontSize: "10px", letterSpacing: "0.48em",
              textTransform: "uppercase", color: "#c9a96e",
              fontWeight: 300, marginBottom: "20px",
            }}>
              Our Portfolio
            </p>
            <h2 style={{
              fontSize: "clamp(38px, 5.5vw, 72px)",
              fontWeight: 300, color: "#1a1410",
              lineHeight: 0.95, letterSpacing: "-0.03em",
            }}>
              Crafted{" "}
              <em style={{ color: "#c9a96e", fontStyle: "italic" }}>memories,</em>
              <br />
              frame by frame.
            </h2>
            <div style={{
              width: "1px", height: "56px",
              background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
              margin: "28px auto 0",
            }}/>
          </div>

          {/* Chapters */}
          {chapters.map((chapter, i) => (
            <div key={chapter.id} id={`chapter-${chapter.id}`}>
              <Chapter chapter={chapter} chapterIndex={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}