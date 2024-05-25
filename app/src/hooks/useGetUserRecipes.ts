import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUserRecipes(userId?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["userRec"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/recipes/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.przepis;
    },
  });

  return { data, isLoading };
}
