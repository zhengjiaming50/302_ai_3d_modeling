/* eslint-disable camelcase */
import { z } from "zod";
import { apiKy } from "@/api";

export const ModelingResponseSchema = z.object({
  model_mesh: z.object({
    url: z.string(),
    content_type: z.string(),
    file_size: z.number(),
  }),
  timings: z.object({
    prepare: z.number(),
    generation: z.number(),
    export: z.number(),
  }),
});

export type ModelingResponse = z.infer<typeof ModelingResponseSchema>;

const GET_TRELLIS_MODELING_API_URL = "302/submit/trellis";

export async function getTrellisModeling(imageUrl: string) {
  return await apiKy
    .post(GET_TRELLIS_MODELING_API_URL, {
      json: {
        image_url: imageUrl,
        ss_guidance_strength: 7.5,
        ss_sampling_steps: 12,
        slat_guidance_strength: 3,
        slat_sampling_steps: 12,
        mesh_simplify: 0.95,
        texture_size: 1024,
      },
    })
    .json<ModelingResponse>()
    .then((res) => res.model_mesh.url);
}

export const Hyper3DResponseSchema = z.object({
  logs: z.null(),
  metrics: z.object({}),
  queue_position: z.number(),
  request_id: z.string(),
  status: z.string(),
});

export type Hyper3DResponse = z.infer<typeof Hyper3DResponseSchema>;

const GET_HYPER3D_MODELING_TASK_API_URL = "302/submit/hyper3d-rodin";

export async function getHyper3DModelingTask({
  imageUrl,
  format,
  quality,
  useHyper,
  tier,
}: {
  imageUrl: string;
  format: string;
  quality: string;
  useHyper: boolean;
  tier: string;
}) {
  return await apiKy
    .post(GET_HYPER3D_MODELING_TASK_API_URL, {
      json: {
        prompt: "",
        input_image_urls: [imageUrl],
        condition_mode: "concat",
        geometry_file_format: format,
        material: "PBR",
        quality,
        tier,
        use_hyper: useHyper,
        TAPose: false,
        seed: 0,
      },
    })
    .json<Hyper3DResponse>();
}

export const Hyper3DModelingResponseSchema = z.object({
  model_mesh: z.object({
    url: z.string(),
    content_type: z.string(),
    file_size: z.number(),
  }),
  seed: z.number(),
  textures: z.array(
    z.object({
      url: z.string(),
      content_type: z.string(),
      file_size: z.number(),
      width: z.number(),
      height: z.number(),
    })
  ),
});

export type Hyper3DModelingResponse = z.infer<
  typeof Hyper3DModelingResponseSchema
>;

export async function getHyper3DModeling({
  apiUrl,
  taskId,
}: {
  apiUrl: string;
  taskId: string;
}) {
  return await apiKy
    .get(apiUrl + `?request_id=${taskId}`)
    .json<Hyper3DModelingResponse>();
}

export const Tripo3DResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    task_id: z.string(),
  }),
});

export type Tripo3DResponse = z.infer<typeof Tripo3DResponseSchema>;

const GET_TRIPO3D_MODELING_TASK_API_URL = "tripo3d/v2/openapi/task";

export async function getTripo3DModelingTask(imageUrl: string) {
  const imageType = imageUrl.split(".").pop() as string;

  return await apiKy
    .post(GET_TRIPO3D_MODELING_TASK_API_URL, {
      json: {
        type: "image_to_model",
        file: {
          type: ["png", "jpeg"].includes(imageType) ? imageType : "png",
          url: imageUrl,
        },
        model_version: "v2.0-20240919",
      },
    })
    .json<Tripo3DResponse>();
}

export const Tripo3DModelingResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    task_id: z.string(),
    type: z.string(),
    status: z.string(),
    input: z.object({
      prompt: z.string(),
      model_version: z.string(),
      texture: z.boolean(),
      pbr: z.boolean(),
      texture_alignment: z.string(),
      spec: z.null(),
    }),
    progress: z.number(),
    create_time: z.number(),
    prompt: z.string(),
    thumbnail: z.string(),
    queuing_num: z.number(),
    running_left_time: z.number(),
    result: z.object({
      pbr_model: z.object({
        type: z.string(),
        url: z.string(),
      }),
      rendered_image: z.object({
        type: z.string(),
        url: z.string(),
      }),
    }),
  }),
});

export type Tripo3DModelingResponse = z.infer<
  typeof Tripo3DModelingResponseSchema
>;

export async function getTripo3DModeling({
  apiUrl,
  taskId,
}: {
  apiUrl: string;
  taskId: string;
}) {
  return await apiKy.get(apiUrl + `/${taskId}`).json<Tripo3DModelingResponse>();
}

const GET_STABLE_FAST_3D_API_URL = "sd/v2beta/3d/stable-fast-3d";

export async function getStableFast3DModeling(imageFile: File) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("texture_resolution", "1024");
  formData.append("foreground_ratio", "0.85");

  const response = await apiKy
    .post(GET_STABLE_FAST_3D_API_URL, {
      body: formData,
      headers: {
        "Content-Type": undefined,
      },
    })
    .blob();

  return response;
}

const GET_STABLE_POINT_3D_API_URL = "sd/v2beta/3d/stable-point-aware-3d";

export async function getStablePoint3DModeling(imageFile: File) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("texture_resolution", "1024");
  formData.append("foreground_ratio", "1.3");
  formData.append("target_count", "1000");
  formData.append("guidance_scale", "3");
  formData.append("seed", "0");

  return await apiKy
    .post(GET_STABLE_POINT_3D_API_URL, {
      body: formData,
      headers: {
        "Content-Type": undefined,
      },
    })
    .blob();
}
