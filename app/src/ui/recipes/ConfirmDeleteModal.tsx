import React from "react";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";

export default function ConfirmDeleteModal({
  id,
  onCloseModal,
  title,
  art,
}: {
  id: string;
  onCloseModal: () => void;
  title: string;
  art?: boolean;
}) {
  const { removeRecipe } = useDeleteRecipe();
  const { removeArticle } = useDeleteArticle();
  function handleConfirm() {
    if (art) {
      removeArticle({ articleId: id });
    } else {
      removeRecipe({ recipeId: id });
    }
  }

  return (
    <div className="flex justify-center items-end flex-col gap-3">
      <p className="text-bgDark dark:text-bgWhite">
        {art
          ? "Czy na pewno chcesz usunąć ten artykuł?"
          : "Czy na pewno chcesz usunąć ten przepis?"}
        <span className="text-main py-3 block">{title}</span>
      </p>
      <div className="flex justify-center items-center gap-5">
        <button
          className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
          onClick={onCloseModal}
        >
          Zrezygnuj
        </button>
        <button
          className="pl-3 pr-5 py-2 hover:text-mainHover dark:hover:text-mainHover dark:text-bgWhite text-bgDark tracking-wider font-medium transition-colors duration-300 text-[15px]"
          onClick={handleConfirm}
        >
          Potwierdź
        </button>
      </div>
    </div>
  );
}
