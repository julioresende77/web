export const createProductFlow = {
  id: "create-product",
  name: "Criar Produto Digital",
  type: "product",
  steps: [
    { id: "niche", question: "Qual nicho?", field: "niche" },
    { id: "target", question: "Quem é o público?", field: "target" },
    { id: "pain", question: "Qual dor resolve?", field: "pain" },
  ],
};