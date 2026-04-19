import { Flow } from "./flow.types";

export function getNextStep(flow: Flow, currentIndex: number) {
  return flow.steps[currentIndex + 1] || null;
}

export function isLastStep(flow: Flow, index: number) {
  return index === flow.steps.length - 1;
}