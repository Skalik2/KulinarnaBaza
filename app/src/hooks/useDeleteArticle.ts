import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  const { mutate: removeArticle } = useMutation({
    mutationFn: async ({ articleId }: { articleId: string }) => {
      const res = await axios.delete(
        `http://localhost:5000/api/articles/${articleId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["userArt"] });
      toast.success("Artykuł został usunięty :(");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak");
    },
  });

  return { removeArticle };
}
