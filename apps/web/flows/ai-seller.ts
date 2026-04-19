export const aiSellerFlow = {
  id: "ai-seller",
  name: "Vendedor IA",
  type: "seller",
  steps: [
    { id: "product", question: "O que você vende?", field: "product" },
    { id: "price", question: "Qual o preço?", field: "price" },
  ],
};