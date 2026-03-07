import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import dynamic from "next/dynamic"

// Lazy load below-the-fold components for faster initial load
const StudioSection = dynamic(() => import("@/components/studio-section").then(mod => ({ default: mod.StudioSection })), {
  loading: () => <div className="min-h-[400px]" />
})
const EditorialBreak = dynamic(() => import("@/components/editorial-break").then(mod => ({ default: mod.EditorialBreak })), {
  loading: () => <div className="min-h-[400px]" />
})
const ApproachSection = dynamic(() => import("@/components/approach-section").then(mod => ({ default: mod.ApproachSection })), {
  loading: () => <div className="min-h-[400px]" />
})
const JournalSection = dynamic(() => import("@/components/journal-section").then(mod => ({ default: mod.JournalSection })), {
  loading: () => <div className="min-h-[400px]" />
})
const Team = dynamic(() => import("@/components/team"), {
  loading: () => <div className="min-h-[400px]" />
})
const Feedback = dynamic(() => import("@/components/feedback"), {
  loading: () => <div className="min-h-[400px]" />
})
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-[400px]" />
})
const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[200px]" />
})

export default function Page() {
  return (
    <main>
     
      <Hero />
      <ProjectsSection />
      <EditorialBreak />
      <StudioSection />
      <ApproachSection />
      <JournalSection />
      <Team />
      <Feedback />
      <ContactSection />
     
    </main>
  )
}
