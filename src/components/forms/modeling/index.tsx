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

    isGenerating,
  } = useModelingForm();

  const showExtraSettings = watch("modelingModel") === "Hyper3D";
  const isSketch = watch("modelingTier") === "Sketch";

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

      {showExtraSettings && (
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

      <div className="flex flex-row justify-end gap-x-2">
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
    </form>
  );
}
