import { createProductFlow } from "@/flows/create-product";
import { createPostFlow } from "@/flows/create-post";
import { createAdsFlow } from "@/flows/create-ads";
import { aiSellerFlow } from "@/flows/ai-seller";

export const flows = {
  "create-product": createProductFlow,
  "create-post": createPostFlow,
  "create-ads": createAdsFlow,
  "ai-seller": aiSellerFlow,
};