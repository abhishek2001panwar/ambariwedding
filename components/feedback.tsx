import React from "react"
import { OptimizedVideo } from "./optimized-video"

const testimonials = [
  "They didn't just plan our wedding. They created our perfect day and made us feel like the most important people in the world.",
  "Every detail felt intentional, every moment felt sacred. They understood not just what we wanted, but who we are.",
  "Our families are still talking about how beautifully everything honored our traditions while feeling completely personal to us.",
  "They made our crazy ideas work and somehow made them even more beautiful than we imagined.",
]

function Feedback() {
  return (
    <section className="px-6 py-10 md:px-12 lg:px-20 bg-background">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Left Video */}
        <div className="hidden md:flex justify-center">
          <OptimizedVideo
            src="https://res.cloudinary.com/dxxvbrgie/video/upload/v1772823167/AW_testimonial_xjjdey.mp4"
            className="w-80 h-86 object-cover rounded-xl shadow-lg"
            muted
            playsInline
            loop
            autoPlay
            lazy={true}
          />
        </div>
        {/* Center Content */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            WHAT OUR COUPLES SAY
          </p>
          <h2 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground mb-2">
            Words from the Heart
          </h2>
          <div className="flex flex-col gap-4 mt-2">
            {testimonials.map((quote, idx) => (
              <blockquote
                key={idx}
                className="text-[15px] md:text-[16px] font-light text-foreground/80 leading-relaxed border-l-4 border-foreground/10 pl-3"
              >
                "{quote}"
              </blockquote>
            ))}
          </div>
        </div>
        {/* Right Video */}
        <div className="hidden md:flex justify-center">
          <OptimizedVideo
            src="https://res.cloudinary.com/dxxvbrgie/video/upload/v1772785849/AW_reel9_n8lbkj.mp4"
            className="w-80 h-86 object-cover rounded-xl shadow-lg"
            muted
            playsInline
            loop
            autoPlay
            lazy={true}
          />
        </div>
      </div>
    </section>
  )
}

export default Feedback