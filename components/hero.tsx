"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
         <video
          src="https://res.cloudinary.com/dxxvbrgie/video/upload/q_auto,f_auto/v1772823965/jayamahal_madap_sr0ll9.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
       
        {/* Stronger gradient on mobile so text stays legible */}
        <div className="absolute inset-0 bg-foreground/60 md:bg-foreground/50" />
        {/* Extra bottom vignette for text readability on mobile */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-14 md:px-12 lg:px-20 md:pb-20">
        <div className="max-w-5xl">
          <div
            className={`overflow-hidden mb-5 transition-all duration-1000 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-[10px] md:text-[17px] font-bold tracking-[0.3em] uppercase text-background">
              Your Ambari Awaits
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Slightly smaller on mobile so it never wraps awkwardly */}
            <h1 className="text-[clamp(1.7rem,5.5vw,3.7rem)] font-light leading-[1.08] tracking-[-0.03em] text-background">
              Heritage never goes outdated.
              <br className="hidden md:block" />
              Dreams take beautiful form.
              <br className="hidden md:block" />
              <em style={{ color: "#c9a96e", fontStyle: "italic" }}>
                {" "}
                Every celebration deserves its moment.
              </em>
            </h1>
            <p className="text-background mt-3 font-light">
              We don't just plan weddings - we craft experiences where your
              intentions meet grandeur, and every detail carries the weight of
              tradition while telling your unique story.{" "}
            </p>
          </div>

          <div
            className={`mt-6 md:mt-7 transition-all duration-1000 delay-900 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div
              className="px-3 py-2 sm:px-4 sm:py-2 md:px-[18px] md:py-2"
              style={{
                display: "inline-flex",
                gap: "16px",
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "40px",
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
            <span
  className="text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] uppercase text-[#c9a96e]/80 whitespace-nowrap"
>
  Event Planning · Decor · Photography · Catering
</span>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 md:mt-16 flex items-center gap-6 transition-all duration-1000 delay-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-10 md:w-12 h-px bg-background/30" />
          <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-background/40">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
