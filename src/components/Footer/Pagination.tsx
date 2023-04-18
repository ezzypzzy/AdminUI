// This component renders the pagination buttons in Footer section

import React, { useEffect, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import "tailwindcss/tailwind.css";

interface IProps {
  width: string;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (e: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination: React.FC<IProps> = ({
  width,
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  nextPage,
  previousPage,
}) => {
  const [viewportWidth, setViewportWidth] = useState("lg");

  // This function provides our buttons knowledge of viewport
  // to switch between either 5 or 3 buttons when required
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth < 500 ? "sm" : "lg");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let numPageBtns = 5;
  if (viewportWidth === "sm" || viewportWidth === "md") {
    numPageBtns = 3;
  }

  // Calculate the start and end pages based on the current page
  let startPage = Math.max(currentPage - Math.floor(numPageBtns / 2), 1);
  let endPage = startPage + numPageBtns - 1;
  if (endPage > Math.ceil(totalItems / itemsPerPage)) {
    endPage = Math.ceil(totalItems / itemsPerPage);
    startPage = Math.max(endPage - numPageBtns + 1, 1);
  }

  // Create an array of page button with value starting from startPage to endPage
  const pageBtns = [];
  for (let i = startPage; i <= endPage; i++) {
    pageBtns.push(i);
  }

  return (
    <div
      className={`fixed bottom-0 w-full 
    h-[50px] bg-[white] flex justify-center items-center sm:justify-end sm:pl-[25%] ${styles.app_footer}`}
    >
      {/* This button is used to jump to first page if current page is greater than 1 else disabled */}
      <FaAngleDoubleLeft
        className={`
        w-8 h-8 border border-[#1890ff] flex justify-center 
        items-center rounded rounded-[50%] mx-4 p-1.5 text-xl font-bold
        hover:bg-opacity-90 mx-2.5 md:mx-1.5 sm:md:mx-0.5
        ${currentPage === 1 && "bg-[white]"}
        ${currentPage === 1 && "border-[silver]"}
        ${currentPage === 1 && "text-[silver]"}
        ${currentPage != 1 && "bg-[#1890ff]"}
        ${currentPage != 1 && "text-[white]"}
        ${currentPage != 1 && "cursor-pointer"}
        ${currentPage === 1 && "cursor-default"}
        `}
        onClick={() => {
          currentPage > 1 && paginate(1);
        }}
      ></FaAngleDoubleLeft>

      {/* This button is used to jump to previous page if current page is greater than 1 else disabled */}
      <FaAngleLeft
        className={`
        w-8 h-8 border border-[#1890ff] flex justify-center
        items-center rounded rounded-[50%] mx-4 p-1.5 text-xl font-bold
        hover:bg-opacity-90 mx-2.5 md:mx-1.5 sm:md:mx-0.5
        ${currentPage === 1 && "bg-[white]"}
        ${currentPage === 1 && "border-[silver]"}
        ${currentPage === 1 && "text-[silver]"}
        ${currentPage !== 1 && "bg-[#1890ff]"}
        ${currentPage != 1 && "text-[white]"}
        ${currentPage != 1 && "cursor-pointer"}
        ${currentPage === 1 && "cursor-default"}
        `}
        onClick={() => {
          currentPage > 1 && previousPage();
        }}
      ></FaAngleLeft>

      {/* Generating the 5/3 buttons with onClick functionality */}
      {pageBtns.map((e: any) => (
        <div
          key={e}
          className={`
          w-8 h-8 border flex justify-center
          items-center rounded rounded-[50%] mx-4 cursor-pointer
          hover:bg-opacity-90 mx-2.5 md:mx-1.5 sm:md:mx-0.5 
          ${Math.ceil(totalItems / itemsPerPage) < e && "bg-[lightgray]"}
          ${Math.ceil(totalItems / itemsPerPage) < e && "border-[lightgray]"}
          ${Math.ceil(totalItems / itemsPerPage) < e && "text-[gray]"}
          ${
            Math.ceil(totalItems / itemsPerPage) >= e &&
            currentPage !== e &&
            "bg-[#1890ff]"
          }
          ${
            Math.ceil(totalItems / itemsPerPage) >= e &&
            currentPage !== e &&
            "border-[#1890ff]"
          }
          ${
            Math.ceil(totalItems / itemsPerPage) >= e &&
            currentPage !== e &&
            "text-[white]"
          }
          ${currentPage == e && "bg-[white]" && "text-[#1890ff]"}
          `}
          onClick={() => {
            Math.ceil(totalItems / itemsPerPage) >= e && paginate(e);
          }}
        >
          {e}
        </div>
      ))}

      {/* This button will take to the next page if current page is not the last page else disabled */}
      <FaAngleRight
        className={`
        w-8 h-8 border border-[#1890ff] flex justify-center
        items-center rounded rounded-[50%] mx-4 p-1.5 text-xl font-bold
        hover:bg-opacity-90 mx-2.5 md:mx-1.5 sm:md:mx-0.5
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) &&
          "cursor-default"
        }
        ${currentPage >= Math.ceil(totalItems / itemsPerPage) && "bg-[white]"}
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) &&
          "border-[silver]"
        }
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) && "text-[silver]"
        }
        ${currentPage < Math.ceil(totalItems / itemsPerPage) && "bg-[#1890ff]"}
        ${currentPage < Math.ceil(totalItems / itemsPerPage) && "text-[white]"}
        ${
          currentPage < Math.ceil(totalItems / itemsPerPage) && "cursor-pointer"
        }
        `}
        onClick={() => {
          currentPage < Math.ceil(totalItems / itemsPerPage) && nextPage();
        }}
      ></FaAngleRight>

      {/* This button will take to the last page if current page is not the last page else gray background,
      with cursor not allowed */}
      <FaAngleDoubleRight
        className={`w-8 h-8 border border-[#1890ff] flex justify-center
        items-center rounded rounded-[50%] mx-4 p-1.5 text-xl font-bold
        hover:bg-opacity-90 mx-2.5 md:mx-1.5 sm:md:mx-0.5 sm:md:mr-1
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) &&
          "cursor-default"
        }
        ${currentPage >= Math.ceil(totalItems / itemsPerPage) && "bg-[white]"}
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) &&
          "border-[silver]"
        }
        ${
          currentPage >= Math.ceil(totalItems / itemsPerPage) && "text-[silver]"
        }
        ${currentPage < Math.ceil(totalItems / itemsPerPage) && "bg-[#1890ff]"}
        ${currentPage < Math.ceil(totalItems / itemsPerPage) && "text-[white]"}
        ${
          currentPage < Math.ceil(totalItems / itemsPerPage) && "cursor-pointer"
        }
        `}
        onClick={() => {
          currentPage < Math.ceil(totalItems / itemsPerPage) &&
            paginate(Math.ceil(totalItems / itemsPerPage));
        }}
      ></FaAngleDoubleRight>
    </div>
  );
};

export default Pagination;
