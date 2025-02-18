"use client";

import { Gltf } from "@react-three/drei";

interface GLBModelLoaderProps {
  modelUrl: string;
}

export function GLBModelLoader({ modelUrl }: GLBModelLoaderProps) {
  return <Gltf src={modelUrl} />;
}
