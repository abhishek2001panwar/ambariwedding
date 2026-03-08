"use client";

import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  lazy?: boolean;
  onLoad?: () => void;
}

export function OptimizedVideo({
  src,
  poster,
  className = "",
  style,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  lazy = true,
  onLoad,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy) return;

    // Lazy load video when it enters viewport
  observerRef.current = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = videoRef.current

      if (!video) return

      if (entry.isIntersecting) {
        setShouldLoad(true)

        import("@/utils/videoManager").then(({ playVideo }) => {
          playVideo(video)
        })
      } else {
        video.pause()
      }
    })
  },
  {
    rootMargin: "150px",
    threshold: 0.4,
  }
)

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Optimize Cloudinary URL
  const optimizedSrc =
    src.includes("cloudinary.com") && !src.includes("sp_auto")
      ? src.replace("/upload/", "/upload/q_auto:low,f_auto,w_720/")
      : src;

  //Auto-generate poster thumbnail from Cloudinary if not provided
  const autoPoster =
    poster ||
    (src.includes("cloudinary.com")
      ? src
          .replace("/upload/", "/upload/so_0,q_auto,f_auto,w_800/")
          .replace(/\.(mp4|mov|webm)$/i, ".jpg")
      : undefined);
  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {shouldLoad ? (
       <video
  ref={videoRef}
  src={optimizedSrc}
  poster={autoPoster}
  className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
  style={style}
  autoPlay
  loop={loop}
  muted
  playsInline
  controls={controls}
  preload="metadata"
  onLoadedData={handleLoadedData}
/>
      ) : (
        autoPoster && (
          <img
            src={autoPoster}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )
      )}
    </div>
  );
}
