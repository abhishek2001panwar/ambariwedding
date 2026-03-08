let activeVideo: HTMLVideoElement | null = null

export function playVideo(video: HTMLVideoElement) {
  if (activeVideo && activeVideo !== video) {
    activeVideo.pause()
  }

  activeVideo = video
  video.play().catch(() => {})
}