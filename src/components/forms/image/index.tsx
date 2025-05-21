"use client";

import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { ImageGenerationRecord } from "@/components/dialogs/image-record-dialog/image-generation-record";
import { Button } from "@/components/ui/button";
import { GLOBAL } from "@/constants/values";
import { useImageForm } from "@/hooks/forms/use-image-form";
import { createScopedLogger } from "@/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent } from "react";

const logger = createScopedLogger("ImageForm");

interface ImageFormProps {
  onGenerated?: (imageUrl: string) => void;
}

export function ImageForm({ onGenerated }: ImageFormProps) {
  const t = useTranslations("home.panel.image_setting_panel.image_generator");

  const { 
    watch, 
    register, 
    setValue, 
    errors, 
    handleGenerate: _handleGenerate, 
    isGenerating 
  } = useImageForm({
    onSuccess: onGenerated
  });

  const handleSubmit = async (event: FormEvent) => {
    logger.info("handleSubmit");

    event.preventDefault();
    await _handleGenerate();
  };

  return (
    <form className="flex flex-col gap-y-6">
      <FormGenerator
        id="image-prompt"
        name="imagePrompt"
        inputType="textarea"
        label={t("label")}
        placeholder={t("placeholder")}
        textareaConfig={{
          wrapperClassName: "h-[200px]",
        }}
        watch={watch}
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex flex-row justify-between gap-x-2">
        <FormGenerator
          id="image-ratio"
          name="imageRatio"
          inputType="select"
          defaultValue="1:1"
          options={GLOBAL.IMAGE_RATIO_OPTIONS.map((option) => ({
            label: option,
            value: option,
            id: option,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <div className="flex flex-row gap-x-2">
          <ImageGenerationRecord />
          <Button
            variant="default"
            type="submit"
            className="flex flex-row justify-end gap-x-2"
            onClick={handleSubmit}
            disabled={isGenerating}
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
