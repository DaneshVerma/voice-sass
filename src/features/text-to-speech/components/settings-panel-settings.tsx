"use client";

import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { useSelector } from "@tanstack/react-store";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import { sliders } from "../data/slider";
import { Slider } from "@/components/ui/slider";
import { VoiceSelector } from "./voice-selector";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

  return (
    <>
      {/* voice style dropdown section */}
      <div className='border-b border-dashed p-4'>
        <VoiceSelector />
      </div>

      {/* voice adjustment section */}

      <div className='p-4 flex-1'>
        <FieldGroup className='gap-8'>
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-muted-foreground'>
                      {slider.leftLable}{" "}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      {slider.rightLabel}{" "}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className='**:data-[slot=slider-thumb:size-3 **:data-[slot=slider-thumb:bg-foreground **:data-[slot=slider-thumb:h-1 cursor-e-resize'
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
