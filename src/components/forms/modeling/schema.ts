import { z } from "zod";

export const modelingFormSchema = z.object({
  imageSrc: z.string(),
  imageId: z.string().optional(),
  modelingModel: z.enum([
    "Trellis",
    "Tripo3D",
    "Hyper3D",
    "StableFast3D",
    "StablePoint3D",
    "OpenCV",
  ]),
  modelingFormat: z.enum(["glb", "obj", "stl"]),
  modelingQuality: z.enum(["low", "medium", "high", "extra-low"]),
  useHyper: z.boolean(),
  modelingTier: z.enum(["Sketch", "Regular"]),
});

export type ModelingFormType = z.infer<typeof modelingFormSchema>;
