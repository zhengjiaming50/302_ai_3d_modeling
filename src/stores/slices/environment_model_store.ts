import { atom } from "jotai";

interface EnvironmentModelState {
  environmentModelUrl: string | null;
}

export const environmentModelStore = atom<EnvironmentModelState>({
  environmentModelUrl: null,
});
