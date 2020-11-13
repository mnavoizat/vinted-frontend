import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import OfferComp from "../components/Offer/OfferComp";

const Offer = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setArticle(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div>en cours de chargement...</div>
  ) : (
    <div>
      <OfferComp article={article} />
    </div>
  );
};

export default Offer;