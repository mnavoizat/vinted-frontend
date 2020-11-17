import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./index.css";
import { useHistory } from "react-router-dom";

const ModalLogin = ({
  setDisplayModalLogin,
  setDisplayModalSignup,
  setUser,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  let history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        setDisplayModalLogin(false);
      }
    } catch (error) {
      console.log(error.message);
      alert("Données incorrectes");
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
              history.push("/");
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
              className="input"
            />
            <div className="password">
              <input
                type={visible ? "text" : "password"}
                placeholder="Mot de passe"
                name="password"
                //className={submit === 1 ? "error" : ""}
                onChange={handlePasswordChange}
                value={password}
                className="input"
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon"
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true);
                }}
              />
            </div>
            <input
              type="submit"
              id="submit"
              value="Se connecter"
              className="input"
            />
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
