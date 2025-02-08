"use client";

import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface STLModelLoaderProps {
  modelUrl: string;
}

export function STLModelLoader({ modelUrl }: STLModelLoaderProps) {
  const geometry = useLoader(STLLoader, modelUrl);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial roughness={0.5} metalness={0.5} />
    </mesh>
  );
}
