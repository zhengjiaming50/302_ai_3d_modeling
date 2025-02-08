import { ModelingFormType } from "@/components/forms/modeling/schema";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "app.modeling.generationState";

export type ModelingGenerationType = {
  taskId: string;
  modelUrl: string;
  textures: string[];
  createAt: number;
  modelingForm: ModelingFormType;
};

export const defaultState: ModelingGenerationType[] = [];

export const modelingGenerationStore = atomWithStorage<
  ModelingGenerationType[]
>(
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

export const addModelingGenerationRecord = atom(
  null,
  (get, set, record: ModelingGenerationType) => {
    set(modelingGenerationStore, [record, ...get(modelingGenerationStore)]);
  }
);

export const getModelingGenerationRecords = atom((get) =>
  get(modelingGenerationStore)
);

export const deleteModelingGenerationRecord = atom(
  null,
  (get, set, createAt: number) => {
    set(
      modelingGenerationStore,
      get(modelingGenerationStore).filter(
        (record) => record.createAt !== createAt
      )
    );
  }
);
