"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stats = [
  { value: "87", label: "Projects Completed" },
  { value: "14", label: "International Awards" },
  { value: "22", label: "Years of Practice" },
]

export function StudioSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  return (
    <section id="about" className="px-6 py-28 md:px-12 lg:px-20 md:py-36 bg-[#A88238] text-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-8">
            Our Story
          </p>
           <p className="text-[1.35rem] md:text-[1.7rem] font-light text-background/80 mb-6">
             Where Tradition Meets Your Tomorrow
           </p>
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-extralight leading-[1.15] tracking-tight text-balance">
            Weddings are not events, they are celebrations of love <br /> that deserve to be crafted with intention.
          </h2>
        </div>

        <div
          ref={bodyRef}
          className={`flex flex-col justify-end gap-10 transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col gap-6 max-w-lg">
             <p className="text-sm leading-[1.75] text-background/55">
Born from the belief that every love story deserves special treatment, Ambari emerged from a 
simple truth: weddings are not events - they are celebrations of love that deserve to be crafted 
with intention. 
            </p>
            <p className="text-sm leading-[1.75] text-background/55">
             Our name speaks to the grand processions of old, where celebrations moved with purpose and beauty. Today, we bring that same spirit into modern celebrations, creating experiences that feel both timeless and completely yours.
            </p>
            <p className="text-sm leading-[1.75] text-background/55">
             We started because we noticed something missing in the wedding world-that personal touch that makes you feel like the most important people in the room. Because on your wedding day, you absolutely should be.
            </p>
          </div>

          {/* <div className="grid grid-cols-3 gap-8 pt-10 border-t border-background/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  )
}
