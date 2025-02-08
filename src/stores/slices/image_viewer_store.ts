import { atom } from "jotai";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

const STORAGE_KEY = "app.image.viewer.state";

interface ImageViewerStore {
  key: number;
  uploadedImageUrl: string;
  generatedImageUrl: string;
}

const defaultState: ImageViewerStore = {
  key: 0,
  uploadedImageUrl: "",
  generatedImageUrl: "",
};

export const imageViewerStore = atomWithStorage<ImageViewerStore>(
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

export const updateImageViewerStore = atom(
  null,
  (_get, set, update: Partial<ImageViewerStore>) => {
    set(imageViewerStore, (prev) => ({ ...prev, ...update }));
  }
);

export const resetImageViewerStore = atom(null, (get, set) => {
  set(imageViewerStore, defaultState);
});
