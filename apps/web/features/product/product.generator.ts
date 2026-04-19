import { aiClient } from "@/lib/ai/openrouter";

export async function generateProduct(data: any) {
  const prompt = `
Você é uma IA especialista em criação e venda de produtos digitais altamente lucrativos.

Seu objetivo é gerar algo PRONTO PARA VENDER.

Dados:
Nicho: ${data.niche}
Público: ${data.target}
Dor: ${data.pain}

Gere obrigatoriamente:

1. Nome do Produto
2. Promessa forte
3. Público alvo detalhado
4. Dor principal
5. Oferta irresistível
6. Estrutura do produto
7. Ideia de conteúdo interno
8. Preço sugerido
9. Estratégia de venda

Seja direto, estratégico e focado em conversão.
`;

  return aiClient.generate(prompt);
}