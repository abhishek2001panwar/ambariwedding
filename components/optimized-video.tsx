"use client";

import { useEffect, useRef, useState } from "react";
import { getProxyVideoUrl } from "@/lib/videoProxy";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  lazy?: boolean;
  onLoad?: () => void;
  fallbackSrc?: string;
}

export function OptimizedVideo({
  src,
  className = "",
  style,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  lazy = true,
  onLoad,
  fallbackSrc,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy) return;

    // Lazy load video when it enters viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;

          if (entry.isIntersecting) {
            setShouldLoad(true);
            
            // Only call playVideo if autoPlay is not enabled
            // autoPlay will handle it automatically when video mounts
            if (!autoPlay && video) {
              import("@/utils/videoManager").then(({ playVideo }) => {
                if (videoRef.current) {
                  playVideo(videoRef.current);
                }
              });
            }
          } else {
            if (video) {
              video.pause();
            }
          }
        });
      },
      {
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setError(false);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
  };

  // Use proxy for external videos to bypass CORS
  const videoUrl = getProxyVideoUrl(src);

  // Optimize Cloudinary URL
  const optimizedSrc =
    src.includes("cloudinary.com") && !src.includes("q_auto")
      ? getProxyVideoUrl(src.replace("/upload/", "/upload/q_auto:low,f_auto,w_720/"))
      : videoUrl;



  useEffect(() => {
    if (videoRef.current && autoPlay && shouldLoad) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad, autoPlay]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${lazy && !shouldLoad ? 'min-h-[200px] bg-black/5' : 'bg-black/5'}`}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          className={`transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={style}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          preload={lazy ? "none" : "metadata"}
          onLoadedData={handleLoadedData}
          onError={handleError}
          crossOrigin="anonymous"
        >
          <source src={optimizedSrc} type="video/mp4" />
          {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
          Your browser does not support the video tag.
        </video>
      ) : null}
    </div>
  );
}
