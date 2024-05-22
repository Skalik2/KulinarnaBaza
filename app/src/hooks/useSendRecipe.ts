import { useMutation, MutationFunction } from "@tanstack/react-query";
import { sendRecipe as sendRecipeApi } from "../services/apiRecipes";

export function useSendRecipe() {
    const { mutate: sendRecipe, isSuccess } = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: sendRecipeApi as MutationFunction<unknown, { obj: any; userId: string; }>,
        onSuccess: () => {},
        onError: () => {},
    });

    return { sendRecipe, isSuccess };
}
