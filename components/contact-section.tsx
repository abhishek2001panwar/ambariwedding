"use client"

import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

function MapEmbed() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 420 }}>
      <iframe
        title="Ambari Weddings Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452109375!3d12.95428020000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
        width="100%" height="100%"
        style={{
          border: 0, display: "block", position: "absolute", inset: 0,
        }}
        allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
      />

      {/* location badge */}
      <div style={{
        position: "absolute", bottom: 14, left: 14, zIndex: 3,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(201,169,110,0.4)", borderRadius: 4,
        padding: "6px 12px", whiteSpace: "nowrap",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}>
        <MapPin style={{ width: 10, height: 10, color: "#c9a96e", flexShrink: 0 }} />
        <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#444", textTransform: "uppercase" }}>
          Bengaluru, Karnataka
        </span>
      </div>
    </div>
  )
}

export function ContactSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus("error"); setTimeout(() => setSubmitStatus("idle"), 3000); return
    }
    setIsSubmitting(true); setSubmitStatus("idle")
    try {
      const { error } = await supabase.from("contact").insert([formData])
      if (error) throw error
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error"); setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally { setIsSubmitting(false) }
  }

  return (
    <section
      id="contact"
      className="bg-background text-foreground"
      style={{ padding: "clamp(56px,8vw,112px) clamp(20px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "clamp(40px,6vw,88px)",
          alignItems: "start",
        }}>

          {/* ── LEFT — headline + form ─────────────────────────────────── */}
          <div
            ref={headRef}
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Headline */}
            <h2 style={{
              fontWeight: 300,
              fontSize: "clamp(34px,5vw,64px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}>
              {"Hi, let's plan your"}
              <br />
              <em style={{
                fontStyle: "italic",
                color: "#c9a96e",
                position: "relative",
                display: "inline-block",
              }}>
                dream wedding.
                <span style={{
                  position: "absolute", bottom: 3, left: 0, right: 0,
                  height: 10, background: "rgba(201,169,110,0.15)",
                  borderRadius: 4, zIndex: -1,
                }} />
              </em>
            </h2>

            <p style={{
              fontSize: "clamp(14px,1.4vw,16px)",
              color: "rgba(var(--foreground-rgb, 26,22,18), 0.5)",
              lineHeight: 1.65,
              marginBottom: "clamp(28px,4vw,44px)",
            }}
              className="text-foreground/50"
            >
              For enquiries, please fill out the form and we'll get back to you.
            </p>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input
                  type="text" name="name" placeholder="Your Name *"
                  value={formData.name} onChange={handleChange}
                  className="w-full border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/40 focus:border-[#c9a96e]/70 focus:outline-none transition-colors duration-300"
                  style={{ padding: "13px 16px", fontSize: 14 }}
                />
                <input
                  type="email" name="email" placeholder="Email Address *"
                  value={formData.email} onChange={handleChange}
                  className="w-full border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/40 focus:border-[#c9a96e]/70 focus:outline-none transition-colors duration-300"
                  style={{ padding: "13px 16px", fontSize: 14 }}
                />
              </div>

              {/* Phone */}
              <input
                type="tel" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleChange}
                className="w-full border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/40 focus:border-[#c9a96e]/70 focus:outline-none transition-colors duration-300"
                style={{ padding: "13px 16px", fontSize: 14 }}
              />

              {/* Message */}
              <textarea
                name="message" placeholder="Tell us about your wedding…" rows={5}
                value={formData.message} onChange={handleChange}
                className="w-full border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/40 focus:border-[#c9a96e]/70 focus:outline-none transition-colors duration-300 resize-none"
                style={{ padding: "13px 16px", fontSize: 14, minHeight: 140 }}
              />

              {/* Bottom row — privacy + submit */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 2 }}>
                <p className="text-foreground/35" style={{ fontSize: 11, letterSpacing: "0.03em" }}>
                  By submitting you agree to our Privacy Policy.
                </p>
                <button
                  type="button" onClick={handleSubmit} disabled={isSubmitting}
                  className="inline-flex items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                  style={{ padding: "12px 28px", fontSize: 12 }}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="rounded border border-green-500/25 bg-green-500/8 p-3">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Message sent — we'll be in touch soon.
                  </p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded border border-red-500/25 bg-red-500/8 p-3">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Please fill in all fields and try again.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT — Map + contact details ─────────────────────────── */}
          <div
            ref={bodyRef}
            style={{
              opacity: bodyVisible ? 1 : 0,
              transform: bodyVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s ease 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
              display: "flex", flexDirection: "column", gap: 24,
            }}
          >
            {/* Map */}
            <div style={{
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 6px 32px rgba(0,0,0,0.07)",
            }}>
              <MapEmbed />
            </div>

            {/* Direct contact row */}
            <div>
              <p className="text-foreground/50" style={{ fontSize: 15, marginBottom: 16 }}>
                Prefer direct contact? Reach us here
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px 32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href="mailto:ambariweddings@gmail.com"
                    className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300"
                    style={{ fontSize: 14 }}
                  >
                    <Mail style={{ width: 13, height: 13, color: "#c9a96e", flexShrink: 0 }} />
                    <span className="border-b border-[#c9a96e]/25 hover:border-[#c9a96e]/60 pb-px transition-colors duration-300">
                      ambariweddings@gmail.com
                    </span>
                  </a>
                  <a href="tel:+917892052739"
                    className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300"
                    style={{ fontSize: 14 }}
                  >
                    <Phone style={{ width: 13, height: 13, color: "#c9a96e", flexShrink: 0 }} />
                    <span>+91 9663041267</span>
                  </a>
                </div>

                <div className="flex items-start gap-2 text-foreground/60" style={{ fontSize: 14 }}>
                  <MapPin style={{ width: 13, height: 13, color: "#c9a96e", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ lineHeight: 1.6 }}>
                    Ambari Weddings<br />Bengaluru, Karnataka
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}