"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "../data/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

export function TextInputPanel() {
  const [text, setText] = useState("");

  return (
    <div className='flex h-full min-h-0 flex-col flex-1'>
      {/*  Text input area */}
      <div className='relative min-h-0 flex-1'>
        <div className=' z-50 pointer-events-none absolute inset-x-0 top-0 h-5 bg-linear-to-b from-background to-transparent' />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Start typing or paste your text here'
          className='absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:right-0'
          maxLength={TEXT_MAX_LENGTH}
          name='voice-text-area'
        />
        {/* Bottom fade overlay */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background to-transparent' />
      </div>
      {/* Action Bar */}
      <div className='shrink-0 p-4 lg:p-6'>
        {/* Mobile  */}
        <div className='flex flex-col gap-3 lg:hidden'>
          <Button className='w-full'>Generate</Button>
        </div>

        {/* Desktop */}
        {text.length > 0 ? (
          <div className='hidden items-center justify-between lg:flex'>
            <Badge variant={"outline"} className='gap-1.5 border-dashed'>
              <Coins className='size-3 text-chart-5' />
              <span className='text-xs'>
                <span className='tabular-nums'>
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>
                &nbsp; estimated
              </span>
            </Badge>
            <div className='flex items-center gap-3'>
              <p className='text-xs tracking-tight'>
                {text.length.toLocaleString()}
                <span className='text-muted-foreground '>
                  &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()}
                  &nbsp; characters
                </span>
              </p>
              <Button size={"sm"}>Generate Speech</Button>
            </div>
          </div>
        ) : (
          <div className='hidden lg:block'>
            <p className='text-sm text-muted-foreground'>
              Get started by typing or pasting text above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
