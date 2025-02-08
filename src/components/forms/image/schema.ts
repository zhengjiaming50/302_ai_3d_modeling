import { z } from "zod";

export const imageFormSchema = z
  .object({
    imagePrompt: z.string(),
    imageRatio: z.enum(["1:1", "4:3", "3:4", "16:9", "9:16"]),
  })

  .superRefine((data, ctx) => {
    if (!data.imagePrompt || !data.imagePrompt.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image prompt is required",
        path: ["imagePrompt"],
      });
    }
  });

export type ImageFormType = z.infer<typeof imageFormSchema>;
