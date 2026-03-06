"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useRef, useState } from "react"

const entries = [
  {
    number: "01",
    title: "Our Approach",
    body: "We are custodians of celebration, architects of joy. Our team doesn't just coordinate - we consecrate. Every mandap we design, every detail we perfect, every moment we curate carries the sacred responsibility of honoring your union.",
  },
  {
    number: "02",
    title: "Discovery",
    body: "We listen first, design second. Your story becomes our blueprint - from how you met to the dreams you're building together.",
  },
  {
    number: "03",
    title: "Vision",
    body: "Together, we craft a celebration that feels uniquely yours, honoring where you come from while celebrating where you're going.",
  },
  {
    number: "04",
    title: "Creation",
    body: "Skilled hands bring your dreams to life, detail by precious detail, with the care your story deserves.",
  },
  {
    number: "05",
    title: "Celebration",
    body: "You reign over a day designed entirely for your joy, surrounded by love and steeped in meaning.",
  },
  {
    number: "06",
    title: "Our Promise",
    body: "We don't believe in template weddings. Every ceremony we design carries the DNA of your relationship - your shared dreams become design elements, your journey together becomes the thread that weaves everything into a celebration that feels authentically, beautifully yours.",
  },
]

function StepCard({ entry, index }: { entry: typeof entries[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.intersectionRatio > 0.25) setIsActive(true) },
      { threshold: [0, 0.25, 0.5] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 01, 03, 05 (index 0,2,4) → content LEFT
  // 02, 04, 06 (index 1,3,5) → content RIGHT
  const isLeftContent = index % 2 === 0

  return (
    <div ref={ref} className="flex items-center w-full gap-0">

      {/* ── LEFT SLOT (desktop) ── */}
      <div className="hidden md:flex flex-1 justify-end pr-12">
        {isLeftContent ? (
          <div
            className={`text-right max-w-[300px] lg:max-w-[340px] transition-all duration-700 ${
              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 mb-3">
              {entry.title}
            </p>
            <p className="text-sm font-light leading-[1.85] text-foreground/60">
              {entry.body}
            </p>
          </div>
        ) : null}
      </div>

      {/* ── CENTER NODE ── */}
      <div className="relative z-10 shrink-0 flex items-center justify-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full border bg-background transition-all duration-700 ${
            isActive
              ? "border-foreground/35 shadow-[0_0_0_5px_hsl(var(--background)),0_0_0_6px_hsl(var(--foreground)/0.1)]"
              : "border-foreground/12"
          }`}
        >
          <span
            className={`text-[11px] tracking-[0.12em] tabular-nums transition-colors duration-500 ${
              isActive ? "text-foreground/60" : "text-foreground/20"
            }`}
          >
            {entry.number}
          </span>
        </div>
      </div>

      {/* ── RIGHT SLOT (desktop) ── */}
      <div className="hidden md:flex flex-1 justify-start pl-12">
        {!isLeftContent ? (
          <div
            className={`text-left max-w-[300px] lg:max-w-[340px] transition-all duration-700 ${
              isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 mb-3">
              {entry.title}
            </p>
            <p className="text-sm font-light leading-[1.85] text-foreground/60">
              {entry.body}
            </p>
          </div>
        ) : null}
      </div>

      {/* ── MOBILE: content always right of node ── */}
      <div
        className={`flex md:hidden flex-1 pl-6 transition-all duration-700 ${
          isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-2">
            {entry.title}
          </p>
          <p className="text-sm font-light leading-[1.8] text-foreground/60">
            {entry.body}
          </p>
        </div>
      </div>

    </div>
  )
}

export function JournalSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.1)

  return (
    <section id="process" className="px-6 py-28 md:px-12 lg:px-20 md:py-1 overflow-hidden">

      {/* Header */}
      <div
        ref={headRef}
        className={`text-center mb-24 transition-all duration-1000 ${
          headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.35em] uppercase text-foreground/35 mb-5">
          Our Process
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-foreground leading-[1.2]">
          The Journey We Take<br />
          <span className="italic text-foreground/45">Together</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">

        {/* Vertical spine */}
        <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-foreground/8" />

        <div className="flex flex-col gap-16 md:gap-20">
          {entries.map((entry, index) => (
            <StepCard key={entry.number} entry={entry} index={index} />
          ))}
        </div>

        {/* End dot */}
        <div className="relative z-10 flex justify-center mt-14">
          <div className="h-2 w-2 rounded-full bg-foreground/20" />
        </div>
      </div>
    </section>
  )
}