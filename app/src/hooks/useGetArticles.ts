import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetArticles() {
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/articles", {
        withCredentials: true,
      });
      return res.data.response;
    },
  });

  return { data, isLoading };
}
