export const createAdsFlow = {
  id: "create-ads",
  name: "Criar Anúncio",
  type: "ads",
  steps: [
    { id: "product", question: "Qual produto?", field: "product" },
    { id: "audience", question: "Público alvo?", field: "audience" },
  ],
};