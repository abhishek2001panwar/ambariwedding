"use client";
import { Navigation } from "@/components/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="12" height="12">
    <polygon points="6,3 20,12 6,21" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="12" height="12">
    <rect x="5" y="3" width="4" height="18" />
    <rect x="15" y="3" width="4" height="18" />
  </svg>
);

export function PhotoCell({ src, alt, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
        background: "#e8e2da",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease, box-shadow 0.4s ease`,
        boxShadow: hov
          ? "0 20px 52px rgba(26,20,16,0.14)"
          : "0 2px 14px rgba(26,20,16,0.06)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, transparent 55%, rgba(201,169,110,0.13) 100%)",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export function VideoCell({
  src,
  label,
  accent = "#c9a96e",
  objectPosition = "center center",
  style = {},
  delay = 0,
}) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
        background: "#111",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v?.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,8,4,0.65) 0%, transparent 55%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "13px 15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={toggle}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: accent,
                transition: "width 0.2s linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Accent filler cell — sits in the bottom-center of the bento top row
// Label text removed as requested
function AccentFiller({ num, accent }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        gridArea: "filler",
        borderRadius: "6px",
        background: "#f5f0e8",
        border: "1px solid rgba(201,169,110,0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s 0.25s ease, transform 0.7s 0.25s ease",
      }}
    >
      <span
        style={{
          fontSize: "30px",
          letterSpacing: "0em",
          color: accent,
          fontWeight: 300,
        }}
      >
        {num}
      </span>
    </div>
  );
}

// Chapter header — number label removed, center event name is bigger
function ChapterHeader({ num, label, accent }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const words = label.split(" ");
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "18px",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div
        style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.2)" }}
      />
      {/* Bigger center event name — removed the num label */}
      <h3
        style={{
          fontSize: "25px",
          fontWeight: 400,
          color: "#1a1410",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {words[0]}{" "}
        <em style={{ color: accent, fontStyle: "" }}>
          {words.slice(1).join(" ")}
        </em>
      </h3>
      <div
        style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.2)" }}
      />
    </div>
  );
}

// ─── Responsive BentoTop ────────────────────────────────────────────────────
// On mobile (≤600px): stacks vertically, full width
// On tablet (601–900px): 2-col grid, filler hidden
// On desktop (901px+): original 3-col layout, taller cells
function BentoTop({ left, center, right, accent, num, label, className = "" }) {
  const [cols, setCols] = useState("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setCols(w <= 600 ? "mobile" : w <= 900 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const renderCell = (item, gridArea, delay, extraStyle = {}) => {
    if (!item || !item.src) return null;
    const style = { gridArea, ...extraStyle };
    return item.type === "photo" ? (
      <PhotoCell
        key={gridArea}
        src={item.src}
        alt={item.alt || ""}
        style={style}
        delay={delay}
      />
    ) : (
      <VideoCell
        key={gridArea}
        src={item.src}
        label={item.label}
        accent={accent}
        objectPosition={item.objectPosition}
        style={style}
        delay={delay}
      />
    );
  };

  // ── MOBILE: vertical stack ──────────────────────────────────────────────
  if (cols === "mobile") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {renderCell(left, "left", 0, { height: "260px" })}
        {renderCell(center, "center", 0.1, { height: "320px" })}
        {renderCell(right, "right", 0.2, { height: "260px" })}
      </div>
    );
  }

  // ── TABLET: 2-col, center spans full width top, left+right below ────────
  if (cols === "tablet") {
    return (
      <div
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "360px 300px",
          gridTemplateAreas: `"center center" "left right"`,
          gap: "8px",
        }}
      >
        {renderCell(center, "center", 0)}
        {renderCell(left, "left", 0.1)}
        {renderCell(right, "right", 0.2)}
      </div>
    );
  }

  // ── DESKTOP: original 3-col + filler, taller rows ──────────────────────
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "0.85fr 1.3fr 0.85fr",
        gridTemplateRows: "420px 90px", // ← taller than before (was 320px / 80px)
        gridTemplateAreas: `"left center right" "left filler right"`,
        gap: "8px",
      }}
    >
      {renderCell(left, "left", 0)}
      {renderCell(center, "center", 0.1)}
      {renderCell(right, "right", 0.2)}
      <AccentFiller num={num} accent={accent} />
    </div>
  );
}

// ── Responsive ExtraVideosRow ───────────────────────────────────────────────
function ExtraVideosRow({ videos, accent }) {
  const [cols, setCols] = useState("desktop");
  useEffect(() => {
    const check = () =>
      setCols(window.innerWidth <= 600 ? "mobile" : "desktop");
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols === "mobile" ? "1fr" : "1fr 1fr",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      {videos.map((v, i) => (
        <VideoCell
          key={i}
          src={v.src}
          label={v.label}
          accent={accent}
          objectPosition={v.objectPosition || "center center"}
          style={{ height: cols === "mobile" ? "240px" : "320px" }} // ← taller on desktop
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ textAlign: "center", padding: "44px 0 0", opacity: 0.18 }}>
      <svg viewBox="0 0 200 16" style={{ width: "130px" }} fill="none">
        <line x1="0" y1="8" x2="76" y2="8" stroke="#c9a96e" strokeWidth="0.6" />
        <circle cx="92" cy="8" r="3" fill="#c9a96e" />
        <circle cx="82" cy="8" r="1.5" fill="#c9a96e" opacity="0.5" />
        <circle cx="102" cy="8" r="1.5" fill="#c9a96e" opacity="0.5" />
        <line
          x1="108"
          y1="8"
          x2="200"
          y2="8"
          stroke="#c9a96e"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SangeetChapter() {
  const ACCENT = "#c9a96e";
  return (
    <section id="chapter-sangeet" style={{ marginBottom: "88px" }}>
      <ChapterHeader num="04" label="The Sangeet" accent={ACCENT} />
      <BentoTop
        accent={ACCENT}
        num="04"
        label="The Sangeet"
        left={{
          type: "photo",
          src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772784315/AmbariWeddingsPosts_szqcjn.jpg",
          alt: "Sangeet 1",
        }}
        center={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784320/awreel14_nekfkm.mp4",
          label: "Opening Night",
        }}
        right={{ type: "video", src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784322/Video_4_fodf7i.mp4", alt: "Sangeet 2" }}
      />
      <ExtraVideosRow
        accent={ACCENT}
        videos={[
          {
            src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784820/sangeet_gqvxzu.mp4",
            label: "",
          },
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784316/video2_rzediw.mp4", label: "Highlights" },
        ]}
      />
      <Divider />
    </section>
  );
}

function ReceptionChapter() {
  const ACCENT = "#8aab9e";
  return (
    <section id="chapter-reception" style={{ marginBottom: "88px" }}>
      <ChapterHeader num="02" label="The Reception" accent={ACCENT} />
      <BentoTop
        accent={ACCENT}
        num="02"
        label="The Reception"
        left={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784960/purpleReception_fiysts.mp4",
          label: "Grand Entrance",
        }}
        center={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772784958/video_g9s2df.mp4",
          alt: "",
        }}
        right={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772786581/Video5_1_hpq4gb.mp4",
          label: "First Dance",
        }}
      />
      <BentoTop
        className="mt-3"
        accent={ACCENT}
        num=""
        label=""
        left={{ type: "photo", src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772784958/image2_cy9pgm.png" }}
        center={{
          type: "photo",
          src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772784964/image1_yoap23.png",
          alt: "Reception",
        }}
        right={{ type: "photo", src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772784958/image3_mukrii.png" }}
      />
      <Divider />
    </section>
  );
}

function HaldiChapter() {
  const ACCENT = "#c9a96e";
  return (
    <section id="chapter-haldi" style={{ marginBottom: "88px" }}>
      <ChapterHeader num="03" label="The Haldi" accent={ACCENT} />
      <BentoTop
        accent={ACCENT}
        num="03"
        label="The Haldi"
        left={{ type: "photo", src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772785297/image_oepn2o.png", alt: "Haldi 1" }}
        center={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785320/awreel_ycjjug.mp4",
          label: "Golden Ritual",
        }}
        right={{
          type: "photo",
          src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772785522/CONCEPT-MOOD-7_zhbzjr.jpg",
          alt: "Haldi 2",
        }}
      />
      <ExtraVideosRow
        accent={ACCENT}
        videos={[
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785314/AW_gulabi_p2ceqn.mp4", label: "Joy" },
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785297/videohaldi_oumfvv.mp4", label: "Ritual" },
        ]}
      />
      <Divider />
    </section>
  );
}

function WeddingChapter() {
  const ACCENT = "#c9a96e";
  return (
    <section id="chapter-wedding" style={{ marginBottom: "88px" }}>
      <ChapterHeader num="01" label="The Wedding" accent={ACCENT} />
      <BentoTop
        accent={ACCENT}
        num="01"
        label="The Wedding"
        left={{ type: "video", src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785635/Mantapa_ocuzuk.mp4", alt: "Wedding 1" }}
        center={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785628/vid2_rhxsyc.mp4",
          label: "The Ceremony",
        }}
        right={{ type: "video", src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785612/vid5_cw9wrh.mp4", alt: "Wedding 2" }}
      />
      <ExtraVideosRow
        accent={ACCENT}
        videos={[
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785599/vid3_yoapir.mp4", label: "Sacred Vows" },
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785577/videowed_k6yfx5.mp4", label: "Together" },
        ]}
      />
      <BentoTop
        className="mt-4"
        accent={ACCENT}
        num=""
        label=""
        left={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785621/Traditionaldecor_bq2g3n.mp4",
          alt: "Wedding 1",
        }}
        center={{
          type: "photo",
          src: "https://res.cloudinary.com/dxxvbrgie/image/upload/v1772785576/Ambariwedding_x35xqo.png",
          label: "The Ceremony",
        }}
        right={{ type: "video", src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785588/vid4_z0t1go.mp4", alt: "Wedding 2" }}
      />
      <Divider />
    </section>
  );
}

function CarnivalChapter() {
  const ACCENT = "#b8908a";
  return (
    <section id="chapter-carnival" style={{ marginBottom: "60px" }}>
      <ChapterHeader num="05" label="The Carnival" accent={ACCENT} />
      <BentoTop
        accent={ACCENT}
        num="05"
        label="The Carnival"
        left={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785867/Video8_k0nl1e.mp4",
          alt: "Carnival 1",
        }}
        center={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785849/AW_reel9_n8lbkj.mp4",
          label: "Revelry",
        }}
        right={{
          type: "video",
          src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785883/AMBARIWEDDINGreel_ilmtmt.mp4",
          alt: "Carnival 2",
        }}
      />
      <ExtraVideosRow
        accent={ACCENT}
        videos={[
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785846/AmbariWeddingsPosts_j3sznq.mp4", label: "Sacred Vows" },
          { src: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785852/videolst_innjx5.mp4", label: "Together" },
        ]}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV DOTS
// ─────────────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "chapter-sangeet", label: "Sangeet" },
  { id: "chapter-reception", label: "Reception" },
  { id: "chapter-haldi", label: "Haldi" },
  { id: "chapter-wedding", label: "Wedding" },
  { id: "chapter-carnival", label: "Carnival" },
];

function NavDots({ active }) {
  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 100,
      }}
    >
      {NAV.map(({ id, label }, i) => (
        <button
          key={id}
          title={label}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            padding: 0,
            background: active === i ? "#c9a96e" : "rgba(201,169,110,0.28)",
            border: active === i ? "none" : "1px solid rgba(201,169,110,0.4)",
            cursor: "pointer",
            transform: active === i ? "scale(1.6)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkSection() {
  const [activeDot, setActiveDot] = useState(0);
  const introRef = useRef(null);
  const [introVis, setIntroVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIntroVis(true);
      },
      { threshold: 0.3 },
    );
    if (introRef.current) {
      io.observe(introRef.current);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      NAV.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (
          top <= window.innerHeight * 0.5 &&
          bottom >= window.innerHeight * 0.5
        )
          setActiveDot(i);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavDots active={activeDot} />
      <Navigation />
      <section
        ref={ref}
        className="relative h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://res.cloudinary.com/dxxvbrgie/video/upload/v1772786085/work_k5sfuc.mp4"
            autoPlay
            loop
            muted
            className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${
              visible ? "scale-100" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        {/* Content */}

        <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-20 md:pb-20">
          <div className="max-w-5xl">
            <div
              className={`overflow-hidden mb-5 transition-all duration-1000 delay-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/50">
                Our Work
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-background">
                Traditions we honor.
                <br className="hidden md:block" />
                Dreams we design.
                <br className="hidden md:block" />
                <em style={{ color: "#c9a96e", fontStyle: "italic" }}>
                  {" "}
                  Moments we celebrate .
                </em>
              </h1>
            </div>

            <div
              className={`mt-7 transition-all duration-1000 delay-900 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div
                style={{
                  display: "inline-flex",
                  gap: "16px",
                  alignItems: "center",
                  padding: "8px 18px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "40px",
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(7px, 1.5vw, 8px)",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.7)",
                  }}
                >
                  Celebrations · Rituals · Decor · Moments{" "}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`mt-12 md:mt-16 flex items-center gap-6 transition-all duration-1000 delay-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-10 md:w-12 h-px bg-background/30" />
            <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-background/40">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>
      <div style={{ background: "#fdf9f4" }}>
        {/* Wider max-width + reduced side padding on mobile */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(40px, 12vw, 96px) clamp(16px, 4vw, 60px) 80px",
          }}
        >
          <WeddingChapter />
          <ReceptionChapter />
          <HaldiChapter />
          <SangeetChapter />
          <CarnivalChapter />
        </div>
      </div>
    </>
  );
}
