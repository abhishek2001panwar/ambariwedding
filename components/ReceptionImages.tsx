"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape";
}

// Explicit list of all 28 Reception images
const RECEPTION_IMAGES: ImageItem[] = [
  // ---------------------------------------------------------------------------
  // 12 PORTRAIT IMAGES
  // ---------------------------------------------------------------------------
  { id: "rec-p-1",  src: "/receptionimages/portrait1.jpeg",  alt: "Bride and Groom Entrance", aspect: "portrait" },
  { id: "rec-p-2",  src: "/receptionimages/portrait2.jpeg",  alt: "Bride Solo on Stage",      aspect: "portrait" },
  { id: "rec-p-3",  src: "/receptionimages/portrait3.jpeg",  alt: "Groom Portrait in Suit",   aspect: "portrait" },
  { id: "rec-p-4",  src: "/receptionimages/portrait4.jpeg",  alt: "Couple First Look",        aspect: "portrait" },
  { id: "rec-p-5",  src: "/receptionimages/portrait5.jpeg",  alt: "Stage Decor Vertical",     aspect: "portrait" },
  { id: "rec-p-6",  src: "/receptionimages/portrait6.jpeg",  alt: "Bride Lehenga Detail",     aspect: "portrait" },
  { id: "rec-p-7",  src: "/receptionimages/portrait7.jpeg",  alt: "Groom Getting Ready",      aspect: "portrait" },
  { id: "rec-p-8",  src: "/receptionimages/portrait8.jpeg",  alt: "Couple Candid Moment",     aspect: "portrait" },
  { id: "rec-p-9",  src: "/receptionimages/portrait9.jpeg",  alt: "Bride Family Photo",       aspect: "portrait" },
  { id: "rec-p-10", src: "/receptionimages/portrait10.jpeg", alt: "Groom Family Photo",       aspect: "portrait" },
  { id: "rec-p-11", src: "/receptionimages/portrait11.PNG", alt: "Floral Archway Decor",     aspect: "portrait" },
  { id: "rec-p-12", src: "/receptionimages/portrait12.jpeg", alt: "Couple Stage Walkout",     aspect: "portrait" },

  // ---------------------------------------------------------------------------
  // 16 LANDSCAPE IMAGES
  // ---------------------------------------------------------------------------
  { id: "rec-l-1",  src: "/receptionimages/img1.jpeg",  alt: "Reception Landscape 1",  aspect: "landscape" },
  { id: "rec-l-3",  src: "/receptionimages/img3.jpeg",  alt: "Reception Landscape 3",  aspect: "landscape" },
  { id: "rec-l-4",  src: "/receptionimages/img4.jpeg",  alt: "Reception Landscape 4",  aspect: "landscape" },
  { id: "rec-l-5",  src: "/receptionimages/img5.jpeg",  alt: "Reception Landscape 5",  aspect: "landscape" },
  { id: "rec-l-6",  src: "/receptionimages/img6.jpeg",  alt: "Reception Landscape 6",  aspect: "landscape" },
  { id: "rec-l-7",  src: "/receptionimages/img7.jpeg",  alt: "Reception Landscape 7",  aspect: "landscape" },
  { id: "rec-l-8",  src: "/receptionimages/img8.jpeg",  alt: "Reception Landscape 8",  aspect: "landscape" },
  { id: "rec-l-9",  src: "/receptionimages/img9.jpeg",  alt: "Reception Landscape 9",  aspect: "landscape" },
  { id: "rec-l-10", src: "/receptionimages/img10.jpeg", alt: "Reception Landscape 10", aspect: "landscape" },
  { id: "rec-l-11", src: "/receptionimages/img11.jpeg", alt: "Reception Landscape 11", aspect: "landscape" },
  { id: "rec-l-12", src: "/receptionimages/img13.jpeg", alt: "Reception Landscape 12", aspect: "landscape" },
  { id: "rec-l-13", src: "/receptionimages/img20.jpeg", alt: "Reception Landscape 13", aspect: "landscape" },
  { id: "rec-l-14", src: "/receptionimages/img21.jpeg", alt: "Reception Landscape 14", aspect: "landscape" },
  { id: "rec-l-15", src: "/receptionimages/img22.jpeg", alt: "Reception Landscape 15", aspect: "landscape" },
  { id: "rec-l-16", src: "/receptionimages/img23.jpeg", alt: "Reception Landscape 16", aspect: "landscape" },
];

export function ReceptionImages() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVis(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        marginBottom: "88px",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridAutoRows: "220px",
          gridAutoFlow: "dense",
          gap: "12px",
        }}
      >
        {RECEPTION_IMAGES.map((img) => {
          const isPortrait = img.aspect === "portrait";
          return (
            <div
              key={img.id}
              style={{
                gridRowEnd: isPortrait ? "span 2" : "span 1",
                position: "relative",
                borderRadius: "6px",
                overflow: "hidden",
                background: "#e8e2da",
                boxShadow: "0 2px 14px rgba(26,20,16,0.06)",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                quality={85}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}