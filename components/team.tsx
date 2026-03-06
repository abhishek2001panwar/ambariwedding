'use client';
import React, { useRef, useState, useEffect } from "react";

const teamMembers = [
  {
    name: "V Preetham Raju",
    designation: "The Visionary",
    img: "/team1.png",
    index: "01",
    description:
      "The heart behind Ambari's philosophy that heritage never goes outdated. He transforms love stories into unforgettable celebrations, ensuring every couple feels like the most important people in the room while blending ancient wisdom with contemporary elegance. He's the one who remembers that you mentioned wanting your grandmother's jewelry incorporated into the design- and somehow makes it the most beautiful detail of the day.",
  },
  {
    name: "Santosh Sridhar",
    designation: "The Master Orchestrator ",
    
    img: "/team3.png",
    index: "02",
    description:
      "With years of industry experience, she's the one who ensures seamless coordination from planning to perfection. Her deep understanding of cultural authenticity allows her to honor every sacred tradition with reverence while creating celebrations where guests become family. Seven years of I've got this energy, making sure your wedding runs so smoothly you forget there were ever any moving parts.",
  },
  {
    name: "Dikshit Kumar",
    designation: " The Creative Force ",
    img: "/team2.png",
    index: "03",
    description:
      "The artisan behind our exceptional design and production. He transforms ordinary spaces into sanctuaries through masterful mandap creation, lighting design, and décor that tells your story - ensuring every element is crafted, not bought. If you've ever walked into a wedding and thought How did they create something so magical? it was probably someone like Rahul.",
  },
];

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, vis };
}

// ── Single team card ────────────────────────────────────────────────────────
function TeamCard({
  member,
  delay,
}: {
  member: (typeof teamMembers)[0];
  delay: number;
}) {
  const { ref, vis } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ${delay}ms ease, transform 0.9s ${delay}ms ease`,
      }}
    >
      {/* ── Photo frame ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "3 / 4",
          borderRadius: "2px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo */}
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Permanent subtle bottom gradient for name legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,8,6,0.55) 0%, transparent 45%)",
          }}
        />

        {/* ── Hover overlay — slides up from bottom ───────────────────── */}
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(10,8,6,0.96) 0%, rgba(10,8,6,0.82) 50%, rgba(10,8,6,0.35) 100%)"
              : "linear-gradient(to top, rgba(10,8,6,0.55) 0%, transparent 45%)",
            transition: "background 0.6s ease",
          }}
        >
          {/* Description text — slides up & fades in */}
          <div
            style={{
              padding: "clamp(20px, 4vw, 36px)",
              transform: hovered ? "translateY(0)" : "translateY(14px)",
              opacity: hovered ? 1 : 0,
              transition: "transform 0.6s ease, opacity 0.5s ease",
            }}
          >
            {/* Gold rule */}
            <div
              style={{
                width: "28px",
                height: "1px",
                background: "#c9a96e",
                marginBottom: "14px",
                opacity: 0.7,
              }}
            />
            <p
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
                fontWeight: 300,
                letterSpacing: "0.01em",
              }}
            >
              {member.description}
            </p>
          </div>
        </div>

        {/* Index number — top left, always visible */}
        <div
          style={{
            position: "absolute",
            top: "18px",
            left: "20px",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(201,169,110,0.6)",
            fontWeight: 300,
          }}
        >
          {member.index}
        </div>
      </div>

      {/* ── Name & designation below photo ─────────────────────────────── */}
      <div style={{ paddingTop: "20px", paddingLeft: "2px" }}>
        {/* thin gold line */}
        <div
          style={{
            width: hovered ? "48px" : "24px",
            height: "1px",
            background: "#c9a96e",
            opacity: 0.5,
            marginBottom: "12px",
            transition: "width 0.5s ease",
          }}
        />
        <h3
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            fontWeight: 300,
            color: "var(--foreground, #1a1410)",
            letterSpacing: "0.02em",
            lineHeight: 1.2,
            marginBottom: "6px",
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c9a96e",
            fontWeight: 300,
            opacity: 0.85,
          }}
        >
          {member.designation}
        </p>
      </div>
    </div>
  );
}

// ── Section header reveal ───────────────────────────────────────────────────
function SectionHeader() {
  const { ref, vis } = useReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "clamp(23px, 6vw, 80px)",
        paddingBottom: "2px",
        borderBottom: "1px solid rgba(201,169,110,0.15)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          
          fontWeight: 300,
          marginBottom: "14px",
          opacity: 0.85,
        }}
      >
       Meet our founders
      </p>
      
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
function Team() {
  return (
    <section
      className="px-6 py-10 md:px-12 lg:px-20"
      style={{ background: "var(--background, #fdf9f4)" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
          }}
        >
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;