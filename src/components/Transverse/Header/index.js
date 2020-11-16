import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/Vinted_logo.png";
import { useHistory } from "react-router-dom";

import ModalSignup from "../ModalSignup";
import ModalLogin from "../ModalLogin";

const Header = ({
  setUser,
  token,
  setSearch,
  displayModalLogin,
  setDisplayModalLogin,
}) => {
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [ascendant, setAscendant] = useState(false);
  const [descendant, setDescendant] = useState(false);
  const [sort, setSort] = useState("");

  let history = useHistory();

  const handleAscendant = (event) => {
    if (event.target.checked) {
      setAscendant(true);
      setDescendant(false);
      setSort("price-asc");
    } else {
      setAscendant(false);
      if (!descendant) {
        setSort("");
      }
    }
    console.log(ascendant, descendant);
  };
  const handleDescendant = (event) => {
    if (event.target.checked) {
      setDescendant(true);
      setAscendant(false);
      setSort("price-desc");
    } else {
      setDescendant(false);
      if (!ascendant) {
        setSort("");
      }
    }
    console.log(ascendant, descendant);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch({ keyWord, priceMin, priceMax, sort });
    history.push("/");
  };

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo-vinted" />
        </Link>
        <form onSubmit={handleSubmit} className="form">
          <button type="submit" className="search-button but1">
            <FontAwesomeIcon icon="search" /> <span>Go !</span>
          </button>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Entrez votre recherche"
            value={keyWord}
            onChange={(event) => {
              setKeyWord(event.target.value);
            }}
            className="search"
          />
          <div className="price">
            <button
              onClick={() => {
                displayPrice ? setDisplayPrice(false) : setDisplayPrice(true);
              }}
              className="search-button but2"
              type="button"
            >
              <span>Prix</span> <FontAwesomeIcon icon="caret-down" />
            </button>
            <div className={`price-dev ${displayPrice ? "visible" : "hidden"}`}>
              <div className="min-max">
                <div>
                  <p>Prix min</p>
                  <input
                    type="text"
                    placeholder="€"
                    value={priceMin}
                    onChange={(event) => {
                      setPriceMin(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <p>Prix max</p>
                  <input
                    type="text"
                    placeholder="€"
                    value={priceMax}
                    onChange={(event) => {
                      setPriceMax(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="sort">
                <div>
                  <input
                    type="checkbox"
                    onChange={handleAscendant}
                    checked={ascendant}
                  />
                  <p>ordre croissant</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={handleDescendant}
                    checked={descendant}
                  />
                  <p>ordre décroissant</p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {token ? (
            <button
              onClick={() => {
                setUser(null);
              }}
              className="deconnect"
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setDisplayModalSignup(true);
                }}
                className="logSign"
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  setDisplayModalLogin(true);
                }}
                className="logSign"
              >
                Se connecter
              </button>
            </>
          )}
        </div>
        <Link to="/publish">
          <button className="sell">Vends tes articles</button>
        </Link>
      </div>
      {displayModalSignup && (
        <ModalSignup
          setDisplayModalSignup={setDisplayModalSignup}
          setDisplayModalLogin={setDisplayModalLogin}
          setUser={setUser}
        />
      )}
      {displayModalLogin && (
        <ModalLogin
          setDisplayModalLogin={setDisplayModalLogin}
          setDisplayModalSignup={setDisplayModalSignup}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default Header;
