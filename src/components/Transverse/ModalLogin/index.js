import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./index.css";

const ModalLogin = ({
  setDisplayModalLogin,
  setDisplayModalSignup,
  setUser,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.token);
      setDisplayModalLogin(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mod-back">
      <div className="modal login">
        <div>
          <FontAwesomeIcon
            icon="times"
            onClick={() => {
              setDisplayModalLogin(false);
            }}
            className="cross"
          />
          <h3>Se connecter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              onChange={handleEmailChange}
              value={email}
            />
            <div className="password">
              <input
                type={visible ? "text" : "password"}
                placeholder="Mot de passe"
                name="password"
                //className={submit === 1 ? "error" : ""}
                onChange={handlePasswordChange}
                value={password}
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon"
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true);
                }}
              />
            </div>
            <input type="submit" id="submit" value="Se connecter" />
          </form>
          <div
            onClick={() => {
              setDisplayModalLogin(false);
              setDisplayModalSignup(true);
            }}
          >
            Pas encore de compte ? Inscrit-toi !
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
