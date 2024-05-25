import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { useSendArticle } from "../hooks/useSendArticle";

export default function AddNewArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const [selectedImage, setSelectedImage] = useState("");
  const [base64Image, setBase64Image] = useState("");

  const { sendArticle } = useSendArticle();

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const articleObj = {
      tytul: data.title,
      opis: data.description,
      zdjecie: base64Image,
    };
    sendArticle({
      obj: articleObj,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (user as any).id_uzytkownika,
    });
  };

  return (
    <div>
      <div className="py-16 md:pt-[72px] flex justify-center items-center flex-col gap-4 dark:bg-bgDark mt-10">
        <p className="text-center text-lg dark:text-bgWhite">
          Dodaj nowy artykuł
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
                label="Tytuł artykułu"
                error={errors?.title?.message}
                register={register}
              />
            </div>
            <div className="relative w-full">
              <label className="text-sm ml-4 dark:text-bgWhite text-bgDark ">
                Treść
              </label>
              <textarea
                id="description"
                className="border-none focus:outline-none px-3 py-2 w-full h-[500px]  bg-bgWhite dark:bg-bgDark  dark:text-bgWhite text-bgDark"
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
            </div>{" "}
            <div className="w-full mt-10">
              <p className="text-left dark:text-bgWhite">
                Dodaj zdjęcie opisujące ten artykuł:
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
              disabled={!base64Image}
            >
              Opublikuj artykuł
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
