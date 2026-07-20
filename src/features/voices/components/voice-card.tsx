import Link from "next/link";
import { Mic, MoreHorizontal, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import { VOICE_CATEGORY_LABELS } from "@/features/voices/data/voice-categories";
import Image from "next/image";
import { useAudioPlayback } from "@/hooks/use-audio-playback";

export type VoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface VoiceCardProps {
  voice: VoiceItem;
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function parseLanguage(locale: string) {
  // Extract the country code safely.
  // If it has a hyphen (e.g., "en-US"), take the second part. If not (e.g., "US"), take the whole thing.
  const countryCode = locale.includes("-") ? locale.split("-")[1] : locale;

  const country = countryCode?.toUpperCase() || "";

  if (!country || country.length !== 2) {
    return { flagUrl: "", region: locale };
  }

  const region = regionNames.of(country) ?? country;
  // Generate a reliable SVG image URL instead of relying on unreliable system emojis
  const flagUrl = `https://flagcdn.com/${country.toLowerCase()}.svg`;

  return { flagUrl, region };
}
export function VoiceCard({ voice }: VoiceCardProps) {
  const { flagUrl, region } = parseLanguage(voice.language);

  const audioSrc = `/api/voices/${encodeURIComponent(voice.id)}`;

  const { isPlaying, isLoading, togglePlay } = useAudioPlayback(audioSrc);
  return (
    <div className='flex items-center gap-1 overflow-hidden rounded-xl border pr-3 lg:pr-6'>
      <div className='relative h-24 w-20 shrink-0 lg:h-30 lg:w-24'>
        <div className='absolute left-0 top-0 h-24 w-10 border-r bg-muted/50 lg:h-30 lg:w-12' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <VoiceAvatar
            seed={voice.id}
            name={voice.name}
            className='size-14 border-[1.5px] border-white shadow-xs lg:size-18'
          />
        </div>
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-1.5 lg:gap-3'>
        <div className='flex items-center gap-1.5 line-clamp-1 text-sm font-medium tracking-tight'>
          {voice.name}
          <span className='size-1 shrink-0 rounded-full bg-muted-foreground/50' />
          <span className='text-[#327c88]'>
            {VOICE_CATEGORY_LABELS[voice.category]}
          </span>
        </div>

        <p className='line-clamp-1 text-xs text-muted-foreground'>
          {voice.description}
        </p>

        <p className='flex items-center gap-1 text-xs'>
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={`${region} flag`}
              width={16}
              height={12}
              className='object-cover'
              priority={false} // Use true if cards are visible "above the fold" on load
            />
          )}{" "}
          <span className='truncate font-medium'>{region}</span>
        </p>
      </div>

      <div className='ml-1 flex shrink-0 items-center gap-1 lg:ml-3 lg:gap-2'>
        <Button
          variant={"outline"}
          size={"icon-sm"}
          className='rounded-full'
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className='size-4' />
          ) : isPlaying ? (
            <Pause className='size-4' />
          ) : (
            <Play className='size-4' />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              className='rounded-full'
            >
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link href={`/text-to-speech?voiceId=${voice.id}`}>
                <Mic className='size-4 text-foreground' />
                <span className='font-medium'>Use this voice</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
