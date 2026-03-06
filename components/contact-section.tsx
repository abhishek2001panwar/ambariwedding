"use client"

import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

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
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const { error } = await supabase
        .from('contact')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }
        ])

      if (error) throw error

      // Success
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="px-6 py-28 md:px-12 lg:px-20 md:py-20 bg-background text-foreground"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">

        {/* LEFT — Info */}
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/40 mb-8">
            Get in Touch
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            {"Let's bring your"}<br />
            <span className="italic text-foreground/50">wedding vision</span><br />
            to life
          </h2>

          <div className="mt-12 flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 h-8 w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                <MapPin className="h-3.5 w-3.5 text-foreground/40" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-1">Address</p>
                <p className="text-sm leading-relaxed text-foreground/60">
                  Bengaluru, Karnataka.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 h-8 w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                <Mail className="h-3.5 w-3.5 text-foreground/40" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-1">Email</p>
                <a
                  href="mailto:ambariweddings@gmail.com"
                  className="group inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-500"
                >
                  <span className="border-b border-foreground/15 pb-0.5 group-hover:border-foreground/50 transition-colors duration-500">
                    ambariweddings@gmail.com
                  </span>
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 h-8 w-8 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                <Phone className="h-3.5 w-3.5 text-foreground/40" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-1">Phone</p>
                <a
                  href="tel:+917892052739"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-500"
                >
                  +91 7892-052739
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div
          ref={bodyRef}
          className={`transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/40 mb-10">
            Send a Message
          </p>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className={`relative rounded-2xl border transition-colors duration-300 px-5 pt-5 pb-3 ${
              focused === "name" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label
                htmlFor="name"
                className={`absolute left-5 transition-all duration-300 pointer-events-none ${
                  focused === "name" || formData.name
                    ? "top-2.5 text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                    : "top-1/2 -translate-y-1/2 text-sm text-foreground/40"
                }`}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-3 text-sm text-foreground outline-none"
              />
            </div>

            {/* Email */}
            <div className={`relative rounded-2xl border transition-colors duration-300 px-5 pt-5 pb-3 ${
              focused === "email" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label
                htmlFor="email"
                className={`absolute left-5 transition-all duration-300 pointer-events-none ${
                  focused === "email" || formData.email
                    ? "top-2.5 text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                    : "top-1/2 -translate-y-1/2 text-sm text-foreground/40"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-3 text-sm text-foreground outline-none"
              />
            </div>

            {/* Phone */}
            <div className={`relative rounded-2xl border transition-colors duration-300 px-5 pt-5 pb-3 ${
              focused === "phone" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label
                htmlFor="phone"
                className={`absolute left-5 transition-all duration-300 pointer-events-none ${
                  focused === "phone" || formData.phone
                    ? "top-2.5 text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                    : "top-1/2 -translate-y-1/2 text-sm text-foreground/40"
                }`}
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-3 text-sm text-foreground outline-none"
              />
            </div>

            {/* Message */}
            <div className={`relative rounded-2xl border transition-colors duration-300 px-5 pt-5 pb-3 ${
              focused === "message" ? "border-foreground/40" : "border-foreground/15"
            }`}>
              <label
                htmlFor="message"
                className={`absolute left-5 transition-all duration-300 pointer-events-none ${
                  focused === "message" || formData.message
                    ? "top-2.5 text-[10px] tracking-[0.2em] uppercase text-foreground/35"
                    : "top-5 text-sm text-foreground/40"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent pt-3 text-sm text-foreground outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send"}</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 group-hover:border-foreground/60 transition-colors duration-500">
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground/30 group-hover:w-[calc(100%-3rem)] transition-all duration-500" />
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">Please fill in all fields and try again.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}