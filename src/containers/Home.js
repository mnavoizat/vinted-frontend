import React, { useState, useEffect } from "react";
import axios from "axios";

import Hero from "../components/Home/Hero";
import Main from "../components/Home/Main";
import PageIndex from "../components/Home/PageIndex";

const Home = ({ search }) => {
  document.body.style = "background: white;";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageTot, setPageTot] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${pageIndex}&limit=8&title=${search.keyWord}&priceMin=${search.priceMin}&priceMax=${search.priceMax}&sort=${search.sort}`
        );
        setArticles(response.data.offers);
        setPageTot(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pageIndex, search]);

  return isLoading ? (
    <div>en cours de chargement...</div>
  ) : (
    <div>
      <Hero />
      {articles.length === 0 ? (
        <div className="container">
          Aucun article ne correspond à votre recherche
        </div>
      ) : (
        <>
          <PageIndex
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageTot={pageTot}
          />
          <Main articles={articles} />
          <PageIndex
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageTot={pageTot}
          />
        </>
      )}
    </div>
  );
};

export default Home;
