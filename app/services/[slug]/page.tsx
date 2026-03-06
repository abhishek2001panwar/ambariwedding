"use client"

import { useRouter } from "next/navigation"
import { use } from "react"
import { Button } from "@/components/button"
const projects = [
  {
     slug: "service-philosophy",
    title: "Service Philosophy",
    category: "Your Special Treatment We don't offer packages,  We create experiences just for you.  Each service flows from one core belief:  intention over expense,  meaning over magnificence.  Because honestly?  Your love story isn't like anyone else's.  Why should your wedding be? ",
    year: "2024",
    location: "Oslo, Norway",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772817490/Ambari_Wedding_csqsly.mov",
  },
  {
      slug: "in-house-production",
    title: "In-House Production Mastery ",
    category: "Everything Under One Roof, Everything Perfect Here's what sets us apart: We have our own production house. While others coordinate vendors, we create magic in-house. From concept to completion, every element flows through our skilled artisans' hands. No miscommunication. No quality compromises. No vendor conflicts. Just seamless creation where your vision transforms into reality through our complete control of the process. Because when you own the entire journey, perfection isn't just possible - it's promised.",
    year: "2023",
    location: "Lund, Sweden",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772817797/AW_rreel_tmm2ja.mp4",
  },
  {
    slug: "bespoke-design-decor",
    title: "Bespoke Design & Decor ",
    category: "When Your Dreams Breathe Your vision becomes our mission. From intimate mandaps that whisper your love story to grand celebrations that announce your union to the world, we design spaces where magic feels natural.  What we love creating together: ● Royal mandap design inspired by your journey - not just beautiful, but meaningful ● Floral arrangements that tell your story, not just fill space ● Lighting that transforms spaces into sanctuaries where you belong ● Decor that honors tradition while embracing your personal style ",
    year: "2023",
    location: "Helsinki, Finland",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772819055/bespoke_axboqz.mov",
  },
  {
      slug: "venue-curation",
    title: "Venue Curation ",
    category: "Every Space Needs Its Story We don't just book venues, We discover perfect settings that feel destined for your celebration.  From heritage properties that echo with centuries of celebration to contemporary spaces ready for your personal touch, we find places worthy of your story. Because the right venue doesn't just host your wedding - it becomes part of your legacy. ",
    year: "2022",
    location: "Copenhagen, Denmark",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772818241/venue_bnwozw.mov",
  },
  {
      slug: "photography",
    title: "Photography",
    category: "Capturing Your Forever Your love story deserves to be told beautifully. We capture not just moments, but emotions - the quiet glances, the joyful tears, the laughter that fills the air. Because years from now, these images will be how you remember feeling like the most important people in the world.",
    year: "2023",
    location: "Helsinki, Finland",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772829968/IMG_6100_ahofvk.mp4",
  },
  {
      slug: "culinary-excellence",
    title: "Culinary Excellence",
    category: "Feasts That Tell Your Story Food is love made visible.Our curated menus blend traditional recipes with contemporary flair, ensuring every bite carries the warmth of home and the excitement of new beginnings. Your guests won't just remember how beautiful everything looked - they'll remember how loved they felt. ",
    year: "2022",
    location: "Copenhagen, Denmark",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772818693/culinary_sxmwrd.mov",
  },
   {
      slug: "complete-coordination",
    title: "Complete Coordination ",
    category: "From Planning to Perfection On your wedding day, you shouldn't be a planner - you should be celebrating.  We orchestrate every detail  so you can focus on what matters: enjoying your love with those who matter most. You get to be the bride and groom.  We handle everything else.",
    year: "2022",
    location: "Copenhagen, Denmark",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785314/AW_gulabi_p2ceqn.mp4",
  },
]
export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {  const router = useRouter()
  // Find the project by service title (case-insensitive, trimmed)
  const { slug } = use(params)
const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Service Not Found</h2>
        <button
          className="px-6 py-2 rounded-lg bg-foreground text-background font-medium mt-4 shadow-md hover:bg-foreground/80 transition"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-20 bg-background">
      <div className="w-full flex flex-col items-center mb-12">
        <video
          src={project.image}
          className="w-full max-w-2xl h-[420px] md:h-[600px] object-cover rounded-3xl shadow-2xl border border-foreground/10 mb-8"
          controls
          autoPlay
          loop
          muted
        />
      </div>
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6">
          {project.title}
        </h1>
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#c9a96e] via-[#8aab9e] to-transparent mb-8" />
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          {project.category}
        </p>
       
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <span className="mr-2">←</span> Back to Services
        </Button>
      </div>
    </section>
  )
}
