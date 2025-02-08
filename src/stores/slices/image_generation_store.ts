import { atomWithStorage } from "jotai/utils";
import { createJSONStorage } from "jotai/utils";
import { atom } from "jotai";

const STORAGE_KEY = "app.image.generationState";

export type ImageGenerationType = {
  imageSrc: string;
  imagePrompt: string;
  createAt: number;
};

export const defaultState: ImageGenerationType[] = [];

export const imageGenerationStore = atomWithStorage<ImageGenerationType[]>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  { getOnInit: true }
);

export const addImageGenerationRecord = atom(
  null,
  (get, set, record: ImageGenerationType) => {
    set(imageGenerationStore, [record, ...get(imageGenerationStore)]);
  }
);

export const getImageGenerationRecords = atom((get) =>
  get(imageGenerationStore)
);

export const deleteImageGenerationRecord = atom(
  null,
  (get, set, createAt: number) => {
    set(
      imageGenerationStore,
      get(imageGenerationStore).filter((record) => record.createAt !== createAt)
    );
  }
);
