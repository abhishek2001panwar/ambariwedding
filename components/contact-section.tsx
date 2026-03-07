"use client"

import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

// ── Decorative SVG ornament ─────────────────────────────────────────────────
function Ornament() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 md:w-10 md:h-10" fill="none">
      <circle cx="24" cy="24" r="21" stroke="#c9a96e" strokeWidth="0.6" opacity="0.45" />
      <circle cx="24" cy="24" r="3.5" fill="#c9a96e" opacity="0.5" />
      <line x1="24" y1="3" x2="24" y2="12" stroke="#c9a96e" strokeWidth="0.6" opacity="0.4" />
      <line x1="24" y1="36" x2="24" y2="45" stroke="#c9a96e" strokeWidth="0.6" opacity="0.4" />
      <line x1="3" y1="24" x2="12" y2="24" stroke="#c9a96e" strokeWidth="0.6" opacity="0.4" />
      <line x1="36" y1="24" x2="45" y2="24" stroke="#c9a96e" strokeWidth="0.6" opacity="0.4" />
      <circle cx="24" cy="24" r="11" stroke="#c9a96e" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
    </svg>
  )
}

export function ContactSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const { error } = await supabase
        .from("contact")
        .insert([{ name: formData.name, email: formData.email, phone: formData.phone, message: formData.message }])
      if (error) throw error
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="px-4 py-12 xs:py-14 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 bg-background text-foreground"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-20 max-w-[1400px] mx-auto">

        {/* ── LEFT — Glass panel + info ─────────────────────────────────── */}
        <div
          ref={headRef}
          className={`flex gap-0 items-stretch transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* ── GLASS LEFT RAIL ──────────────────────────────────────────── */}
          <div
            className="hidden md:flex flex-col items-center justify-between py-6 md:py-8 relative overflow-hidden"
            style={{
              width: "48px",
              flexShrink: 0,
              background: "rgba(201,169,110,0.04)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRight: "1px solid rgba(201,169,110,0.12)",
              borderRadius: "2px 0 0 2px",
            }}
          >
            {/* Top shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(to bottom, rgba(201,169,110,0.07), transparent)",
                pointerEvents: "none",
              }}
            />

            {/* Vertical label top */}
            <div
              className="text-[7px] md:text-[9px] tracking-[0.35em] md:tracking-[0.45em] text-[#c9a96e]/50 font-light select-none z-10"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              CONTACT
            </div>

            {/* Ornament center */}
            <div className="opacity-70 z-10">
              <Ornament />
            </div>

            {/* Vertical label bottom */}
            <div
              className="text-[7px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] text-[#c9a96e]/30 font-light select-none z-10"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              AMBARI
            </div>

            {/* Vertical center line */}
            <div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "1px",
                height: "35%",
                background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.18), transparent)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ── Info content ─────────────────────────────────────────────── */}
          <div
            className="flex-1 px-5 py-6 sm:px-6 sm:py-8 md:px-7 md:py-8 lg:px-7 lg:py-8 rounded-[2px] md:rounded-l-none md:rounded-r-[2px] border border-[#c9a96e]/[0.08] md:border-l-0"
            style={{
              background: "rgba(201,169,110,0.02)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-foreground/40 mb-6 md:mb-8">
              Get in Touch
            </p>

            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight">
              <span className="block">{"Let's bring your"}</span>
              <span className="block italic text-foreground/50">wedding vision</span>
              <span className="block">to life</span>
            </h2>

            {/* Gold rule */}
            <div className="w-8 h-px bg-[#c9a96e] opacity-40 my-5 md:my-7" />

            <div className="flex flex-col gap-5 md:gap-6">
              {/* Address */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="mt-0.5 h-7 w-7 md:h-8 md:w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5 text-foreground/40" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-foreground/30 mb-1">Address</p>
                  <p className="text-xs md:text-sm leading-relaxed text-foreground/60">Bengaluru, Karnataka.</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="mt-0.5 h-7 w-7 md:h-8 md:w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-foreground/40" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-foreground/30 mb-1">Email</p>
                  <a
                    href="mailto:ambariweddings@gmail.com"
                    className="group inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-foreground/60 hover:text-foreground transition-colors duration-500 break-all"
                  >
                    <span className="border-b border-foreground/15 pb-0.5 group-hover:border-foreground/50 transition-colors duration-500">
                      ambariweddings@gmail.com
                    </span>
                    <ArrowUpRight className="h-2.5 w-2.5 md:h-3 md:w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="mt-0.5 h-7 w-7 md:h-8 md:w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="h-3 w-3 md:h-3.5 md:w-3.5 text-foreground/40" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-foreground/30 mb-1">Phone</p>
                  <a
                    href="tel:+917892052739"
                    className="text-xs md:text-sm text-foreground/60 hover:text-foreground transition-colors duration-500"
                  >
                    +91 7892-052739
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — Form ──────────────────────────────────── */}
        <div
          ref={bodyRef}
          className={`transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-foreground/40 mb-6 sm:mb-8 md:mb-10">
            Send a Message
          </p>

          <div className="flex flex-col gap-3 md:gap-4">
            {/* Name */}
            <div className={`relative rounded-xl md:rounded-2xl border transition-colors duration-300 px-4 md:px-5 pt-4 md:pt-5 pb-2.5 md:pb-3 ${
              focused === "name" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label htmlFor="name" className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none ${
                focused === "name" || formData.name
                  ? "top-2 md:top-2.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                  : "top-1/2 -translate-y-1/2 text-xs md:text-sm text-foreground/40"
              }`}>Name</label>
              <input id="name" name="name" type="text" value={formData.name}
                onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-2.5 md:pt-3 text-xs md:text-sm text-foreground outline-none" />
            </div>

            {/* Email */}
            <div className={`relative rounded-xl md:rounded-2xl border transition-colors duration-300 px-4 md:px-5 pt-4 md:pt-5 pb-2.5 md:pb-3 ${
              focused === "email" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label htmlFor="email" className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none ${
                focused === "email" || formData.email
                  ? "top-2 md:top-2.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                  : "top-1/2 -translate-y-1/2 text-xs md:text-sm text-foreground/40"
              }`}>Email</label>
              <input id="email" name="email" type="email" value={formData.email}
                onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-2.5 md:pt-3 text-xs md:text-sm text-foreground outline-none" />
            </div>

            {/* Phone */}
            <div className={`relative rounded-xl md:rounded-2xl border transition-colors duration-300 px-4 md:px-5 pt-4 md:pt-5 pb-2.5 md:pb-3 ${
              focused === "phone" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label htmlFor="phone" className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none ${
                focused === "phone" || formData.phone
                  ? "top-2 md:top-2.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                  : "top-1/2 -translate-y-1/2 text-xs md:text-sm text-foreground/40"
              }`}>Phone Number</label>
              <input id="phone" name="phone" type="tel" value={formData.phone}
                onChange={handleChange} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-2.5 md:pt-3 text-xs md:text-sm text-foreground outline-none" />
            </div>

            {/* Message */}
            <div className={`relative rounded-xl md:rounded-2xl border transition-colors duration-300 px-4 md:px-5 pt-4 md:pt-5 pb-2.5 md:pb-3 ${
              focused === "message" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label htmlFor="message" className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none ${
                focused === "message" || formData.message
                  ? "top-2 md:top-2.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                  : "top-4 md:top-5 text-xs md:text-sm text-foreground/40"
              }`}>Message</label>
              <textarea id="message" name="message" rows={3} className="w-full bg-transparent pt-2.5 md:pt-3 text-xs md:text-sm text-foreground outline-none resize-none min-h-[80px] sm:min-h-[90px] md:min-h-[100px]" value={formData.message}
                onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-1 sm:pt-1.5 md:pt-2">
              <button type="button" onClick={handleSubmit} disabled={isSubmitting}
                className="group relative inline-flex items-center gap-2 md:gap-3 text-[10px] xs:text-xs md:text-sm tracking-wider md:tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send"}</span>
                <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-foreground/20 group-hover:border-foreground/60 transition-colors duration-500">
                  <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground/30 group-hover:w-[calc(100%-2.25rem)] sm:group-hover:w-[calc(100%-2.5rem)] md:group-hover:w-[calc(100%-3rem)] transition-all duration-500" />
              </button>
            </div>

            {submitStatus === "success" && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs md:text-sm text-green-600 dark:text-green-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs md:text-sm text-red-600 dark:text-red-400">Please fill in all fields and try again.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}