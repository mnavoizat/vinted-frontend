import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./index.css";
import { useHistory } from "react-router-dom";

const ModalSignup = ({
  setDisplayModalSignup,
  setDisplayModalLogin,
  setUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [samePasswords, setSamePasswords] = useState(true);

  let history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password === confirmPassword) {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email,
            username,
            password,
          }
        );
        if (response.data.token) {
          setUser(response.data.token);
          setDisplayModalSignup(false);
        } else {
          alert("Une erreur est survenue");
        }
      } else {
        setSamePasswords(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mod-back">
      <div className="modal">
        <div>
          <FontAwesomeIcon
            icon="times"
            onClick={() => {
              setDisplayModalSignup(false);
              history.push("/");
            }}
            className="cross"
          />
          <h3>S'inscrire</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleUsernameChange}
              value={username}
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
              className="input"
            />
            <div className="password">
              <input
                type={visible ? "text" : "password"}
                placeholder="Mot de passe"
                name="password"
                onChange={handlePasswordChange}
                value={password}
                className={`input ${!samePasswords ? "error" : ""}`}
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon"
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true);
                }}
              />
            </div>
            <div className="password">
              <input
                type={visible ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className={`input ${!samePasswords ? "error" : ""}`}
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon"
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true);
                }}
              />
            </div>
            {!samePasswords && (
              <p className="error-message">
                Les mots de passe ne sont pas identiques
              </p>
            )}
            <input
              type="submit"
              id="submit"
              value="S'inscrire"
              className="input"
            />
          </form>
          <div
            onClick={() => {
              setDisplayModalSignup(false);
              setDisplayModalLogin(true);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSignup;
