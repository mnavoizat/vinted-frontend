import React from "react";
import "./index.css";

const OfferComp = ({ article }) => {
  return (
    <div className="offer-comp">
      <div className="container">
        <div>
          <img src={article.product_image.secure_url} alt="article" />
        </div>
        <div className="infos">
          <div>
            <span>{article.product_price}</span>
            {article.product_details.map((element, index) => {
              const key = Object.keys(element);
              return (
                <div className="details">
                  <span>{key[0]}</span>
                  <span>{element[key[0]]}</span>
                </div>
              );
            })}
          </div>
          <div>
            <span>{article.product_name}</span>
            <span>{article.product_description}</span>
            <span>{article.owner.account.username}</span>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default OfferComp;
