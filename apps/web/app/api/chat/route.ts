import { productFlow } from "@/features/flow/flow.repository";
import { getNextStep, isLastStep } from "@/features/flow/flow.engine";
import { generateProduct } from "@/features/product/product.generator";
import { supabase } from "@/lib/supabase";
import { handleChat } from "@/features/chat/chat.service";

export async function POST(req: Request) {
  const { flowId, stepIndex, answers } = await req.json();

  const result = await handleChat(flowId, stepIndex, answers);

  return Response.json(result);

  // Se terminou o fluxo → gerar produto
  if (isLastStep(productFlow, stepIndex)) {
  const formattedAnswers = {
    niche: answers[0],
    target: answers[1],
    pain: answers[2],
  };

  const result = await generateProduct(formattedAnswers);
  const { data: userData } = await supabase.auth.getUser();

  // salvar no banco
  await supabase.from("generations").insert({
    user_id: userData.user?.id,
    type: "product",
    input: formattedAnswers,
    output: result,
  });

  return Response.json({
    type: "result",
    data: result,
  });
}

  // Senão → próxima pergunta
  const nextStep = getNextStep(productFlow, stepIndex);

  return Response.json({
    type: "question",
    data: nextStep,
  });
}