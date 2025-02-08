"use client";

import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface OBJModelLoaderProps {
  modelUrl: string;
  textures: string[];
}

export function OBJModelLoader({ modelUrl, textures }: OBJModelLoaderProps) {
  const obj = useLoader(OBJLoader, modelUrl);
  const texture = useTexture(textures[0]);

  obj.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({
        map: texture,
        roughness: 0.5,
        metalness: 0.5,
      });
    }
  });

  return <primitive object={obj.clone()} />;
}
