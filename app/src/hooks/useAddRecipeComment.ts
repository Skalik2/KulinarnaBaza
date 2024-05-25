import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useAddRecipeComment() {
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: async ({
      recipeID,
      commentBody,
    }: {
      recipeID: number;
      commentBody: string;
    }) => {
      const res = await axios.put(
        `http://localhost:5000/api/comment/addForRecipe`,
        {
          recipeID,
          commentBody,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Komentarz został dodany");
      queryClient.invalidateQueries({ queryKey: ["recipeComments"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { addComment };
}
