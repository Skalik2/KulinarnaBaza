import {
  useMutation,
  MutationFunction,
  useQueryClient,
} from "@tanstack/react-query";
import { sendArticle as sendArticleApi } from "../services/apiRecipes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSendArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: sendArticle, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: sendArticleApi as MutationFunction<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { obj: any; userId: string }
    >,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/articles");
      toast.success("Artykuł został dodany");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { sendArticle, isSuccess };
}
