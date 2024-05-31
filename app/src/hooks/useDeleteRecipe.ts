import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { mutate: removeRecipe } = useMutation({
    mutationFn: async ({ recipeId }: { recipeId: string }) => {
      const res = await axios.delete(
        `http://localhost:5000/api/recipes/${recipeId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["userRec"] });
      toast.success("Przepis został usunięty :(");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak");
    },
  });

  return { removeRecipe };
}
