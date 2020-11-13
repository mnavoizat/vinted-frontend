import React from "react";
import Article from "../Article";
import "./index.css";

const Main = ({ articles }) => {
  return (
    <div className="main container">
      {articles.map((article, index) => {
        return <Article key={index} article={article} />;
      })}
    </div>
  );
};

export default Main;
