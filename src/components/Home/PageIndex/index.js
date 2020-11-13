import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageIndex = ({ pageIndex, setPageIndex, pageTot }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(pageTot / 8); i++) {
    pages.push(i);
  }

  return (
    <div className="page-index container">
      {pageIndex > 1 && (
        <FontAwesomeIcon
          icon="caret-left"
          className="icon"
          onClick={() => {
            setPageIndex(pageIndex - 1);
          }}
        />
      )}
      {pages.map((element, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPageIndex(index + 1);
            }}
            className={index + 1 === pageIndex ? "current-page" : "other-pages"}
          >
            {element}
          </button>
        );
      })}

      <FontAwesomeIcon
        icon="caret-right"
        className={`icon ${
          pageIndex < Math.ceil(pageTot / 8) ? "unvisible" : "visible"
        }`}
        onClick={() => {
          setPageIndex(pageIndex + 1);
        }}
      />
    </div>
  );
};

export default PageIndex;
