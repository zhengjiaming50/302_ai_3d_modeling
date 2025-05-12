import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Loader2 } from "lucide-react";
import { ModelGenerationRecord } from "@/components/dialogs/model-record-dialog/model-generation-record";
import { Button } from "@/components/ui/button";
import { useModelingForm } from "@/hooks/forms/use-modeling-form";
import { createScopedLogger } from "@/utils/logger";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect } from "react";
import { GLOBAL } from "@/constants";
import { ModelConverter } from "@/components/panels/model-generation-panel/model-converter";

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

  const modelingModel = watch("modelingModel");
  const showExtraSettings = modelingModel === "Hyper3D";
  const isSketch = watch("modelingTier") === "Sketch";

  // 确保首次渲染时有默认选中项
  useEffect(() => {
    if (!modelingModel) {
      setValue("modelingModel", "Trellis");
    }
  }, [modelingModel, setValue]);

  const handleSubmit = async (event: FormEvent) => {
    logger.info("handleSubmit");

    event.preventDefault();

    switch (modelingModel) {
      case "Trellis":
        await handleGenerateTrellisModel();
        break;
      case "OpenCV":
        await handleGenerateStablePoint3DModel();
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

  // 将选项分组展示
  const modelOptions = [
    {
      group: t("model_groups.main_options"),
      options: ["Trellis", "OpenCV"],
    },
    {
      group: t("model_groups.advanced_options"),
      options: ["Tripo3D", "Hyper3D", "StableFast3D", "StablePoint3D"],
    },
  ];

  return (
    <form className="flex flex-col gap-y-6">
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium">{t("label")}</h3>

        {modelOptions.map((group, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            <div className="mb-2 text-xs font-medium text-primary">
              {group.group}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {group.options.map((model) => (
                <label
                  key={model}
                  className={`flex cursor-pointer items-start gap-2 rounded-md border p-3 transition-colors hover:bg-accent ${
                    modelingModel === model ? "border-primary bg-accent/50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={model}
                    checked={modelingModel === model}
                    {...register("modelingModel")}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-medium">{model}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {t(`model_descriptions.${model}`)}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        {errors.modelingModel && (
          <p className="mt-1 text-xs text-destructive">
            {errors.modelingModel.message}
          </p>
        )}
      </div>

      {showExtraSettings && (
        <div className="flex flex-col gap-y-6 border-t pt-4">
          <div className="mb-2 text-sm font-medium">
            {t("model_groups.advanced_settings")}
          </div>
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

      <div className="mt-2 flex flex-row justify-between gap-x-2">
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
