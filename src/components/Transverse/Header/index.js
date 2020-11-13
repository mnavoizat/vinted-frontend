import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalSignup from "../ModalSignup";
import ModalLogin from "../ModalLogin";

const Header = ({ setUser, token }) => {
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [displayModalLogin, setDisplayModalLogin] = useState(false);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img src="Vinted_logo.png" alt="logo-vinted" />
        </Link>
        <form>
          <FontAwesomeIcon icon="search" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Entrez votre recherche"
          />
        </form>
        <div>
          {token ? (
            <button
              onClick={() => {
                setUser(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setDisplayModalSignup(true);
                }}
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  setDisplayModalLogin(true);
                }}
              >
                Se connecter
              </button>
            </>
          )}
        </div>
        <button>Vends tes articles</button>
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
