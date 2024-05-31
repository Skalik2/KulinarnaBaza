import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetBestRecipes() {
  const { data, isLoading } = useQuery({
    queryKey: ["bestRec"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/topRecipes`, {
        withCredentials: true,
      });
      return res.data.response;
    },
  });

  return { data, isLoading };
}
