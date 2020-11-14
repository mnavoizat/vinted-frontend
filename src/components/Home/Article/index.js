import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  console.log(article);
  return (
    <div className="article">
      <Link to={`/offer/${article._id}`} className="link">
        <div className="user">
          <div>
            <img src={article.owner.account.avatar.secure_url} alt="" />
          </div>
          <div>{article.owner.account.username}</div>
        </div>
        <img src={article.product_image.secure_url} alt="" />
        <div className="infos">
          <div className="price">{article.product_price} €</div>
          <div>{article.product_details[1].TAILLE}</div>
          <div>{article.product_details[0].MARQUE}</div>
        </div>
      </Link>
    </div>
  );
};

export default Article;
