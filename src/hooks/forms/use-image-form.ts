import {
  imageFormSchema,
  ImageFormType,
} from "@/components/forms/image/schema";
import { getFluxImage, getPromptByLLM } from "@/services/image";
import { languageAtom, store } from "@/stores";
import { defaultState, imageFormStore } from "@/stores/slices/image_form_store";
import { addImageGenerationRecord } from "@/stores/slices/image_generation_store";
import { updateImageViewerStore } from "@/stores/slices/image_viewer_store";
import { createScopedLogger } from "@/utils/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const logger = createScopedLogger("useImageForm");

export function useImageForm() {
  const t = useTranslations("home.panel.image_setting_panel.image_generator");

  const uiLanguage = store.get(languageAtom);

  const [storedForm, setStoredForm] = useAtom(imageFormStore);
  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const _addImageGenerationRecord = useSetAtom(addImageGenerationRecord);

  const [isGenerating, setIsGenerating] = useState(false);

  const {
    watch,
    getValues,
    register,
    setValue: setValueForm,
    setError,
    trigger,
    formState: { errors },
  } = useForm<ImageFormType>({
    values: storedForm,
    resolver: zodResolver(imageFormSchema, {
      errorMap: (error, ctx) => {
        logger.debug("Zod error:", error, ctx);

        return { message: error.message || "Validation error" };
      },
    }),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: defaultState,
  });

  const setValue = useCallback(
    (name: keyof ImageFormType, value: any) => {
      logger.debug(name, value);
      setValueForm(name, value);
      setStoredForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setValueForm, setStoredForm]
  );

  const handleGenerate = useCallback(async () => {
    const formData = getValues();
    logger.debug("Current form data:", formData);

    const validationResult = imageFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));

      logger.debug(
        "Formatted validation errors:",
        JSON.stringify(formattedErrors, null, 2)
      );

      // Set errors
      formattedErrors.forEach((error) => {
        const field = error.path[error.path.length - 1];
        if (typeof field === "string") {
          setError(field as keyof ImageFormType, {
            type: "custom",
            message: t(`errors.${error.path[0]}`),
          });
        }
      });

      // Focus on first error
      if (formattedErrors.length > 0) {
        const firstError = formattedErrors[0];
        const firstErrorField = firstError.path[firstError.path.length - 1];
        if (typeof firstErrorField === "string") {
          const errorElement = document.querySelector(
            `[name="${firstErrorField}"]`
          );
          logger.debug("First error field:", firstErrorField);
          if (errorElement instanceof HTMLElement) {
            errorElement.focus();
          }
        }
      }

      return;
    }

    setIsGenerating(true);

    const getImage = async () =>
      getFluxImage(
        uiLanguage === "en"
          ? formData.imagePrompt
          : (await getPromptByLLM({ prompt: formData.imagePrompt })).output,
        formData.imageRatio
      );

    toast.promise(getImage(), {
      loading: t("toast.generating"),
      success: (response) => {
        const imageSrc = response.images[0].url;
        const createAt = new Date().getTime();
        updateImageViewer({
          key: createAt,
          generatedImageUrl: imageSrc,
        });
        _addImageGenerationRecord({
          imageSrc,
          imagePrompt: formData.imagePrompt,
          createAt,
        });

        setIsGenerating(false);
        logger.debug("Flux image:", imageSrc);
        return t("toast.success");
      },
      error: () => {
        setIsGenerating(false);
        return t("toast.failed");
      },
    });
  }, [
    getValues,
    t,
    setError,
    uiLanguage,
    _addImageGenerationRecord,
    updateImageViewer,
  ]);

  return {
    watch,
    register,
    setValue,
    setError,
    trigger,
    errors,
    handleGenerate,
    isGenerating,
  };
}
