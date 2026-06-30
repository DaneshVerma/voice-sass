import { Button } from "@/components/ui/button";
import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";
import Link from "next/link";

export function VoicePreviewPlaceHolder() {
  return (
    <div className='hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-6 border-t'>
      <div className='flex flex-col items-center gap-3'>
        <div className='relative flex flex-col w-32 items-center justify-center'>
          <div className='absolute left-0 -rotate-30 rounded-full bg-muted p-4'>
            <Volume2 className='size-5 text-muted-foreground' />
          </div>

          <div className='relative z-10 rounded-full bg-foreground p-4'>
            <Sparkles className='size-5 text-background' />
          </div>

          <div className='absolute right-0 -rotate-30 rounded-full bg-muted p-4'>
            <AudioLines className='size-5 text-muted-foreground' />
          </div>
        </div>
        <p className='text-lg font-semibold tracking-tight text-foreground'>
          Previw will appear here
        </p>
        <p className='max-w-64 text-center text-sm text-muted-foreground'>
          Once you generate,y your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      <Button asChild variant={"outline"} size={"sm"}>
        <Link href={"#"}>
          <BookOpen />
          Don&apos;t know how?
        </Link>
      </Button>
    </div>
  );
}
