import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetBy() {
  const { mutate, data, isSuccess } = useMutation({
    mutationFn: async ({
      ing,
      tag,
    }: {
      tag: number | undefined;
      ing: number | undefined;
    }) => {
      let res;
      if (tag && !ing) {
        res = await axios.get(
          `http://localhost:5000/api/recipes/byTag/${tag}`,
          {
            withCredentials: true,
          }
        );
      }

      if (!tag && ing) {
        res = await axios.get(
          `http://localhost:5000/api/recipesByIngredient/${ing}`,
          {
            withCredentials: true,
          }
        );
      }

      if (tag && ing) {
        res = await axios.get(
          `http://localhost:5000/api/recipesByIngredientAndTag/`,
          {
            params: { id_skladnika: ing, id_tagu: tag },
            withCredentials: true,
          }
        );
      }

      if (!res) {
        throw new Error("Tag or ing expected");
      }

      return res.data.response;
    },
  });
  return { mutate, data, isSuccess };
}
