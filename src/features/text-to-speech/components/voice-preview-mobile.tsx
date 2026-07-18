"use client";

import { useRef, useState, useEffect } from "react";
import { Download, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useIsMobile } from "@/hooks/use-mobile";

type VoicePreviewMobileVoice = {
  id?: string;
  name: string;
};

export function VoicePreviewMobilePanel({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewMobileVoice | null;
  text: string;
}) {
  const isMobile = useIsMobile();
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsplaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handelPlay = () => setIsplaying(true);
    const handelPause = () => setIsplaying(false);
    const handelEnded = () => setIsplaying(false);

    audio.addEventListener("play", handelPlay);
    audio.addEventListener("pause", handelPause);
    audio.addEventListener("ended", handelEnded);

    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener("play", handelPlay);
      audio.removeEventListener("pause", handelPause);
      audio.removeEventListener("ended", handelEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isMobile) {
      audioRef.current?.pause();
    }
  }, [isMobile]);

  const toggelPlayPause = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();
  };

  const handleDownload = () => {
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLocaleLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!audioUrl) return null;

  return (
    <div className='border-t lg:hidden p-4'>
      <audio ref={audioRef} src={audioUrl} />
      <div className='grid grid-cols-[1fr_auto] items-center gap-4'>
        <div className='min-w-0'>
          <p className='truncate text-sm font-medium'>{text}</p>
          {selectedVoiceName && (
            <div className='mt-0.5 flex items-center gap-1 text-xs text-muted-foreground'>
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                name={selectedVoiceName}
                className='shrink-0'
              />
              <span className='truncate'> {selectedVoiceName}</span>
            </div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Button variant={"ghost"} size={"icon"} onClick={handleDownload} >
            <Download className="size-4"/>
          </Button>
          <Button
            variant={"default"}
            size={"icon"}
            className='rounded-full'
            onClick={toggelPlayPause}
          >
            {isPlaying ? (
              <Pause className='fill-background' />
            ) : (
              <Play className='fill-background' />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
