import { useMutation } from "@tanstack/react-query";
import { sendRecipe as sendRecipeApi } from "../services/apiRecipes";

export function useSendRecipe() {
  const { mutate: sendRecipe, isSuccess } = useMutation({
    mutationFn: sendRecipeApi,
    onSuccess: () => {},
    onError: () => {},
  });

  return { sendRecipe, isSuccess };
}
