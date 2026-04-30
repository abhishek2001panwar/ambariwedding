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
  preload?: "none" | "metadata" | "auto";
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
  preload = "auto",
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy) return;

    // Lazy load video when it enters viewport with larger margin for faster loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;

          if (entry.isIntersecting) {
            setShouldLoad(true);
            
            // Only call playVideo if autoPlay is not enabled
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
        rootMargin: "700px", // Increased from 300px for faster preloading
        threshold: 0.01,
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
    setIsLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Add ImageKit compression parameters for faster loading
  const addImageKitTransforms = (url: string): string => {
    if (url.includes('ik.imagekit.io')) {
      // Add compression: quality 65%, max height 720px
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tr=q-65,h-720,f-auto`;
    }
    return url;
  };

  // Use proxy for external videos to bypass CORS
  const videoUrl = getProxyVideoUrl(src);
  const optimizedSrc = addImageKitTransforms(videoUrl);

  useEffect(() => {
    if (videoRef.current && autoPlay && shouldLoad) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad, autoPlay]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${lazy && !shouldLoad ? 'min-h-[200px] bg-black/5' : 'bg-black/5'}`}>
      {shouldLoad ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 animate-pulse">
              <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <video
            ref={videoRef}
            className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
            style={style}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            controls={controls}
            preload={preload}
            onLoadStart={handleLoadStart}
            onLoadedData={handleLoadedData}
            onCanPlay={() => {
              if (!isLoaded) {
                setIsLoaded(true);
                setIsLoading(false);
              }
            }}
            onError={handleError}
            crossOrigin="anonymous"
          >
            <source src={optimizedSrc} type="video/mp4" />
            {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
            Your browser does not support the video tag.
          </video>
        </>
      ) : null}
    </div>
  );
}
