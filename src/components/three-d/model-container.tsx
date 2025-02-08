"use client";

import { SupportedFileTypes } from "@/stores/slices/model_viewer_store";
import { GLBModelLoader } from "./glb-model-loader";
import { OBJModelLoader } from "./obj-model-loader";
import { STLModelLoader } from "./stl-model-loader";

interface ModelContainerProps {
  modelUrl: string;
  fileType: SupportedFileTypes;
  textures: string[];
}

export function ModelContainer({
  modelUrl,
  fileType,
  textures,
}: ModelContainerProps) {
  return (
    <>
      {fileType === "glb" && <GLBModelLoader modelUrl={modelUrl} />}
      {fileType === "obj" && (
        <OBJModelLoader modelUrl={modelUrl} textures={textures} />
      )}
      {fileType === "stl" && <STLModelLoader modelUrl={modelUrl} />}
    </>
  );
}
