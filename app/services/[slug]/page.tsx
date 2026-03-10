"use client"

import { useRouter } from "next/navigation"
import { use } from "react"

const projects = [
  {
    id: "01",
    slug: "service-philosophy",
    title: "Service Philosophy",
    category: "We don't offer packages,  We create experiences just for you.  Each service flows from one core belief:  intention over expense,  meaning over magnificence.  Because honestly?  Your love story isn't like anyone else's.  Why should your wedding be? ",
    year: "2024",
    location: "Your Special Treatment ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772817490/Ambari_Wedding_csqsly.mov",
  },
  {
    id: "02",
    slug: "in-house-production",
    title: "In-House Production Mastery ",
    category: "Everything Perfect Here's what sets us apart: We have our own production house. While others coordinate vendors, we create magic in-house. From concept to completion, every element flows through our skilled artisans' hands. No miscommunication. No quality compromises. No vendor conflicts. Just seamless creation where your vision transforms into reality through our complete control of the process. Because when you own the entire journey, perfection isn't just possible - it's promised.",
    year: "2023",
    location: "Everything Under One Roof",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772817797/AW_rreel_tmm2ja.mp4",
  },
  {
    id: "03",
    slug: "bespoke-design-decor",
    title: "Bespoke Design & Decor ",
    category: `Your vision becomes our mission. From intimate mandaps that whisper your love story to grand celebrations that announce your union to the world, we design spaces where magic feels natural.<br/><br/>What we love creating together:<br/>● Royal mandap design inspired by your journey - not just beautiful, but meaningful<br/>● Floral arrangements that tell your story, not just fill space<br/>● Lighting that transforms spaces into sanctuaries where you belong<br/>● Decor that honors tradition while embracing your personal style`,
    year: "2023",
    location: "When Your Dreams Breathe",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772871788/Video_of_all_the_recent_luxury_decor_uzhf3y.mp4",
  },
  {
    id: "04",
    slug: "venue-curation",
    title: "Venue Curation ",
    category: " We don't just book venues, We discover perfect settings that feel destined for your celebration.  From heritage properties that echo with centuries of celebration to contemporary spaces ready for your personal touch, we find places worthy of your story. Because the right venue doesn't just host your wedding - it becomes part of your legacy. ",
    year: "2022",
    location: "Every Space Needs Its Story",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1773140513/IMG_8244_wkpyk0.mov",
  },
  {
    id: "05",
    slug: "photography",
    title: "Photography",
    category: "Your love story deserves to be told beautifully. We capture not just moments, but emotions - the quiet glances, the joyful tears, the laughter that fills the air. Because years from now, these images will be how you remember feeling like the most important people in the world.",
    year: "2023",
    location: "Capturing Your Forever ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772829968/IMG_6100_ahofvk.mp4",
  },
  {
    id: "06",
    slug: "culinary-excellence",
    title: "Culinary Excellence",
    category: "Food is love made visible. Our curated menus blend traditional recipes with contemporary flair, ensuring every bite carries the warmth of home and the excitement of new beginnings. Your guests won't just remember how beautiful everything looked - they'll remember how loved they felt. ",
    year: "2022",
    location: "Feasts That Tell Your Story ",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/f_auto,q_auto/v1772818693/culinary_sxmwrd.mov",
  },
  {
    id: "07",
    slug: "complete-coordination",
    title: "Complete Coordination ",
    category: "On your wedding day, you shouldn't be a planner - you should be celebrating.  We orchestrate every detail  so you can focus on what matters: enjoying your love with those who matter most. You get to be the bride and groom.  We handle everything else.",
    year: "2022",
    location: "From Planning to Perfection",
    image: "https://res.cloudinary.com/dxxvbrgie/video/upload/v1772878326/BTS_dsaij5.mp4",
  },
  {
    id: "",
    slug: "",
    title: "",
    category: "",
    year: "2022",
    location: "",
    image: "",
  },
]

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter()
  const { slug } = use(params)
  const project = projects.find(p => p.slug === slug)
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  // Previous service — null if we're on the first one
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0e8]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">404</p>
        <h2
          className="text-4xl font-light text-[#0f0e0c] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Service Not Found
        </h2>
        <button
          onClick={() => router.back()}
          className="border border-[#c9a96e]/40 text-[#0f0e0c] px-8 py-3 text-xs tracking-[0.25em] uppercase hover:bg-[#c9a96e]/10 transition-colors duration-300"
        >
          Return
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      {/* ── Thin gold rule at top ── */}
      <div className="mx-8 md:mx-16 xl:mx-24 pt-32 h-px " />

      {/* ── Main split layout ── */}
      <div className="flex flex-col lg:flex-row lg:items-start px-8 md:px-16 xl:px-24 pt-16 lg:pt-20 gap-12 lg:gap-20 xl:gap-28">

        {/* LEFT — Content */}
        <div className="flex-1 flex flex-col lg:pt-16 xl:pt-20 order-2 lg:order-1">

          {/* Service index + eyebrow row */}
          <div className="flex items-center gap-4 mb-7">
            <span className="text-[11px] tracking-[0.38em] uppercase text-[#c9a96e]">
              {project.location}
            </span>
            <div className="flex-1 h-px bg-[#c9a96e]/20" />
            <span className="text-[10px] tracking-[0.25em] text-[#c9a96e]/50 font-light">
              {project.id ? `No. ${project.id.trim()}` : ""}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[44px] md:text-[52px] xl:text-[64px] font-light leading-[1.02] text-[#0f0e0c] mb-7"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h1>

          {/* Decorative gold bar with dot */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
            <div className="w-16 h-px bg-gradient-to-r from-[#c9a96e] to-[#c9a96e]/20" />
          </div>

          {/* Description */}
          <div
            className="text-[17px] md:text-[18.5px] font-light leading-[2.05] text-[#3a332b] mb-14 max-w-[540px]"
            dangerouslySetInnerHTML={{ __html: project.category }}
          />

          {/* Bottom action row — Back + Next side by side */}
          <div className="flex items-stretch gap-3">

            {/* ← Back — goes to previous service if exists, else /services */}
            <button
              onClick={() =>
                prevProject?.slug
                  ? router.push(`/services/${prevProject.slug}`)
                  : router.push("/services")
              }
              className="group flex items-center gap-3 border border-[#c9a96e]/22 px-10 py-5 hover:bg-[#c9a96e]/5 hover:border-[#c9a96e]/45 transition-all duration-300"
            >
              <span className="text-[#c9a96e] text-base group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
              <div className="flex flex-col items-start gap-1">
                <span className="text-[9px] tracking-[0.38em] uppercase text-[#c9a96e]/65">
                  {prevProject?.slug ? "Previous" : "Back"}
                </span>
                {prevProject?.slug && (
                  <span
                    className="text-[14px] font-light text-[#0f0e0c] line-clamp-1"
                  >
                    {prevProject.title}
                  </span>
                )}
              </div>
            </button>

            {/* → Next Service */}
            {nextProject.slug && (
              <button
                onClick={() => router.push(`/services/${nextProject.slug}`)}
                className="group flex items-center justify-between border border-[#c9a96e]/22 px-5 py-5 hover:bg-[#c9a96e]/5 hover:border-[#c9a96e]/45 transition-all duration-300 flex-1"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] tracking-[0.38em] uppercase text-[#c9a96e]/65">Next Service</span>
                  <span
                    className="text-[14px] font-light text-[#0f0e0c] line-clamp-1"
                  >
                    {nextProject.title}
                  </span>
                </div>
                <span className="text-[#c9a96e] text-base group-hover:translate-x-1.5 transition-transform duration-300 ml-4">→</span>
              </button>
            )}

          </div>

          {/* ── Borderless "View All Services" link ── */}
          <div className="mt-20">
            <button
              onClick={() => router.push("/#services")}
              className="group flex items-center gap-2 text-[#c9a96e]/60 hover:text-[#c9a96e] transition-colors duration-300"
            >
              <span className="text-[11px] tracking-[0.38em] uppercase">View All Services</span>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </button>
          </div>

        </div>

        {/* RIGHT — Video (portrait) — sticky on desktop */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex-shrink-0 order-1 lg:order-2 lg:sticky lg:top-10">
          <div className="rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(15,14,12,0.16)] border border-[#c9a96e]/10">
            <video
              src={project.image}
              className="w-full h-[62vw] sm:h-[52vw] lg:h-[82vh] object-cover block"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          {/* Caption below video */}
          {/* <div className="flex items-center justify-between mt-4 px-1">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/45">
              Ambari Weddings · {project.year}
            </p>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/30">
              {project.id ? `${project.id.trim()} / 07` : ""}
            </p>
          </div> */}
        </div>

      </div>

      {/* Bottom breathing room */}
      <div className="h-32" />

    </div>
  )
}