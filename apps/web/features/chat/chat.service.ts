import { flows } from "@/features/flow/flow.registry";
import { getNextStep, isLastStep } from "@/features/flow/flow.engine";
import { generateAI } from "@/features/ai/ai.service";

export async function handleChat(flowId: string, stepIndex: number, answers: any) {
  const flow = (flows as Record<string, any>)[flowId];

  if (!flow) throw new Error("Flow não encontrado");

  if (isLastStep(flow, stepIndex)) {
    const formatted: any = {};

    flow.steps.forEach((step: { field: string | number; }, i: string | number) => {
      formatted[step.field] = answers[i];
    });

    const result = await generateAI(flow.type, formatted);

    return { type: "result", data: result };
  }

  const next = getNextStep(flow, stepIndex);

  return { type: "question", data: next };
}