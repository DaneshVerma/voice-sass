import { useMemo } from "react";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/glass.json" with { type: "json" };

const style = new Style(definition);
export function useVoiceAvatar(seed: string) {
  return useMemo(() => {
    return new Avatar(style, {
      seed: seed,
      size: 128,
    }).toDataUri();
  }, [seed]);
}
