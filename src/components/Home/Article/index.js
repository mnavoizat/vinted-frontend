import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import userLogo from "../../../assets/user-logo.jpg";

const Article = ({ article }) => {
  return (
    <div className="article">
      <Link to={`/offer/${article._id}`} className="link">
        <div className="user">
          <div>
            {article.owner.account.avatar ? (
              <img src={article.owner.account.avatar.secure_url} alt="" />
            ) : (
              <img src={userLogo} alt="" />
            )}
          </div>
          <div>{article.owner.account.username}</div>
        </div>
        <div className="picture">
          {article.product_image && (
            <img src={article.product_image.secure_url} alt="" />
          )}
        </div>
        <div className="infos">
          <div className="price">{article.product_price} €</div>
          <div>{article.product_details[1].TAILLE}</div>
          <div>{article.product_name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Article;
