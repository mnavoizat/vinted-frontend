import React from "react";
import "./index.css";
import heroImage from "../../../assets/hero-image.jpeg";

const index = () => {
  return (
    <div className="hero">
      <img src={heroImage} alt="heroImage" />
      <div className="container-block">
        <div className="block">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
          <p>Découvrir comment ça marche</p>
        </div>
      </div>
    </div>
  );
};

export default index;
