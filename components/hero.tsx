"use client";

import { useEffect, useRef, useState } from "react";
import { getProxyVideoUrl } from "@/lib/videoProxy";
import { OptimizedVideo } from "./optimized-video";
import Link from "next/link";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Removed heroVideoUrl - now handled in OptimizedVideo component

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* <OptimizedVideo
          src="https://hsrtiles.in/wp-content/uploads/2026/04/jayamahal_madap_sr0ll9.webm"
          autoPlay
          loop
          muted
          playsInline
          lazy={false}
          className="absolute w-full h-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        /> */}

        <video
          src="https://ik.imagekit.io/ifxwwa7l1h/jayamahal_madap_sr0ll9.webm"
          autoPlay
          loop
          muted
          playsInline
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
            <p className="mb-3 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.25em] text-[#c9a96e]/80">
              We offer two services
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/event-planning"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-background/90 backdrop-blur-md transition hover:bg-white/10"
              >
                Event planning & management
              </Link>
              <Link
                href="/wedding-decor"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-background/90 backdrop-blur-md transition hover:bg-white/10"
              >
                Wedding decor production
              </Link>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
