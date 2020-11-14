import React from "react";
import "./index.css";
import heroImage from "../../../assets/hero-image.jpeg";
import dechire from "../../../assets/dechire.svg";

const index = () => {
  return (
    <div className="hero">
      <div className="images">
        <img src={heroImage} alt="heroImage" />
        <img src={dechire} alt="dechire" />
      </div>

      <div className="container-block">
        <div className="block">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default index;
