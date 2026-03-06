"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const principles = [

  {
    number: "00",
    title: "Service Philosophy",
    description: "We don’t offer packages. We create experiences just for you. Each service flows from one core belief: intention over expense, meaning over magnificence. Because honestly? Your love story isn’t like anyone else’s. Why should your wedding be?"
  },
  {
    number: "01",
    title: "Complete Coordination",
    description:
      "On your wedding day, you shouldn’t be a planner - you should be celebrating. We orchestrate every detail so you can focus on what matters most: enjoying your love with the people who matter to you.",
  },
  {
    number: "02",
    title: "Culinary Excellence",
    description:
      "Food is love made visible. Our curated menus blend traditional recipes with contemporary flair, ensuring every bite carries the warmth of home and the excitement of new beginnings.",
  },
  {
    number: "03",
    title: "Venue Curation",
    description:
      "We don’t just book venues, we discover settings that feel destined for your celebration. From heritage properties to contemporary spaces, we find places worthy of your story.",
  },
  {
    number: "04",
    title: "Bespoke Design & Decor",
    description:
      "Your vision becomes our mission. From intimate mandaps to grand celebrations, we design spaces where every floral arrangement, every light, and every detail reflects your story.",
  },
  {
    number: "05",
    title: "Photography",
    description:
      "Your love story deserves to be told beautifully. We capture not just moments, but emotions - the quiet glances, joyful tears, and laughter that make your wedding unforgettable.",
  },
]

function PrincipleCard({ principle, index }: { principle: typeof principles[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <div
      ref={ref}
      className={`bg-background p-8 md:p-12 group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-10">
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
          ({principle.number})
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground mb-5 group-hover:translate-x-1 transition-transform duration-500">
        {principle.title}
      </h3>
      <div className="w-8 h-px bg-border mb-5 group-hover:w-12 transition-all duration-500" />
      <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
        {principle.description}
      </p>
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
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
         
       
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.number} principle={principle} index={index} />
        ))}
      </div>
    </section>
  )
}
