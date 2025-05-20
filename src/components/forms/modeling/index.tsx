import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Loader2 } from "lucide-react";
import { ModelGenerationRecord } from "@/components/dialogs/model-record-dialog/model-generation-record";
import { Button } from "@/components/ui/button";
import { useModelingForm } from "@/hooks/forms/use-modeling-form";
import { createScopedLogger } from "@/utils/logger";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";
import { GLOBAL } from "@/constants";
import { ModelConverter } from "@/components/panels/model-generation-panel/model-converter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const logger = createScopedLogger("ModelingForm");

export function ModelingForm() {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const {
    watch,
    register,
    setValue,
    errors,
    setError,

    handleGenerateTrellisModel,
    handleGenerateHyper3DModel,
    handleGenerateTripo3DModel,
    handleGenerateStableFast3DModel,
    handleGenerateStablePoint3DModel,

    isGenerating,
  } = useModelingForm();

  // 模型类型：AI或传统
  const [modelType, setModelType] = useState<"ai" | "traditional">("ai");

  // AI模型内的具体模型选择
  const [aiModel, setAiModel] = useState<string>("Trellis");

  // 当模型类型变化时更新modelingModel字段
  useEffect(() => {
    if (modelType === "traditional") {
      setValue("modelingModel", "OpenCV");
    }
  }, [modelType, setValue]);

  const showExtraSettings = watch("modelingModel") === "Hyper3D";
  const isSketch = watch("modelingTier") === "Sketch";
  const isOpenCV = watch("modelingModel") === "OpenCV";

  const handleSubmit = async (event: FormEvent) => {
    logger.info("handleSubmit");

    event.preventDefault();

    switch (watch("modelingModel")) {
      case "Trellis":
        await handleGenerateTrellisModel();
        break;
      case "Tripo3D":
        await handleGenerateTripo3DModel();
        break;
      case "Hyper3D":
        await handleGenerateHyper3DModel();
        break;
      case "StableFast3D":
        await handleGenerateStableFast3DModel();
        break;
      case "StablePoint3D":
        await handleGenerateStablePoint3DModel();
        break;
      case "OpenCV":
        await handleGenerateStableFast3DModel();
        break;
      default:
        setError("modelingModel", {
          message: t("errors.modelingModel"),
        });

        break;
    }
  };

  useEffect(() => {
    if (!showExtraSettings) {
      setValue("modelingFormat", "glb");
    }
  }, [setValue, showExtraSettings]);

  useEffect(() => {
    if (isSketch) {
      setValue("modelingFormat", "glb");
      setValue("useHyper", false);
      setValue("modelingQuality", "medium");
    }
  }, [setValue, isSketch]);

  return (
    <form className="flex flex-col gap-y-6">
      {/* 模型选择区域 */}
      <div className="mb-4">
        <h3 className="mb-3 font-medium">{t("label")}</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* AI建模选项 */}
          <div
            className={cn(
              "cursor-pointer rounded-lg border p-4 transition-all",
              modelType === "ai"
                ? "bg-muted/20 ring-2 ring-primary"
                : "hover:bg-muted/10"
            )}
            onClick={() => {
              if (modelType !== "ai") {
                setModelType("ai");
                setValue("modelingModel", aiModel);
              }
            }}
          >
            <div className="mb-3 flex items-start">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border",
                    modelType === "ai"
                      ? "border-primary bg-primary"
                      : "border-input"
                  )}
                />
                <span className="text-lg font-semibold">AI建模</span>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              使用最先进的AI技术，从图像生成高质量3D模型，支持多种高级模型和参数。
            </p>

            {modelType === "ai" && (
              <div className="border-t pt-2">
                <FormGenerator
                  id="ai-model-selection"
                  name="modelingModel"
                  inputType="select"
                  label="选择AI模型"
                  defaultValue={aiModel}
                  options={GLOBAL.MODELING_MODEL_OPTIONS.filter(
                    (model) => model !== "OpenCV"
                  ).map((model) => ({
                    value: model,
                    label: model,
                    id: model,
                  }))}
                  watch={watch}
                  register={register}
                  setValue={(name, value) => {
                    setAiModel(value);
                    setValue(name, value);
                  }}
                  errors={errors}
                />
              </div>
            )}
          </div>

          {/* OpenCV建模选项 */}
          <div
            className={cn(
              "cursor-pointer rounded-lg border p-4 transition-all",
              modelType === "traditional"
                ? "bg-muted/20 ring-2 ring-primary"
                : "hover:bg-muted/10"
            )}
            onClick={() => {
              if (modelType !== "traditional") {
                setModelType("traditional");
                setValue("modelingModel", "OpenCV");
              }
            }}
          >
            <div className="mb-3 flex items-start">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border",
                    modelType === "traditional"
                      ? "border-primary bg-primary"
                      : "border-input"
                  )}
                />
                <span className="text-lg font-semibold">OpenCV</span>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              基于传统计算机视觉算法的3D建模技术，适用于精确几何重建和工业场景。
            </p>

            {modelType === "traditional" && (
              <div className="border-t pt-2">
                <FormGenerator
                  id="opencv-resolution"
                  name="modelingQuality"
                  inputType="select"
                  label="输出分辨率"
                  defaultValue="medium"
                  options={[
                    { value: "low", label: "低分辨率", id: "low" },
                    { value: "medium", label: "中分辨率", id: "medium" },
                    { value: "high", label: "高分辨率", id: "high" },
                  ]}
                  watch={watch}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 原有的FormGenerator */}
      {false && (
        <FormGenerator
          id="modeling-model"
          name="modelingModel"
          inputType="select"
          label={t("label")}
          defaultValue="Trellis"
          options={GLOBAL.MODELING_MODEL_OPTIONS.map((model) => ({
            value: model,
            label: model,
            id: model,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      )}

      {/* 只在AI模型且选择了Hyper3D时显示的额外设置 */}
      {modelType === "ai" && showExtraSettings && (
        <div className="flex flex-col gap-y-6">
          <FormGenerator
            id="modeling-format"
            name="modelingFormat"
            inputType="select"
            label={t("extra_settings.format.label")}
            defaultValue="glb"
            options={GLOBAL.MODELING_FORMAT_OPTIONS.map((format) => ({
              value: format,
              label: format,
              id: format,
            }))}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            disabled={isSketch}
          />

          <FormGenerator
            id="modeling-quality"
            name="modelingQuality"
            inputType="select"
            label={t("extra_settings.quality.label")}
            defaultValue="medium"
            options={GLOBAL.MODELING_QUALITY_OPTIONS.map((quality) => ({
              value: quality,
              label: t(`extra_settings.quality.options.${quality}`),
              id: quality,
            }))}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            disabled={isSketch}
          />

          <FormGenerator
            id="use-hyper"
            name="useHyper"
            inputType="switch"
            label={t("extra_settings.use_hyper.label")}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            disabled={isSketch}
          />

          <FormGenerator
            id="modeling-tier"
            name="modelingTier"
            inputType="select"
            label={t("extra_settings.tier.label")}
            defaultValue="Regular"
            options={GLOBAL.MODELING_TIER_OPTIONS.map((tier) => ({
              value: tier,
              label: t(`extra_settings.tier.options.${tier}`),
              id: tier,
            }))}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </div>
      )}

      <div className="flex flex-row justify-between gap-x-2">
        <ModelConverter />

        <div className="flex flex-row gap-x-2">
          <ModelGenerationRecord />
          <Button
            variant="default"
            type="submit"
            className="flex flex-row justify-end gap-x-2"
            onClick={handleSubmit}
            disabled={isGenerating || !watch("imageSrc")}
          >
            <LoaderRenderer
              status={isGenerating ? "generating" : "idle"}
              statuses={{
                idle: { icon: null, text: t("generate_button.idle") },
                generating: {
                  icon: <Loader2 className="h-4 w-4 animate-spin" />,
                  text: t("generate_button.generating"),
                },
              }}
            />
          </Button>
        </div>
      </div>
    </form>
  );
}
