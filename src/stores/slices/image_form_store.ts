import { atomWithStorage } from "jotai/utils";
import { createJSONStorage } from "jotai/utils";
import { ImageFormType } from "@/components/forms/image/schema";
import { atom } from "jotai";

export const defaultState: ImageFormType = {
  imagePrompt: "",
  imageRatio: "1:1",
};

const STORAGE_KEY = "app.image.formState";

export const imageFormStore = atomWithStorage<ImageFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? sessionStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  { getOnInit: true }
);

export const updateImageFormAtom = atom(
  null,
  (get, set, update: Partial<ImageFormType>) => {
    set(imageFormStore, {
      ...get(imageFormStore),
      ...update,
    });
  }
);
