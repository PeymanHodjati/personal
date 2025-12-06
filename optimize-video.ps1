# optimize-video.ps1
param (
    [Parameter(Mandatory=$true)]
    [string]$InputFile
)

if (-not (Test-Path $InputFile)) {
    Write-Error "Input file not found: $InputFile"
    exit 1
}

$OutputFile = "optimized-scroll.mp4"

Write-Host "Optimizing video for smooth scrolling..." -ForegroundColor Cyan
Write-Host "Settings: H.264, All-Intra (Keyframe every frame), No Audio" -ForegroundColor Gray

# Check if ffmpeg is in path, otherwise use absolute path
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    $FFmpegPath = "ffmpeg"
} else {
    $FFmpegPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
}

if (-not (Test-Path $FFmpegPath) -and $FFmpegPath -ne "ffmpeg") {
    Write-Error "FFmpeg not found. Please restart your terminal."
    exit 1
}

# -g 1: Keyframe interval of 1 (Every frame is a keyframe)
# -an: Remove audio
# -preset slow: Better compression
# -crf 22: High quality
& $FFmpegPath -i $InputFile -c:v libx264 -preset slow -crf 22 -g 1 -keyint_min 1 -an -y $OutputFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Created $OutputFile" -ForegroundColor Green
    Write-Host "Upload this file to your R2 bucket." -ForegroundColor Yellow
} else {
    Write-Error "FFmpeg failed."
}
