import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import axios from "axios";
import Modal from "../ui/Modal";
import AddNewIngModal from "../ui/recipes/AddNewIngModal";
import AddNewTagModal from "../ui/recipes/AddNewTagModal";
import { useSendRecipe } from "../hooks/useSendRecipe";
import { useQueryClient } from "@tanstack/react-query";

export interface ingredientInterface {
  id_skladnik: number;
  nazwa: string;
}

export interface recipeIng {
  ingredient: ingredientInterface;
  amount: string;
}

export interface tagInterface {
  id_tagu: number;
  nazwa: string;
}

export default function AddNewRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const [ingredients, setIngredients] = useState<ingredientInterface[]>();
  const [recipeIngredients, setRecipeIngredients] = useState<recipeIng[]>([]);

  const { sendRecipe } = useSendRecipe();

  const [tags, setTags] = useState<tagInterface[]>();
  const [recipeTags, setRecipeTags] = useState<tagInterface[]>([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [base64Image, setBase64Image] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string)
          ?.replace("data:", "")
          .replace(/^.+,/, "");
        setBase64Image(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(function () {
    axios.get("http://localhost:5000/api/ingredients").then((res) => {
      setIngredients(res.data.response);
    });

    axios.get("http://localhost:5000/api/tags").then((res) => {
      setTags(res.data.response);
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const recipeObj = {
      tytul: data.title,
      opis: data.description,
      czas_przygotowania: data.time,
      cena: data.price,
      skladniki: recipeIngredients.map((item) => {
        return {
          id_skladnika: item.ingredient.id_skladnik,
          ilosc: item.amount,
        };
      }),
      tagi: recipeTags.map((item) => {
        return { id_tagu: item.id_tagu };
      }),
      zdjecie:  base64Image,
    };
    console.log(recipeObj);
    sendRecipe({
      obj: recipeObj,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (user as any).id_uzytkownika,
    });
  };

  return (
    <div className="py-16 md:pt-[72px] flex justify-center items-center flex-col gap-4 dark:bg-bgDark mt-10">
      <p className="text-center text-lg dark:text-bgWhite">
        Dodaj swój nowy przepis
      </p>
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
            <label className="text-sm ml-4 dark:text-bgWhite text-bgDark ">
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
            <p className="text-left dark:text-bgWhite">
              Składniki w przepisie:
            </p>
            <div className="py-7">
              {recipeIngredients.length > 0 ? (
                recipeIngredients.map((item, i) => (
                  <div
                    className="flex gap-5 justify-start items-center my-2 py-2"
                    key={i}
                  >
                    <div className="w-2 h-2 rounded-full bg-main"></div>
                    <p className="text-bgDark dark:text-bgWhite">
                      {item.ingredient.nazwa} - {item.amount}
                    </p>
                  </div>
                ))
              ) : (
                <div className="w-full py-10 flex justify-center items-center">
                  <p className="text-bgDark dark:text-bgWhite">
                    Dodaj składniki przepisu
                  </p>
                </div>
              )}
            </div>
            <Modal>
              <Modal.Open opens="addIng">
                <button
                  className="w-[300px] border-main border-solid border-2 py-2 text-main uppercase tracking-wide  rounded-full transition-all duration-300 hover:bg-main hover:text-bgWhite"
                  type="button"
                >
                  Dodaj kolejny składnik
                </button>
              </Modal.Open>
              <Modal.Window name="addIng">
                <AddNewIngModal
                  onCloseModal={undefined as never}
                  ingredients={ingredients}
                  setRecipeIngredients={setRecipeIngredients}
                />
              </Modal.Window>
            </Modal>
          </div>

          <div className="w-full mt-10">
            <p className="text-left dark:text-bgWhite">
              Dodaj tagi opisujące ten przepis:
            </p>

            {recipeTags.length > 0 ? (
              <div className="flex flex-wrap justify-center items-center gap-5 py-8">
                {recipeTags.map((item) => (
                  <div className="px-3 py-2 rounded-lg bg-bgWhiteHover dark:bg-bgDarkHover text-bgDark dark:text-bgWhite ">
                    <p>{item.nazwa}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-10 flex justify-center items-center text-bgDark dark:text-bgWhite">
                <p className="">Dodaj tagi przepisu</p>
              </div>
            )}
            <Modal>
              <Modal.Open opens="addTag">
                <button
                  className="w-[250px] border-main border-solid border-2 py-2 text-main uppercase tracking-wide  rounded-full transition-all duration-300 hover:bg-main hover:text-bgWhite"
                  type="button"
                >
                  Dodaj kolejny tag
                </button>
              </Modal.Open>
              <Modal.Window name="addTag">
                <AddNewTagModal
                  onCloseModal={undefined as never}
                  tags={tags}
                  setRecipeTags={setRecipeTags}
                />
              </Modal.Window>
            </Modal>
          </div>

          <div className="w-full mt-10">
            <p className="text-left dark:text-bgWhite">
              Dodaj zdjęcie przedstawiające to smakowite danie:
            </p>
            <label className="block text-center w-[250px] border-main border-solid border-2 py-2 text-main uppercase tracking-wide  rounded-full transition-all duration-300 hover:bg-main hover:text-bgWhite cursor-pointer my-10">
              <span className="">
                {selectedImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
              </span>
              <input
                type="file"
                className="hidden"
                name="myImage"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
            <div className="w-full">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Twoje wybrane zdjęcie, jeśli nie działa to zepsułem coś :("
                />
              ) : (
                <div className="bg-gray-400 w-full h-96"></div>
              )}
            </div>
          </div>
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
