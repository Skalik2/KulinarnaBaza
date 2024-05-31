import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { modifyArticle as modifyArticleApi } from "../services/apiRecipes";

export function useModifyArticle() {
  const queryClient = useQueryClient();
  const { mutate: modifyArticle, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: modifyArticleApi as MutationFunction<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { obj: any; articleId: string }
    >,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      window.location.href = "/articles";
      toast.success("Artykuł został zmodyfkowany");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { modifyArticle, isSuccess };
}
