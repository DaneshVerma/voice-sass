"use client";

import { useTRPC } from "@/trpc/client";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { useSuspenseQueries } from "@tanstack/react-query";

import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { VoicePreviewMobilePanel } from "../components/voice-preview-mobile";

export function TextToSpeechDetailView({
  generationId,
}: {
  generationId: string;
}) {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const data = generationQuery.data;

  const { custom: customVoices, system: systemVoices } = voicesQuery.data;

  const allVoices = [...customVoices, ...systemVoices];
  const fallBackVoiceId = allVoices[0]?.id ?? "";

  // Requested voices may no longer exists (deleted);
  // fall back to first availablepn
  const resolvedVoiceId =
    data?.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallBackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    tempreture: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  // in case the voice in this generation is deleted
  // use the denormalized voiceName snapshot insted of a populated voice relation
  // so the preview always shows the voice name at the time of generation
  // even if the voice was later renamed or deleted

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
          <div className='flex min-h-0 flex-1 flex-col'>
            <TextInputPanel />
            <VoicePreviewMobilePanel
              audioUrl={data.audioUrl}
              text={data.text}
              voice={generationVoice}
            />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              text={data.text}
              voice={generationVoice}
            />
          </div>
          <SettingsPanel />
        </TextToSpeechForm>
      </div>
    </TTSVoicesProvider>
  );
}
