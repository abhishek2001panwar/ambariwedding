"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const principles = [
  {
    number: "01",
    title: "Complete In-House Production",
    description:
      "The Game-Changer Others Can't Match We don't just plan - we produce. Our own production house means every mandap, every decor piece, every design element is crafted by our artisans who understand your vision intimately.",
  },
  {
    number: "02",
    title: "Heritage-Rooted Innovation",
    description:
      "We honor tradition while embracing your vision. Ancient wisdom meets your modern love story, creating something both timeless and utterly yours.",
  },
  {
    number: "03",
    title: "Artisanal Excellence",
    description:
      "Every element is crafted, not bought. Your wedding becomes a work of art that reflects who you are, not what's trending.",
  },
  {
    number: "04",
    title: "Personalized Storytelling",
    description:
      "Your love story becomes our design philosophy. Every detail reflects your journey - from how you met to the dreams you're building together.",
  },
  {
    number: "05",
    title: "Seamless Orchestration",
    description:
      "On your wedding day, you're the stars - not the coordinators. We handle everything so you can be fully present for your own celebration.",
  },
  {
    number: "06",
    title: "Cultural Authenticity",
    description:
      "We understand the sacred nature of Indian weddings and honor every tradition with reverence. Because some things should never be rushed or simplified.",
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
      <div className="bg-background p-8 md:p-12 w-full">
        <div className="flex items-start justify-between mb-10">
          <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
            ({principle.number})
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
    </div>
  )
}

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal(0.09)

  return (
    <section id="whyus" className="px-6 py-28 md:px-12 lg:px-20 md:py-36">
      <div
        ref={ref}
        className={`mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Why Choose Ambari
        </p>
        <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] font-light leading-[1.35] tracking-tight text-foreground text-balance">
            What Makes Us Different <br />
The Heart of Wedding Planning
          </blockquote>
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