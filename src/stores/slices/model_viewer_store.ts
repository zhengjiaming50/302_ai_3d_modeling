import { atom } from "jotai";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

const STORAGE_KEY = "app.model.viewer.state";

export type SupportedFileTypes = "glb" | "obj" | "stl";
export type SupportedModelingModel = "Trellis" | "Tripo3D" | "Hyper3D";

interface ModelViewerStore {
  key: number;
  modelUrl: string;
  modelingModel: SupportedModelingModel;
  textures: string[];
  fileType: SupportedFileTypes;
}

const defaultState: ModelViewerStore = {
  key: 0,
  modelUrl: "",
  modelingModel: "Trellis",
  textures: [],
  fileType: "glb",
};

export const modelViewerStore = atomWithStorage<ModelViewerStore>(
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

export const updateModelViewerStore = atom(
  null,
  (_get, set, update: ModelViewerStore) => {
    set(modelViewerStore, update);
  }
);

export const resetModelViewerStore = atom(null, (get, set) => {
  set(modelViewerStore, defaultState);
});
