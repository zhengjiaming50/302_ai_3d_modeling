/* eslint-disable camelcase */
import { apiKy } from "@/api";
import { SupportedFileTypes } from "@/stores/slices/model_viewer_store";
import { z } from "zod";

export const ModelConvertionResponseSchema = z.object({
  models_urls: z.array(z.string()),
  textures_urls: z.array(z.string()),
});
export type ModelConvertionResponse = z.infer<
  typeof ModelConvertionResponseSchema
>;

export async function convertModel({
  apiUrl,
  modelZipUrl,
  targetType,
}: {
  apiUrl: string;
  modelZipUrl: string;
  targetType: SupportedFileTypes;
}) {
  return await apiKy
    .post(apiUrl, {
      json: {
        trimesh_file_url: modelZipUrl,
        output_format: targetType,
      },
    })
    .json<ModelConvertionResponse>();
}
