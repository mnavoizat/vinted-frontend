import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import OfferComp from "../components/Offer/OfferComp";

const Offer = () => {
  document.body.style = "background: #eaedef;";

  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offer/${id}`);
        setArticle(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#0aaeb7" height={100} width={100} />
    </div>
  ) : (
    <div>
      <OfferComp article={article} />
    </div>
  );
};

export default Offer;
