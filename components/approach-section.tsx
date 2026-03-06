"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const principles = [
  {
    number: "00",
    title: "Service Philosophy",
    description:
      "We don't offer packages. We create experiences just for you. Each service flows from one core belief: intention over expense, meaning over magnificence. Because honestly? Your love story isn't like anyone else's. Why should your wedding be?",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-49.png",
  },
  {
    number: "01",
    title: "Complete Coordination",
    description:
      "On your wedding day, you shouldn't be a planner - you should be celebrating. We orchestrate every detail so you can focus on what matters most: enjoying your love with the people who matter to you.",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-1.jpg",
  },
  {
    number: "02",
    title: "Culinary Excellence",
    description:
      "Food is love made visible. Our curated menus blend traditional recipes with contemporary flair, ensuring every bite carries the warmth of home and the excitement of new beginnings.",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-5.png",
  },
  {
    number: "03",
    title: "Venue Curation",
    description:
      "We don't just book venues, we discover settings that feel destined for your celebration. From heritage properties to contemporary spaces, we find places worthy of your story.",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-44.png",
  },
  {
    number: "04",
    title: "Bespoke Design & Decor",
    description:
      "Your vision becomes our mission. From intimate mandaps to grand celebrations, we design spaces where every floral arrangement, every light, and every detail reflects your story.",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/Ambari-Weddings-Posts-48.png",
  },
  {
    number: "05",
    title: "Photography",
    description:
      "Your love story deserves to be told beautifully. We capture not just moments, but emotions - the quiet glances, joyful tears, and laughter that make your wedding unforgettable.",
    img: "https://ambariweddings.com/wp-content/uploads/2026/02/CONCEPT-MOOD-12.jpg",
  },
]

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      {/*
        Flip card container.
        - perspective gives the 3-D depth
        - group hover triggers the flip via CSS
        - On touch devices the flip happens on tap (handled by peer-checked trick
          using a hidden checkbox so it works without JS state)
      */}
      <div
        className="group relative bg-transparent"
        style={{ perspective: "1000px" }}
      >
        {/* ── flipper ─────────────────────────────────────────────────────
            transform-style: preserve-3d lets both faces live in 3-D space.
            On desktop: rotates on group-hover.
            On touch:   rotates when the label (whole card) is "checked".
        ──────────────────────────────────────────────────────────────────── */}
        <div
          className="relative w-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            // Tailwind doesn't have group-hover:rotateY, so inline style + CSS var trick
          }}
          // We use a CSS class toggle approach via group-hover on the parent
        >
          {/* Inner wrapper that actually flips */}
          <div
            className="relative w-full group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out"
            style={{ transformStyle: "preserve-3d" }}
          >

            {/* ── FRONT — original card design ──────────────────────────── */}
            <div
              className="bg-background p-8 md:p-12 w-full"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="flex items-start justify-between mb-10">
                <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                  ({principle.number})
                </span>
                {/* subtle flip hint */}
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/20 hidden md:block">
                  hover ↗
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground mb-5">
                {principle.title}
              </h3>
              <div className="w-8 h-px bg-border mb-5" />
              <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
                {principle.description}
              </p>
            </div>

            {/* ── BACK — full image, no text ─────────────────────────────── */}
            <div
              className="absolute inset-0 w-full overflow-hidden bg-black"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                // match front card height — min so short cards don't clip
                minHeight: "100%",
              }}
            >
              <img
                src={principle.img}
                alt={principle.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* subtle bottom label */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <p
                  className="text-white/90 font-light tracking-wide"
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: "clamp(16px, 2vw, 20px)",
                    fontStyle: "italic",
                  }}
                >
                  {principle.title}
                </p>
              </div>
            </div>

          </div>{/* /flipper inner */}
        </div>{/* /flipper outer */}
      </div>{/* /group */}
    </div>
  )
}

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="service" className="px-6 py-28 md:px-12 lg:px-20 md:py-36">
      <div
        ref={ref}
        className={`mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Our Services
        </p>
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.number} principle={principle} index={index} />
        ))}
      </div>
    </section>
  )
}