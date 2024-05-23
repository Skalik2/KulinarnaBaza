import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { tagInterface } from "../../pages/AddNewRecipe";
import { useForceUpdate } from "../../hooks/useForceUpdate";

interface AddNewtagModalProps {
  onCloseModal: () => void;
  setRecipeTags: Dispatch<SetStateAction<tagInterface[]>>;
  tags: tagInterface[] | undefined;
  filter?: boolean;
}

export default function AddNewTagModal({
  onCloseModal,
  tags,
  setRecipeTags,
  filter,
}: AddNewtagModalProps) {
  const [selectedTag, setSelectedTag] = useState<tagInterface>();
  const { forceUpdate } = useForceUpdate();
  const [selectedTagInput, setSelectedTagInput] = useState("");
  const tagRef = useRef(tags);

  useEffect(
    function () {
      tagRef.current = tags?.filter((item) =>
        item.nazwa.toLowerCase().includes(selectedTagInput.toLowerCase())
      );
      forceUpdate();
    },
    [selectedTagInput, tags, forceUpdate]
  );

  function addIng() {
    if (filter) {
      setRecipeTags(selectedTag ? [selectedTag] : []);
    } else {
      setRecipeTags((tag) => [...tag, selectedTag as tagInterface]);
    }
    onCloseModal();
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <p className="text-xl text-bgDark dark:text-bgWhite">
        Wybierz tag z listy
      </p>
      <input
        id="ingredient"
        className="border-none focus:outline-none px-3 py-2 w-full bg-bgWhite dark:bg-bgDarkHover  dark:text-bgWhite text-bgDark"
        type="text"
        placeholder="Wyszukaj tag"
        value={selectedTagInput}
        onChange={(e) => setSelectedTagInput(e.target.value)}
      />
      <div className="h-[1px] w-full bg-main"></div>
      <div className="flex flex-wrap justify-center items-center h-52 w-[445px] gap-2 overflow-y-auto my-4 py-2">
        {tagRef.current && !selectedTag ? (
          tagRef.current.map((item) => (
            <button
              key={item.id_tagu}
              onClick={() => setSelectedTag(item)}
              className="rounded-lg px-3 py-2  bg-bgWhiteHover dark:bg-bgDarkHover2 text-bgDark dark:text-bgWhite"
            >
              {item.nazwa}
            </button>
          ))
        ) : (
          <button
            onClick={() => setSelectedTag(undefined)}
            className="rounded-lg px-3 py-2 bg-main text-bgWhite"
          >
            {selectedTag?.nazwa}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={addIng}
        className="w-[300px] bg-main hover:bg-mainHover py-2 text-white uppercase tracking-wide  rounded-full transition-all duration-300 mt-3"
        disabled={!selectedTag}
      >
        Wybierz {selectedTag ? `${selectedTag.nazwa}` : "tag"}
      </button>
    </div>
  );
}
