import { Link, useNavigate } from "react-router-dom";
import { CiStopwatch } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import useDarkMode from "../../hooks/useDarkMode";
import Modal from "../Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface RecipeComponent {
  imageSrc: string;
  title: string;
  link: string;
  time: number;
  price: number;
  views: number;
  toModify?: boolean;
  id?: string;
}

const RecipeCard = ({
  imageSrc,
  title,
  link,
  time,
  views,
  toModify,
  id,
}: RecipeComponent) => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (toModify) {
    return (
      <div>
        <Modal>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disableRipple
            sx={{
              background: "none",
              "&:hover": {
                background: "none",
              },
              padding: 0,
              minWidth: 0,
              border: "none",
              textTransform: "none",
              fontFamily: "inherit",
              fontSize: "inherit",
              color: "inherit",
            }}
          >
            <div className=" w-96 h-80 flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group">
              <div className="relative w-full h-full overflow-hidden">
                <div
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                ></div>
                <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className=" text-xl font-medium drop-shadow-lg break-words text-center py-5 px-3 ">
                {title}
              </h3>
              <div className="h-[1px] w-full bg-slate-200 dark:bg-stone-800"></div>
              <div className="p-3 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
                <div>
                  <p className="flex justify-center items-center gap-2">
                    <span className="text-3xl">
                      <CiStopwatch />
                    </span>
                    {time} min.
                  </p>
                </div>
                <div>
                  <p className="flex justify-center items-center gap-3">
                    <span className="text-2xl">
                      <SlEye />
                    </span>
                    {views}
                  </p>
                </div>
              </div>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              sx: {
                backgroundColor: isDarkMode ? "#1f1b1a" : "#fcfcfc",
                zIndex: 0,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(link);
              }}
              sx={{
                backgroundColor: isDarkMode ? "#1f1b1a" : "#fcfcfc",
                color: !isDarkMode ? "#1f1b1a" : "#fcfcfc",
                fontWeight: 500,
                letterSpacing: "0.025em",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#ff3000",
                  background: "none",
                },
              }}
            >
              Przejdź do przepisu
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/recipes/edit/${id}`);
              }}
              sx={{
                backgroundColor: isDarkMode ? "#1f1b1a" : "#fcfcfc",
                color: !isDarkMode ? "#1f1b1a" : "#fcfcfc",
                fontWeight: 500,
                letterSpacing: "0.025em",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#ff3000",
                  background: "none",
                },
              }}
            >
              Edytuj
            </MenuItem>
            <Modal.Open opens="delete" additionalFn={handleClose}>
              <MenuItem
                sx={{
                  backgroundColor: isDarkMode ? "#1f1b1a" : "#fcfcfc",
                  color: "red",
                  fontWeight: 500,
                  letterSpacing: "0.025em",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#fb8c23",
                    background: "none",
                  },
                }}
              >
                Usuń przepis
              </MenuItem>
            </Modal.Open>
          </Menu>
          <Modal.Window name="delete">
            <ConfirmDeleteModal
              id={id ? id : ""}
              title={title}
              onCloseModal={undefined as never}
            />
          </Modal.Window>
        </Modal>
      </div>
    );
  } else {
    return (
      <Link
        to={link}
        className=" w-96 h-80 flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group"
      >
        <div className="relative w-full h-full overflow-hidden">
          <div
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-full group-hover:scale-110 transition-transform duration-300"
          ></div>
          <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        <h3 className=" text-xl font-medium drop-shadow-lg break-words text-center py-5 px-3 ">
          {title}
        </h3>
        <div className="h-[1px] w-full bg-slate-200 dark:bg-stone-800"></div>
        <div className="p-3 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
          <div>
            <p className="flex justify-center items-center gap-2">
              <span className="text-3xl">
                <CiStopwatch />
              </span>
              {time} min.
            </p>
          </div>
          <div>
            <p className="flex justify-center items-center gap-3">
              <span className="text-2xl">
                <SlEye />
              </span>
              {views}
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

export default RecipeCard;
