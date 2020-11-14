import React from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const OfferComp = ({ article }) => {
  console.log(article);
  return (
    <div className="offer-comp">
      <div className="container">
        <div>
          {/* <div>
            <img src={article.product_image.secure_url} alt="article" />
          </div> */}
          <Carousel className="carousel" showThumbs="false">
            {article.product_pictures.map((element, index) => {
              return (
                <div key={index}>
                  <img src={element.secure_url} alt="" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="infos">
          <div>
            <h2>{article.product_price} €</h2>
            {article.product_details.map((element, index) => {
              const key = Object.keys(element);
              return (
                <div key={index} className="details">
                  <span className="style1">{key[0]}</span>
                  <span className="style2">{element[key[0]]}</span>
                </div>
              );
            })}
          </div>
          <hr />
          <div>
            <h2>{article.product_name}</h2>
            <span className="style1">{article.product_description}</span>
            <div className="user">
              <img src={article.owner.account.avatar.secure_url} alt="" />
              <span className="style2">{article.owner.account.username}</span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default OfferComp;
