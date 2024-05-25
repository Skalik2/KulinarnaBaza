import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useAddArticleComment() {
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: async ({
      articleID,
      commentBody,
    }: {
      articleID: number;
      commentBody: string;
    }) => {
      const res = await axios.put(
        `http://localhost:5000/api/comment/addForArticle`,
        {
          articleID,
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
      queryClient.invalidateQueries({ queryKey: ["articleComments"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { addComment };
}
