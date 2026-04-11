#!/bin/bash

# VIDEO COMPRESSION SCRIPT FOR WEB
# This script compresses all videos in the current directory
# Usage: bash compress-all-videos.sh

echo "🎬 Video Compression Tool"
echo "=========================="
echo ""

# Configuration
CRF=24                    # Quality: 18-28 (lower = better quality, larger file)
PRESET="medium"           # Speed: ultrafast, fast, medium, slow
RESOLUTION="1280"         # Max width in pixels
AUDIO_BITRATE="96k"       # Audio quality

echo "⚙️  Settings:"
echo "  - Quality (CRF): $CRF"
echo "  - Speed: $PRESET"
echo "  - Max Resolution: ${RESOLUTION}px"
echo "  - Audio Bitrate: $AUDIO_BITRATE"
echo ""

# Create output directory
mkdir -p optimized-videos
echo "📁 Output directory: ./optimized-videos/"
echo ""

# Counter for progress
total=0
compressed=0

# Find and compress all videos
for video in *.{mp4,webm,mov,avi,mkv}; do
  # Skip if glob pattern doesn't match
  [ -e "$video" ] || continue
  
  total=$((total + 1))
  
  # Get file size before compression
  original_size=$(du -h "$video" | cut -f1)
  original_bytes=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
  
  # Generate output filename
  output="optimized-videos/${video%.*}-opt.mp4"
  
  echo "▶️  Compressing: $video ($original_size)"
  
  # Run FFmpeg compression
  ffmpeg -i "$video" \
    -c:v libx264 \
    -preset "$PRESET" \
    -crf "$CRF" \
    -vf "scale='min($RESOLUTION,iw)':-2" \
    -c:a aac \
    -b:a "$AUDIO_BITRATE" \
    -movflags +faststart \
    -y \
    "$output" 2>&1 | grep -E "frame=|time=" | tail -1
  
  if [ -f "$output" ]; then
    compressed=$((compressed + 1))
    
    # Get file size after compression
    compressed_size=$(du -h "$output" | cut -f1)
    compressed_bytes=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
    
    # Calculate reduction percentage
    reduction=$((100 - (compressed_bytes * 100 / original_bytes)))
    
    echo "   ✅ Done! $original_size → $compressed_size (${reduction}% smaller)"
    echo ""
  else
    echo "   ❌ Failed to compress $video"
    echo ""
  fi
done

echo "=========================="
echo "📊 Compression Summary"
echo "  Total videos: $total"
echo "  Successfully compressed: $compressed"
echo "  Output location: ./optimized-videos/"
echo ""
echo "✨ Next steps:"
echo "  1. Review the optimized videos for quality"
echo "  2. Replace original videos on your server"
echo "  3. Update video URLs in your code"
echo "  4. Test playback in browser"
echo ""
