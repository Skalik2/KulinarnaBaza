import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRecipe(id: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  return { data, isLoading };
}
