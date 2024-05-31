import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputBoxProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  type?: "text" | "email" | "number" | "password";
  validateFunction?: () => boolean | string;
  id: string;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
  isTextArea?: boolean;
  initial?: boolean;
}

export default function FormInput({
  type = "text",
  id,
  label,
  error,
  validateFunction,
  register,
  isTextArea = false,
  initial,
}: InputBoxProps) {
  const [inputValue, setInputValue] = useState<string | number>("");
  const [focus, setFocus] = useState(initial ? initial : false);

  function changeValue(val: string | number) {
    setInputValue(val);
  }

  useEffect(
    function () {
      if (inputValue) {
        setFocus(true);
      }
    },
    [inputValue, focus]
  );

  return (
    <div className="relative h-[50px] w-full">
      <motion.label
        htmlFor={id}
        className={`absolute top-1/2 left-3 text-gray cursor-text transition-colors duration-300 dark:text-bgWhite text-bgDark ${
          focus ? "text-main1" : ""
        } `}
        animate={
          focus
            ? { translateX: "-15px", translateY: "-170%", scale: 0.8 }
            : { translateX: "0px", translateY: "-50%", scale: 1 }
        }
        initial={{ translateX: "0px", translateY: "-50%", scale: 1 }}
        transition={{ ease: "linear", duration: 0.15 }}
      >
        {label}
      </motion.label>
      {isTextArea ? (
        <textarea
          id={id}
          className="border-none focus:outline-none px-3 py-2 w-full h-[300px]  bg-bgWhite dark:bg-bgDark  dark:text-bgWhite text-bgDark"
          {...register(id, {
            required: "Wypełnij to pole",
            validate: validateFunction,
            onChange: (e) => changeValue(e.target.value),
            onBlur: () => setFocus(false),
          })}
          onFocus={() => setFocus(true)}
        />
      ) : (
        <input
          id={id}
          className="border-none focus:outline-none px-3 py-2 w-full bg-bgWhite dark:bg-bgDark  dark:text-bgWhite text-bgDark"
          type={type}
          {...register(id, {
            required: "Wypełnij to pole",
            validate: validateFunction,
            onChange: (e) => changeValue(e.target.value),
            onBlur: () => setFocus(false),
          })}
          onFocus={() => setFocus(true)}
        />
      )}
      <div className="absolute h-[1px] w-full bg-main"></div>
      {error && (
        <p className="text-[10px] mt-1 text-main">{error.toString()}</p>
      )}
    </div>
  );
}
