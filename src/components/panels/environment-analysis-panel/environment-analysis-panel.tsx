"use client";

import { EnvironmentModelGenerator } from "./environment-model-generator";
import { EnvironmentModelPreview } from "./environment-model-preview";

export function EnvironmentAnalysisPanel() {
  return (
    <div className="flex flex-col gap-y-6">
      <EnvironmentModelPreview />
      <EnvironmentModelGenerator />
    </div>
  );
}
