"use client";

import { ModelGenerator } from "./model-generator";
import { ModelPreview } from "./model-preview";

export function ModelGenerationPanel() {
  return (
    <div className="flex flex-col gap-y-6">
      <ModelPreview />
      <ModelGenerator />
    </div>
  );
}
