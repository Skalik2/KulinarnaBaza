import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetArticleComments(articleID: number) {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.post(
        `http://localhost:5000/api/comment/getForArticle`,
        { articleID },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    queryKey: ["articleComments", articleID],
  });

  return { data, isLoading };
}
