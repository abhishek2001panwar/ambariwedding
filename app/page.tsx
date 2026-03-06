import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { StudioSection } from "@/components/studio-section"
import { EditorialBreak } from "@/components/editorial-break"
import { ApproachSection } from "@/components/approach-section"
import { JournalSection } from "@/components/journal-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import Feedback from "@/components/feedback"
import Team from "@/components/team"

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
