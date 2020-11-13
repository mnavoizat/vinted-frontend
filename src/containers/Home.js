import React, { useState, useEffect } from "react";
import axios from "axios";

import Hero from "../components/Home/Hero";
import Main from "../components/Home/Main";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setArticles(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>en cours de chargement...</div>
  ) : (
    <div>
      <Hero />
      <Main articles={articles} />
    </div>
  );
};

export default Home;
