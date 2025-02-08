import { ModelingFormType } from "@/components/forms/modeling/schema";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "app.current.modelingState";

export enum CurrentModelingStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export type CurrentModelingType = {
  taskId: string;
  modelingSettings: ModelingFormType;
  attempt: number;
  status: CurrentModelingStatus;
};

export const defaultState: CurrentModelingType = {
  taskId: "",
  modelingSettings: {
    imageSrc: "",
    modelingModel: "Trellis",
    modelingFormat: "glb",
    modelingQuality: "medium",
    useHyper: false,
    modelingTier: "Regular",
  },
  attempt: 0,
  status: CurrentModelingStatus.PENDING,
};

export const currentModelingStore = atomWithStorage<CurrentModelingType>(
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

export const updateCurrentModelingStore = atom(
  null,
  (_get, set, record: CurrentModelingType) => {
    set(currentModelingStore, record);
  }
);

export const resetCurrentModelingStore = atom(null, (_get, set) => {
  set(currentModelingStore, defaultState);
});
