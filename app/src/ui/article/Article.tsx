import { FaRegUser, FaRegCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../../hooks/useDarkMode";
import { useState } from "react";
import Modal from "../Modal";
import { Button, Menu, MenuItem } from "@mui/material";
import ConfirmDeleteModal from "../recipes/ConfirmDeleteModal";

interface ArticleProps {
  imageSrc: string;
  title: string;
  author: string;
  date: string;
  link: string;
  toModify?: boolean;
  id?: string;
}

const Article = ({
  imageSrc,
  title,
  author,
  date,
  link,
  toModify,
  id,
}: ArticleProps) => {
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
            <div className=" w-full h-80 sm:h-[450px] md:h-[550px] md900:w-[800px] md900:h-[600px] flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group shadow-lg">
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
              <div className="p-3 sm:px-10 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
                <div className="flex justify-center sm:justify-between items-center w-full">
                  <div className=" flex items-center justify-start w-full gap-3">
                    <span className="text-3xl">
                      <FaRegUser className="" />
                    </span>
                    <div className="text-[15px] text-left">
                      <p>
                        Autor: <span className="font-semibold">{author}</span>
                      </p>
                      <p>Opublikowano: {date}</p>
                    </div>
                  </div>
                  <span className="text-3xl">
                    <FaRegCommentDots />
                  </span>
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
              Przejdź do artykułu
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/articles/edit/${id}`);
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
                Usuń artykuł
              </MenuItem>
            </Modal.Open>
          </Menu>
          <Modal.Window name="delete">
            <ConfirmDeleteModal
              id={id ? id : ""}
              title={title}
              onCloseModal={undefined as never}
              art={true}
            />
          </Modal.Window>
        </Modal>
      </div>
    );
  } else {
    return (
      <Link
        to={link}
        className=" w-full h-80 sm:h-[450px] md:h-[550px] md900:w-[800px] md900:h-[600px] flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group shadow-lg"
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
        <div className="p-3 sm:px-10 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
          <div className="flex justify-center sm:justify-between items-center w-full">
            <div className=" flex items-center justify-start w-full gap-3">
              <span className="text-3xl">
                <FaRegUser className="" />
              </span>
              <div className="text-[15px]">
                <p>
                  Autor: <span className="font-semibold">{author}</span>
                </p>
                <p>Opublikowano: {date}</p>
              </div>
            </div>
            <span className="text-3xl">
              <FaRegCommentDots />
            </span>
          </div>
        </div>
      </Link>
    );
  }
};

export default Article;
