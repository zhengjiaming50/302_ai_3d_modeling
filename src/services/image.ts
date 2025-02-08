/* eslint-disable camelcase */
import { z } from "zod";
import { apiKy } from "@/api";

export const FluxImageResponseSchema = z.object({
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
      content_type: z.string(),
    })
  ),
  timings: z.object({
    inference: z.number(),
  }),
  seed: z.number(),
  has_nsfw_concepts: z.array(z.boolean()),
  prompt: z.string(),
});

export type FluxImageResponse = z.infer<typeof FluxImageResponseSchema>;
export type FluxImageRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

const GET_IMAGE_API_URL = "302/submit/flux-lora";

export async function getFluxImage(prompt: string, ratio: FluxImageRatio) {
  const getImageSize = () => {
    switch (ratio) {
      case "1:1":
        return { width: 768, height: 768 };
      case "4:3":
        return { width: 768, height: 1024 };
      case "3:4":
        return { width: 1024, height: 768 };
      case "16:9":
        return { width: 1024, height: 768 };
      case "9:16":
        return { width: 768, height: 1024 };
      default:
        return { width: 768, height: 768 };
    }
  };

  return await apiKy
    .post(GET_IMAGE_API_URL, {
      json: {
        prompt: `Isometric 3D, ${prompt}`,
        image_size: getImageSize(),
        num_inference_steps: 28,
        output_format: "png",
        guidance_scale: 3.5,
        loras: [
          {
            path: "https://huggingface.co/strangerzonehf/Flux-Isometric-3D-LoRA/blob/main/Isometric-3D.safetensors",
            scale: 1,
          },
        ],
      },
    })
    .json<FluxImageResponse>();
}

export const PromptResponseSchema = z.object({
  output: z.string(),
});

export type PromptResponse = z.infer<typeof PromptResponseSchema>;

const GET_PROMPT_API_URL = "v1/chat/completions";

export async function getPromptByLLM(params: {
  prompt: string;
}): Promise<PromptResponse> {
  return await apiKy
    .post(GET_PROMPT_API_URL, {
      json: {
        model: "Doubao-pro-32k",
        message: `You are a translation expert, and your task is to translate the provided text content into English for optimizing and enhancing the prompts provided for image generation to ensure that the Flux model can generate excellent views.
Input content:<text>
${params.prompt}
</text>
Requirement: Always return English results in plain text format and do not add any other content.`,
      },
    })
    .json<PromptResponse>();
}
