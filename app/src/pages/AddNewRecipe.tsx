import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import axios from "axios";

export default function AddNewRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [ingredients, setIngredients] = useState([{}]);
  const [recipeIngredients, setRecipeIngredients] = useState([{}]);
  const [selectedIngredient, setSelectedIngredient] = useState(
    ingredients[0] || {}
  );

  useEffect(function () {
    axios.get("http://localhost:5000/api/ingredients").then((res) => {
      setIngredients(res.data.response);
    });

    console.log(ingredients);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="py-16 md:pt-[72px] flex justify-center items-center flex-col gap-4 dark:bg-bgDark mt-10">
      <p className="text-center text-lg">Dodaj swój nowy przepis</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md400:gap-6 xs:w-full xs:px-10 pt-10 h-full max-w-[800px]"
      >
        <div className="flex justify-start items-center flex-col w-full gap-4">
          <div className="flex justify-center items-center flex-col gap-6 w-full">
            <FormInput
              id="title"
              type="text"
              label="Tytuł przepisu"
              error={errors?.title?.message}
              register={register}
            />
            <FormInput
              id="time"
              type="text"
              label="Czas przygotowania"
              error={errors?.time?.message}
              register={register}
            />
            <FormInput
              id="price"
              type="text"
              label="Szacowana cena dania"
              error={errors?.price?.message}
              register={register}
            />
          </div>
          <div className="relative w-full">
            <label className="text-sm ml-4 dark:text-bgWhite text-bgDark">
              Opis przepisu
            </label>
            <textarea
              id="description"
              className="border-none focus:outline-none px-3 py-2 w-full h-[300px]  bg-bgWhite dark:bg-bgDark  dark:text-bgWhite text-bgDark"
              {...register("description", {
                required: "Wypełnij to pole",
              })}
            />
            <div className="absolute h-[1px] w-full bg-main"></div>
            {errors?.description?.message && (
              <p className="text-[10px] mt-1 text-main">
                {errors?.description?.message.toString()}
              </p>
            )}
          </div>
          <div className="w-full mt-10">
            <p className="text-left">Dodaj składniki:</p>
            {recipeIngredients.length !== 0 &&
              recipeIngredients.map((item) => <div>{item.nazwa}</div>)}
            <select onChange={(e) => setSelectedIngredient(e.target.value)}>
              {ingredients.map((item) => (
                <option value={item.id_skladnik}>{item.nazwa}</option>
              ))}
            </select>
            <label>Wprowadź ilość:</label>
            <input />
            <button
              type="button"
              onClick={() =>
                setRecipeIngredients((ingredients) => [
                  ...ingredients,
                  selectedIngredient,
                ])
              }
            >
              Dodaj składnik
            </button>
          </div>
          <p>Jeszcze tagi i zdjecie!!!</p>
          <button
            type="submit"
            className="w-[300px] bg-main hover:bg-mainHover py-2 text-white uppercase tracking-wide  rounded-full transition-all duration-300"
          >
            Dodaj przepis
          </button>
        </div>
      </form>
    </div>
  );
}
