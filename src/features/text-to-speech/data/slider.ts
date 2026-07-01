interface Slider {
  id: "tempreture" | "topP" | "topK" | "repetitionPenalty";
  label: string;
  leftLable: string;
  rightLabel: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export const sliders: Slider[] = [
  {
    id: "tempreture",
    label: "Creativity",
    leftLable: "Consistant",
    rightLabel: "Expressive",
    min: 0,
    max: 2,
    step: 0.5,
    defaultValue: 0.8,
  },
  {
    id: "topP",
    label: "Voice Varity",
    leftLable: "Stable",
    rightLabel: "Dynamic",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.95,
  },
  {
    id: "topK",
    label: "Expression Range",
    leftLable: "Stuble",
    rightLabel: "Dynamice",
    min: 1,
    max: 10000,
    step: 100,
    defaultValue: 1.2,
  },
  {
    id: "repetitionPenalty",
    label: "Natural Flow",
    leftLable: "Rythmic",
    rightLabel: "Varied",
    min: 1,
    max: 2,
    step: 0.1,
    defaultValue: 1.2,
  },
];
