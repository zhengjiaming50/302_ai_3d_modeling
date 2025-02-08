import { ModelingFormType } from "@/components/forms/modeling/schema";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const defaultState: ModelingFormType = {
  imageSrc: "",
  modelingModel: "Trellis",
  modelingFormat: "glb",
  modelingQuality: "medium",
  useHyper: false,
  modelingTier: "Regular",
};

const STORAGE_KEY = "app.modeling.formState";

export const modelingFormStore = atomWithStorage<ModelingFormType>(
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

export const updateModelingFormAtom = atom(
  null,
  (get, set, update: Partial<ModelingFormType>) => {
    set(modelingFormStore, {
      ...get(modelingFormStore),
      ...update,
    });
  }
);
