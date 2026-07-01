"use client";

import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { TextToSpeechForm } from "../components/text-to-speech-form";
import { VoicePreviewPlaceHolder } from "../components/voice-preview-placeholder";

export function TextToSpeechView() {
  return (
    <div className='flex min-h-0 flex-1 overflow-hidden'>
      <TextToSpeechForm>
        <div className='flex min-h-0 flex-1 flex-col'>
          <TextInputPanel />
          <VoicePreviewPlaceHolder />
        </div>
        <SettingsPanel />
      </TextToSpeechForm>
    </div>
  );
}
