import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Hero from "../components/Home/Hero";
import Main from "../components/Home/Main";
import PageIndex from "../components/Home/PageIndex";

const Home = ({ search }) => {
  document.body.style = "background: white;";

  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTot, setPageTot] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=8&title=${search.keyWord}&priceMin=${search.priceMin}&priceMax=${search.priceMax}&sort=${search.sort}`
        );
        console.log("page:", page);

        setArticles(response.data.offers);
        setPageTot(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#0aaeb7" height={100} width={100} />
    </div>
  ) : (
    <div>
      <Hero />
      {articles.length === 0 ? (
        <div className="container">
          Aucun article ne correspond à votre recherche
        </div>
      ) : (
        <>
          <PageIndex pageTot={pageTot} page={page} />
          <Main articles={articles} />
          <PageIndex pageTot={pageTot} page={page} />
        </>
      )}
    </div>
  );
};

export default Home;
