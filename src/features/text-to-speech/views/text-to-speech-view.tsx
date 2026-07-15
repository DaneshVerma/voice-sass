"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";

import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceHolder } from "../components/voice-preview-placeholder";
import {
  defaultTTSValues,
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());

  const { custom: customVoices, system: systemVoices } = voices;

  const allVoices = [...customVoices, ...systemVoices];
  const fallBackVoiceId = allVoices[0]?.id ?? "";

  // Requested voices may no longer exists (deleted); 
  // fall back to first availablepn
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallBackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };
  return (
    <TTSVoicesProvider value={{ customVoices,systemVoices,allVoices  }}>
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <TextToSpeechForm defaultValues={defaultValues}>
          <div className='flex min-h-0 flex-1 flex-col'>
            <TextInputPanel />
            <VoicePreviewPlaceHolder />
          </div>
          <SettingsPanel />
        </TextToSpeechForm>
      </div>
    </TTSVoicesProvider>
  );
}
