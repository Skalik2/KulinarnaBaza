import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ingredientInterface, recipeIng } from "../../pages/AddNewRecipe";
import { useForceUpdate } from "../../hooks/useForceUpdate";

interface AddNewIngModalProps {
  onCloseModal: () => void;
  setRecipeIngredients: Dispatch<SetStateAction<recipeIng[]>>;
  ingredients: ingredientInterface[] | undefined;
  filter?: boolean;
}

export default function AddNewIngModal({
  onCloseModal,
  ingredients,
  setRecipeIngredients,
  filter,
}: AddNewIngModalProps) {
  const [selectedIng, setSelectedIng] = useState<ingredientInterface>();
  const { forceUpdate } = useForceUpdate();
  const [ingAmount, setIngAmount] = useState("");
  const [selectedIngInput, setSelectedIngInput] = useState("");
  const ingRef = useRef(ingredients);

  useEffect(
    function () {
      ingRef.current = ingredients?.filter((item) =>
        item.nazwa.toLowerCase().includes(selectedIngInput.toLowerCase())
      );
      forceUpdate();
    },
    [selectedIngInput, ingredients, forceUpdate]
  );

  function addIng() {
    if (filter) {
      setRecipeIngredients(
        selectedIng ? [{ ingredient: selectedIng, amount: "" }] : []
      );
    } else {
      setRecipeIngredients((ing) => [
        ...ing,
        { ingredient: selectedIng as ingredientInterface, amount: ingAmount },
      ]);
    }
    onCloseModal();
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      {filter ? (
        <p className="text-xl text-bgDark dark:text-bgWhite">
          Wybierz składnik który posiadasz:
        </p>
      ) : (
        <p className="text-xl text-bgDark dark:text-bgWhite">
          Wybierz składnik z listy oraz wprowadź jego ilość
        </p>
      )}
      <input
        id="ingredient"
        className="border-none focus:outline-none px-3 py-2 w-full bg-bgWhite dark:bg-bgDarkHover  dark:text-bgWhite text-bgDark"
        type="text"
        placeholder="Wyszukaj składnik"
        value={selectedIngInput}
        onChange={(e) => setSelectedIngInput(e.target.value)}
      />
      <div className="h-[1px] w-full bg-main"></div>
      <div className="flex flex-wrap justify-center items-center w-[445px] h-52 gap-2 overflow-y-auto my-4 py-2">
        {ingRef.current && !selectedIng ? (
          ingRef.current.map((item) => (
            <button
              key={item.id_skladnik}
              onClick={() => setSelectedIng(item)}
              className="rounded-full px-3 py-2  bg-bgWhiteHover dark:bg-bgDarkHover2 text-bgDark dark:text-bgWhite"
            >
              {item.nazwa}
            </button>
          ))
        ) : (
          <button
            onClick={() => setSelectedIng(undefined)}
            className="rounded-full px-3 py-2 bg-main text-bgWhite"
          >
            {selectedIng?.nazwa}
          </button>
        )}
      </div>
      {!filter && (
        <div className="w-full">
          <label className="dark:text-bgWhite">Wprowadź ilość:</label>
          <input
            id="amount"
            className="border-none focus:outline-none px-3 py-2 w-full bg-bgWhite dark:bg-bgDarkHover  dark:text-bgWhite text-bgDark"
            type="text"
            placeholder="Ilość"
            value={ingAmount}
            onChange={(e) => setIngAmount(e.target.value)}
          />
          <div className="h-[1px] w-full bg-main"></div>
        </div>
      )}
      {filter ? (
        <button
          type="button"
          onClick={addIng}
          className="w-[300px] bg-main hover:bg-mainHover py-2 text-white uppercase tracking-wide  rounded-full transition-all duration-300 mt-3"
          disabled={!selectedIng}
        >
          Zawiera {selectedIng ? `${selectedIng.nazwa}` : "składnik"}
        </button>
      ) : (
        <button
          type="button"
          onClick={addIng}
          className="w-[300px] bg-main hover:bg-mainHover py-2 text-white uppercase tracking-wide  rounded-full transition-all duration-300 mt-3"
          disabled={!selectedIng || !ingAmount}
        >
          Dodaj {selectedIng ? `${selectedIng.nazwa}` : "składnik"}
        </button>
      )}
    </div>
  );
}
