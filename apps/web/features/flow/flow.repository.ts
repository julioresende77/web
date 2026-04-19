import { Flow } from "./flow.types";

export const productFlow: Flow = {
  id: "create-product",
  steps: [
    {
      id: "niche",
      question: "Qual nicho você quer atuar?",
      field: "niche",
    },
    {
      id: "target",
      question: "Quem é seu público?",
      field: "target",
    },
    {
      id: "pain",
      question: "Qual dor você resolve?",
      field: "pain",
    },
  ],
};