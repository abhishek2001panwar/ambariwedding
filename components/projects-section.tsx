"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "./button"
import { useRouter } from "next/navigation"

const projects = [
  {
    title: "Heritage-Rooted Innovation",
    category: "Residential",
    year: "2024",
    location: "Oslo, Norway",
    image: "/wedding/vid2.mp4",
  },
  {
    title: "Artisanal Excellence",
    category: "Cultural",
    year: "2023",
    location: "Lund, Sweden",
    image: "/haldi/awreel.mp4",
  },
  {
    title: "Personalized Storytelling",
    category: "Commercial",
    year: "2023",
    location: "Helsinki, Finland",
    image: "/sangeet/awreel14.mp4",
  },
  {
    title: "Seamless Orchestration",
    category: "Cultural",
    year: "2022",
    location: "Copenhagen, Denmark",
    image: "/carnival/AW_reel9.mp4",
  },
  {
    title: "Cultural Authenticity",
    category: "Commercial",
    year: "2023",
    location: "Helsinki, Finland",
    image: "/wedding/videowed.mp4",
  },
  {
    title: "Complete In-House Production",
    category: "Cultural",
    year: "2022",
    location: "Copenhagen, Denmark",
    image: "/haldi/AW_gulabi.mp4",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`bg-background group cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
        <video
          src={project.image || "/placeholder.svg"}
          className={`w-full aspect-[4/3] object-cover transition-all duration-[800ms] ease-out ${
            hovered ? "scale-[1.04]" : "scale-100"
          }`}
          autoPlay
          muted
          playsInline
          loop
        />
      </div>
      <div className="p-6 md:p-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-light tracking-tight text-foreground mb-1.5">
              {project.title}
            </h3>
            {/* <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
              {project.category} / {project.location} / {project.year}
            </p> */}
          </div>
        </div>
        <ArrowUpRight
          className={`h-4 w-4 text-muted-foreground/40 transition-all duration-300 mt-1.5 ${
            hovered ? "translate-x-0.5 -translate-y-0.5 text-foreground" : ""
          }`}
        />
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal(0.05)
    const router = useRouter()


  return (
    <section id="projects" className="px-6 py-28 md:px-12 lg:px-20 md:py-36">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
          </h2>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      <Button onClick={()=> router.push('/#contact')} variant="outline" className="flex items-center gap-2 mt-12 mx-auto">
       get in touch
      </Button>
    </section>
  )
}
