"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape";
}

// Placeholder image array - replace 'src' paths with your real image URLs
const WEDDING_IMAGES: ImageItem[] = [
  // ---------------------------------------------------------------------------
  // 3 PORTRAIT IMAGES
  // ---------------------------------------------------------------------------
  { id: "wed-p-1",  src: "/weddingimages/portrait1.jpeg", alt: "Wedding Portrait 1",  aspect: "portrait" },
  { id: "wed-p-2",  src: "/weddingimages/portrait2.jpeg", alt: "Wedding Portrait 2",  aspect: "portrait" },
  { id: "wed-p-3",  src: "/weddingimages/portrait3.jpeg", alt: "Wedding Portrait 3",  aspect: "portrait" },

  // ---------------------------------------------------------------------------
  // 34 LANDSCAPE IMAGES
  // ---------------------------------------------------------------------------
  { id: "wed-l-2",  src: "/weddingimages/img2.jpeg",  alt: "Wedding Landscape 2",  aspect: "landscape" },
  { id: "wed-l-3",  src: "/weddingimages/img3.jpeg",  alt: "Wedding Landscape 3",  aspect: "landscape" },
  { id: "wed-l-4",  src: "/weddingimages/img4.jpeg",  alt: "Wedding Landscape 4",  aspect: "landscape" },
  { id: "wed-l-5",  src: "/weddingimages/img5.jpeg",  alt: "Wedding Landscape 5",  aspect: "landscape" },
  { id: "wed-l-6",  src: "/weddingimages/img6.jpeg",  alt: "Wedding Landscape 6",  aspect: "landscape" },
  { id: "wed-l-7",  src: "/weddingimages/img7.jpeg",  alt: "Wedding Landscape 7",  aspect: "landscape" },
  { id: "wed-l-8",  src: "/weddingimages/img8.jpeg",  alt: "Wedding Landscape 8",  aspect: "landscape" },
  { id: "wed-l-9",  src: "/weddingimages/img9.jpeg",  alt: "Wedding Landscape 9",  aspect: "landscape" },
  { id: "wed-l-10", src: "/weddingimages/img10.jpeg", alt: "Wedding Landscape 10", aspect: "landscape" },
  { id: "wed-l-11", src: "/weddingimages/img11.jpeg", alt: "Wedding Landscape 11", aspect: "landscape" },
  { id: "wed-l-12", src: "/weddingimages/img12.jpeg", alt: "Wedding Landscape 12", aspect: "landscape" },
  { id: "wed-l-13", src: "/weddingimages/img13.PNG", alt: "Wedding Landscape 13", aspect: "landscape" },
  { id: "wed-l-14", src: "/weddingimages/img14.jpeg", alt: "Wedding Landscape 14", aspect: "landscape" },
  { id: "wed-l-15", src: "/weddingimages/img15.jpeg", alt: "Wedding Landscape 15", aspect: "landscape" },
  { id: "wed-l-16", src: "/weddingimages/img16.PNG", alt: "Wedding Landscape 16", aspect: "landscape" },
  { id: "wed-l-17", src: "/weddingimages/img17.jpeg", alt: "Wedding Landscape 17", aspect: "landscape" },
  { id: "wed-l-18", src: "/weddingimages/img18.jpeg", alt: "Wedding Landscape 18", aspect: "landscape" },
  { id: "wed-l-19", src: "/weddingimages/img19.jpeg", alt: "Wedding Landscape 19", aspect: "landscape" },
  { id: "wed-l-20", src: "/weddingimages/img20.jpeg", alt: "Wedding Landscape 20", aspect: "landscape" },
  { id: "wed-l-21", src: "/weddingimages/img21.jpeg", alt: "Wedding Landscape 21", aspect: "landscape" },
  { id: "wed-l-22", src: "/weddingimages/img22.jpeg", alt: "Wedding Landscape 22", aspect: "landscape" },
  { id: "wed-l-23", src: "/weddingimages/img23.jpeg", alt: "Wedding Landscape 23", aspect: "landscape" },
  { id: "wed-l-24", src: "/weddingimages/img24.jpeg", alt: "Wedding Landscape 24", aspect: "landscape" },
  { id: "wed-l-25", src: "/weddingimages/img25.jpeg", alt: "Wedding Landscape 25", aspect: "landscape" },
  { id: "wed-l-26", src: "/weddingimages/img26.jpeg", alt: "Wedding Landscape 26", aspect: "landscape" },
  { id: "wed-l-27", src: "/weddingimages/img27.jpeg", alt: "Wedding Landscape 27", aspect: "landscape" },
  { id: "wed-l-28", src: "/weddingimages/img28.jpeg", alt: "Wedding Landscape 28", aspect: "landscape" },
  { id: "wed-l-29", src: "/weddingimages/img29.jpeg", alt: "Wedding Landscape 29", aspect: "landscape" },
  { id: "wed-l-30", src: "/weddingimages/img30.jpeg", alt: "Wedding Landscape 30", aspect: "landscape" },
  { id: "wed-l-31", src: "/weddingimages/img31.jpeg", alt: "Wedding Landscape 31", aspect: "landscape" },
  { id: "wed-l-32", src: "/weddingimages/img32.jpeg", alt: "Wedding Landscape 32", aspect: "landscape" },
  { id: "wed-l-33", src: "/weddingimages/img33.jpeg", alt: "Wedding Landscape 33", aspect: "landscape" },
  { id: "wed-l-34", src: "/weddingimages/img34.jpeg", alt: "Wedding Landscape 34", aspect: "landscape" },
];

export function WeddingImages() {
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
         <h3
         className="text-center mb-4"
        style={{
          fontSize: "25px",
          fontWeight: 400,
          color: "#1a1410",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          flexShrink: 0,
          alignItems: "center",
        }}
      >
        Wedding {""}
        <em style={{ color: "#8B4513", fontStyle: "" }}>
          Mantapa
        </em>
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridAutoRows: "200px",
          gridAutoFlow: "dense",
          gap: "12px",
        }}
      >
        {WEDDING_IMAGES.map((img) => {
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