import { aiClient } from "@/lib/ai/openrouter";

export async function generateAI(type: string, data: any) {
  let prompt = "";

  if (type === "product") {
    prompt = `
Crie um produto digital vendável:

Nicho: ${data.niche}
Público: ${data.target}
Dor: ${data.pain}

Gere:
- Nome
- Promessa
- Oferta
- Estrutura
- Preço
- Estratégia
`;
  }

  if (type === "post") {
    prompt = `
Crie um post viral:

Tema: ${data.topic}
Público: ${data.audience}

Gere:
- Gancho
- Roteiro
- CTA
- Formato
`;
  }

  if (type === "ads") {
    prompt = `
Crie um anúncio:

Produto: ${data.product}
Público: ${data.audience}

Gere:
- Headline
- Copy (AIDA)
- Gatilhos
- Criativo
`;
  }

  if (type === "seller") {
    prompt = `
Simule um vendedor:

Produto: ${data.product}
Preço: ${data.price}

- Faça perguntas
- Quebre objeções
- Feche a venda
`;
  }

  return aiClient.generate(prompt);
}