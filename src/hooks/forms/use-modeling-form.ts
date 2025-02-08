import {
  modelingFormSchema,
  ModelingFormType,
} from "@/components/forms/modeling/schema";
import { defaultState } from "@/stores/slices/modeling_form_store";
import { modelingFormStore } from "@/stores/slices/modeling_form_store";
import { createScopedLogger } from "@/utils/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useHyper3DPolling } from "@/hooks/api/use-hyper3d-polling";
import { useTripo3DPolling } from "@/hooks/api/use-tripo3d-polling";
import { useTrellisAsync } from "@/hooks/api/use-trellis-async";

export const logger = createScopedLogger("useModelingForm");

export function useModelingForm() {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const [storedForm, setStoredForm] = useAtom(modelingFormStore);

  const {
    watch,
    getValues,
    register,
    setValue: setValueForm,
    setError,
    trigger,
    formState: { errors },
  } = useForm<ModelingFormType>({
    values: storedForm,
    resolver: zodResolver(modelingFormSchema, {
      errorMap: (error, ctx) => {
        logger.debug("Zod error:", error, ctx);

        return { message: error.message || "Validation error" };
      },
    }),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: defaultState,
  });

  const validateForm = useCallback(
    (formData: ModelingFormType) => {
      const validationRes = modelingFormSchema.safeParse(formData);
      if (!validationRes.success) {
        const formattedErrors = validationRes.error.issues.map((issue) => ({
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
            setError(field as keyof ModelingFormType, {
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
    },
    [setError, t]
  );
  const setValue = useCallback(
    (name: keyof ModelingFormType, value: any) => {
      logger.debug(name, value);
      setValueForm(name, value);
      setStoredForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setValueForm, setStoredForm]
  );

  const { isGenerating: isTrellisGenerating, handleGenerateTrellisModel } =
    useTrellisAsync({ getValues, validateForm });
  const { isPolling: isHyper3DGenerating, handleGenerateHyper3DModel } =
    useHyper3DPolling({ getValues, validateForm });
  const { isPolling: isTripo3DGenerating, handleGenerateTripo3DModel } =
    useTripo3DPolling({ getValues, validateForm });
  const isGenerating =
    isHyper3DGenerating || isTripo3DGenerating || isTrellisGenerating;

  return {
    watch,
    register,
    setValue,
    setError,
    trigger,
    errors,

    handleGenerateTrellisModel,
    handleGenerateHyper3DModel,
    handleGenerateTripo3DModel,

    isGenerating,
  };
}
