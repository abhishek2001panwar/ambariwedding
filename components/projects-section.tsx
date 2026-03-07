"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "./button"
import { useRouter } from "next/navigation"

const projects = [
  {
    id:" 01",
     slug: "service-philosophy",
    title: "Service Philosophy",
    category: "We don't offer packages,  We create experiences just for you.  Each service flows from one core belief:  intention over expense,  meaning over magnificence.  Because honestly?  Your love story isn't like anyone else's.  Why should your wedding be? ",
    year: "2024",
    location: "Your Special Treatment ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772817490/Ambari_Wedding_csqsly.mov",
  },
  {
    id: " 02",
      slug: "in-house-production",
    title: "In-House Production Mastery ",
    category: "Everything Perfect Here's what sets us apart: We have our own production house. While others coordinate vendors, we create magic in-house. From concept to completion, every element flows through our skilled artisans' hands. No miscommunication. No quality compromises. No vendor conflicts. Just seamless creation where your vision transforms into reality through our complete control of the process. Because when you own the entire journey, perfection isn't just possible - it's promised.",
    year: "2023",
    location: "Everything Under One Roof",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772817797/AW_rreel_tmm2ja.mp4",
  },
  {
    id: " 03",
    slug: "bespoke-design-decor",
    title: "Bespoke Design & Decor ",
category: `Your vision becomes our mission. 
From intimate mandaps that whisper your love story to grand celebrations that announce your union to the world, we design spaces where magic feels natural.

<br/><br/>

What we love creating together:

<br/>● Royal mandap design inspired by your journey - not just beautiful, but meaningful
<br/>● Floral arrangements that tell your story, not just fill space
<br/>● Lighting that transforms spaces into sanctuaries where you belong
<br/>● Decor that honors tradition while embracing your personal style`,
    year: "2023",
    location: "When Your Dreams Breathe",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772819055/bespoke_axboqz.mov",
  },
  {
      id: " 04",
      slug: "venue-curation",
    title: "Venue Curation ",
    category: " We don't just book venues, We discover perfect settings that feel destined for your celebration.  From heritage properties that echo with centuries of celebration to contemporary spaces ready for your personal touch, we find places worthy of your story. Because the right venue doesn't just host your wedding - it becomes part of your legacy. ",
    year: "2022",
    location: "Every Space Needs Its Story",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772818241/venue_bnwozw.mov",
  },
  {
      id: " 05",
      slug: "photography",
    title: "Photography",
    category: "Your love story deserves to be told beautifully. We capture not just moments, but emotions - the quiet glances, the joyful tears, the laughter that fills the air. Because years from now, these images will be how you remember feeling like the most important people in the world.",
    year: "2023",
    location: "Capturing Your Forever ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772829968/IMG_6100_ahofvk.mp4",
  },
  {
      id: " 06",
      slug: "culinary-excellence",
    title: "Culinary Excellence",
    category: "Food is love made visible.Our curated menus blend traditional recipes with contemporary flair, ensuring every bite carries the warmth of home and the excitement of new beginnings. Your guests won't just remember how beautiful everything looked - they'll remember how loved they felt. ",
    year: "2022",
    location: "Feasts That Tell Your Story ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772818693/culinary_sxmwrd.mov",
  },
   {
    id: " 07",
      slug: "complete-coordination",
    title: "Complete Coordination ",
    category: "On your wedding day, you shouldn't be a planner - you should be celebrating.  We orchestrate every detail  so you can focus on what matters: enjoying your love with those who matter most. You get to be the bride and groom.  We handle everything else.",
    year: "2022",
    location: "From Planning to Perfection",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785314/AW_gulabi_p2ceqn.mp4",
  },
  {
      id: "",
      slug: "",
    title: "",
    category: "On your wedding day, you shouldn't be a planner - you should be celebrating.  We orchestrate every detail  so you can focus on what matters: enjoying your love with those who matter most. You get to be the bride and groom.  We handle everything else.",
    year: "2022",
    location: "",
    image:''
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, isVisible } = useScrollReveal(0.1)
  const router = useRouter()

  return (
    <div
      ref={ref}
        onClick={() => router.push(`/services/${project.slug}`)}
      className={`bg-background group cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
       {project.image ? (
    <video
      src={project.image}
      className={`w-full aspect-[4/3] object-cover transition-all duration-[800ms] ease-out ${
        hovered ? "scale-[1.04]" : "scale-100"
      }`}
      autoPlay
      muted
      playsInline
      loop
    />
  ) : null}
      </div>
      <div className="p-6 md:p-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
            {project.id}
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-light tracking-tight text-foreground mb-1.5">
              {project.title}
            </h3>
            <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
              {project.location} 
            </p>
          </div>
        </div>
        { 
          project.id  && (
             <ArrowUpRight
          className={`h-4 w-4 text-muted-foreground/40 transition-all duration-300 mt-1.5 ${
            hovered ? "translate-x-0.5 -translate-y-0.5 text-foreground" : ""
          }`}
        />
          )
        }

       
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal(0.05)
    const router = useRouter()


  return (
    <section id="services" className="px-6 py-28 md:px-12 lg:px-20 md:py-36">
      <div
        ref={ref}
        
        className={`flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
           Our Services
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
