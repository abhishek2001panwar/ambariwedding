# VIDEO COMPRESSION SCRIPT FOR WINDOWS
# PowerShell Script to Compress All Videos
# Usage: Open PowerShell in video directory and run: .\compress-videos.ps1

Write-Host "🎬 Video Compression Tool for Windows" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$crf = 24                  # Quality: 18-28 (lower = better, larger file)
$preset = "medium"         # Speed: ultrafast, fast, medium, slow
$resolution = "1280"       # Max width in pixels
$audioBitrate = "96k"      # Audio quality

Write-Host "⚙️  Compression Settings:" -ForegroundColor Yellow
Write-Host "  - Quality (CRF): $crf"
Write-Host "  - Speed: $preset"
Write-Host "  - Max Resolution: ${resolution}px"
Write-Host "  - Audio Bitrate: $audioBitrate"
Write-Host ""

# Check if FFmpeg is installed
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpegPath) {
    Write-Host "❌ FFmpeg not found!" -ForegroundColor Red
    Write-Host "Please install FFmpeg from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ FFmpeg found at: $($ffmpegPath.Path)" -ForegroundColor Green
Write-Host ""

# Create output directory
$outputDir = "optimized-videos"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

Write-Host "📁 Output directory: .\$outputDir\" -ForegroundColor Cyan
Write-Host ""

# Find and compress all videos
$videoFiles = Get-ChildItem -File | Where-Object { $_.Extension -match '\.(mp4|webm|mov|avi|mkv)$' }

if ($videoFiles.Count -eq 0) {
    Write-Host "⚠️  No video files found in current directory!" -ForegroundColor Yellow
    exit 1
}

$total = $videoFiles.Count
$compressed = 0
$startTime = Get-Date

foreach ($video in $videoFiles) {
    # Get file size before compression
    $originalSize = $video.Length
    $originalSizeFormatted = "{0:N2} MB" -f ($originalSize / 1MB)
    
    # Generate output filename
    $outputName = $video.BaseName + "-opt.mp4"
    $output = Join-Path $outputDir $outputName
    
    Write-Host "▶️  Compressing: $($video.Name) ($originalSizeFormatted)" -ForegroundColor Cyan
    
    # Run FFmpeg compression (suppress verbose output)
    $ffmpegArgs = @(
        "-i", $video.FullName,
        "-c:v", "libx264",
        "-preset", $preset,
        "-crf", $crf,
        "-vf", "scale='min($resolution,iw)':-2",
        "-c:a", "aac",
        "-b:a", $audioBitrate,
        "-movflags", "+faststart",
        "-y",
        $output
    )
    
    & ffmpeg $ffmpegArgs -hide_banner -loglevel warning 2>&1 | ForEach-Object {
        if ($_ -match "time=") {
            Write-Host "   Progress: $_" -ForegroundColor Gray
        }
    }
    
    if (Test-Path $output) {
        $compressed++
        
        # Get file size after compression
        $compressedFile = Get-Item $output
        $compressedSize = $compressedFile.Length
        $compressedSizeFormatted = "{0:N2} MB" -f ($compressedSize / 1MB)
        
        # Calculate reduction percentage
        $reduction = [Math]::Round(100 - ($compressedSize * 100 / $originalSize), 1)
        
        Write-Host "   ✅ Done! $originalSizeFormatted → $compressedSizeFormatted (${reduction}% smaller)" -ForegroundColor Green
        Write-Host ""
    }
    else {
        Write-Host "   ❌ Failed to compress $($video.Name)" -ForegroundColor Red
        Write-Host ""
    }
}

$endTime = Get-Date
$duration = $endTime - $startTime

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "📊 Compression Summary" -ForegroundColor Cyan
Write-Host "  Total videos found: $total" -ForegroundColor White
Write-Host "  Successfully compressed: $compressed" -ForegroundColor Green
Write-Host "  Time taken: $($duration.Minutes)m $($duration.Seconds)s" -ForegroundColor White
Write-Host "  Output location: .\$outputDir\" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review the optimized videos for quality" -ForegroundColor White
Write-Host "  2. Replace original videos on your server" -ForegroundColor White
Write-Host "  3. Update video URLs in your code" -ForegroundColor White
Write-Host "  4. Test playback in browser" -ForegroundColor White
Write-Host ""
