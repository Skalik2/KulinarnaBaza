import { useMutation, MutationFunction } from "@tanstack/react-query";
import { sendRecipe as sendRecipeApi } from "../services/apiRecipes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSendRecipe() {
  const navigate = useNavigate();
  const { mutate: sendRecipe, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: sendRecipeApi as MutationFunction<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { obj: any; userId: string }
    >,
    onSuccess: () => {
      navigate("/recipes");
      toast.success("Przepis został dodany");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { sendRecipe, isSuccess };
}
