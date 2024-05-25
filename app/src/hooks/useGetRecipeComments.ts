import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRecipeComments(recipeID: number) {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.post(
        `http://localhost:5000/api/comment/getForRecipe`,
        { recipeID },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    queryKey: ["recipeComments", recipeID],
  });

  return { data, isLoading };
}
