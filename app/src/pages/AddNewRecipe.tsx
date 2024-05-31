import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import axios from "axios";
import Modal from "../ui/Modal";
import AddNewIngModal from "../ui/recipes/AddNewIngModal";
import AddNewTagModal from "../ui/recipes/AddNewTagModal";
import { useSendRecipe } from "../hooks/useSendRecipe";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import { useModifyRecipe } from "../hooks/useModifyRecipe";

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
    setValue,
    getValues,
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

  const { modifyRecipe } = useModifyRecipe();

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

  const { id } = useParams();
  const { data, isLoading } = useGetRecipe(id);
  console.log(data);

  useEffect(
    function () {
      if (id && !isLoading) {
        setValue("title", data.przepis[0].tytul);
        setValue("time", data.przepis[0].czas_przygotowania);
        setValue("price", data.przepis[0].cena);
        setValue("description", data.przepis[0].opis);

        setRecipeIngredients(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.skladniki.map((item: any) => {
            return {
              ingredient: { id_skladnik: item.id_skladnik, nazwa: item.nazwa },
              amount: item.ilosc,
            };
          })
        );
        setRecipeTags(data.tagi);
      }
    },
    [
      id,
      isLoading,
      data?.przepis,
      setValue,
      data?.skladniki,
      data?.tagi,
      data?.zdjecie,
      data?.id_przepisu,
    ]
  );

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
      zdjecie: base64Image,
    };
    console.log(recipeObj);

    if (id) {
      modifyRecipe({
        obj: recipeObj,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recipeId: id,
      });
    } else {
      sendRecipe({
        obj: recipeObj,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (user as any).id_uzytkownika,
      });
    }
  };

  return (
    <div className="py-16 md:pt-[72px] flex justify-center items-center flex-col gap-4 dark:bg-bgDark mt-10">
      <p className="text-center text-lg dark:text-bgWhite">
        {id ? "Zmodyfikuj swój przepis" : "Dodaj swój nowy przepis"}
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
              initial={id ? true : false}
            />
            <FormInput
              id="time"
              type="number"
              label="Czas przygotowania (min)"
              error={errors?.time?.message}
              register={register}
              validateFunction={() => {
                if (getValues().time < 1) {
                  return "Wartość nie może być mniejsza niż 1";
                } else {
                  return true;
                }
              }}
              initial={id ? true : false}
            />
            <FormInput
              id="price"
              type="number"
              label="Szacowana cena dania (zł)"
              error={errors?.price?.message}
              register={register}
              initial={id ? true : false}
              validateFunction={() => {
                if (getValues().price < 1) {
                  return "Wartość nie może być mniejsza niż 1";
                } else {
                  return true;
                }
              }}
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
                  <button
                    type="button"
                    onClick={() => {
                      console.log(item);
                      setRecipeIngredients((prevIngredients) =>
                        prevIngredients.filter(
                          (prevItem) =>
                            prevItem.ingredient.id_skladnik !==
                            item.ingredient.id_skladnik
                        )
                      );
                    }}
                    className="flex gap-5 justify-start items-center my-2 py-2"
                    key={i}
                  >
                    <div className="w-2 h-2 rounded-full bg-main"></div>
                    <p className="text-bgDark dark:text-bgWhite">
                      {item.ingredient?.nazwa} - {item?.amount}
                    </p>
                  </button>
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
                {recipeTags.map((item, i) => (
                  <button
                    type="button"
                    onClick={() => {
                      setRecipeTags((prevTags) =>
                        prevTags.filter(
                          (prevItem) => prevItem.id_tagu !== item.id_tagu
                        )
                      );
                    }}
                    key={i}
                    className="px-3 py-2 rounded-lg bg-bgWhiteHover dark:bg-bgDarkHover text-bgDark dark:text-bgWhite "
                  >
                    <p>{item.nazwa}</p>
                  </button>
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
                {id || selectedImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
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
              {id || selectedImage ? (
                <img
                  src={
                    !selectedImage
                      ? `http://localhost:5000/api/recipes/image/${id}`
                      : selectedImage
                  }
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
            {id ? "Zmodyfikuj przepis" : "Dodaj przepis"}
          </button>
        </div>
      </form>
    </div>
  );
}
