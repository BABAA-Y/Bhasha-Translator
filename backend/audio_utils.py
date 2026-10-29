import os
import shutil
import subprocess

SAMPLE_RATE = 16000

def get_ffmpeg_executable() -> str:
    """Find FFmpeg in system PATH or via imageio_ffmpeg."""
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception as e:
        raise RuntimeError(f"FFmpeg executable not found: {e}")

def convert_audio_to_wav(audio_bytes: bytes) -> bytes:
    """
    Decodes browser audio (WebM/Opus/Ogg/MP4) into standard mono 16kHz PCM WAV
    required by Gnani Prisma STT.
    """
    executable = get_ffmpeg_executable()
    try:
        proc = subprocess.run(
            [
                executable,
                "-nostdin",
                "-hide_banner",
                "-loglevel", "error",
                "-i", "pipe:0",
                "-vn",
                "-f", "wav",
                "-acodec", "pcm_s16le",
                "-ac", "1",
                "-ar", str(SAMPLE_RATE),
                "pipe:1",
            ],
            input=audio_bytes,
            capture_output=True,
            check=False,
            timeout=30,
        )
        if proc.returncode != 0:
            err = proc.stderr.decode("utf-8", errors="replace").strip()
            raise ValueError(f"FFmpeg conversion failed: {err}")
        if not proc.stdout:
            raise ValueError("FFmpeg output is empty")
        return proc.stdout
    except subprocess.TimeoutExpired:
        raise ValueError("Audio conversion timed out")
