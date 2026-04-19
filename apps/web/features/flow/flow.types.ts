export type Step = {
  id: string;
  question: string;
  field: string;
};

export type Flow = {
  id: string;
  name: string;
  steps: Step[];
  type: "product" | "post" | "ads" | "seller";
};