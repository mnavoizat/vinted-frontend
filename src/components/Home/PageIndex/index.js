import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PageIndex = ({ page, pageTot }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(pageTot / 15); i++) {
    pages.push(i);
  }

  return (
    <div className="page-index container">
      <div className="results">{pageTot} resultats trouvés</div>
      <div>
        {page > 1 && (
          <Link to={`/home/${page - 1}`}>
            <FontAwesomeIcon icon="caret-left" className="icon" />
          </Link>
        )}
        {pages.map((element, index) => {
          return (
            <Link key={index} to={`/home/${index + 1}`}>
              <button
                className={
                  index + 1 === Number(page) ? "current-page" : "other-pages"
                }
              >
                {element}
              </button>
            </Link>
          );
        })}
        <Link to={`/home/${page + 1}`}>
          <FontAwesomeIcon
            icon="caret-right"
            className={`icon ${
              page < Math.ceil(pageTot / 15) ? "unvisible" : "visible"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default PageIndex;
