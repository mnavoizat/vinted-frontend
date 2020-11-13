import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./index.css";

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
        setUser(response.data.token);
        setDisplayModalSignup(false);
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
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <div className="password">
              <input
                type={visible ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                name="confirmPassword"
                //className={submit === 1 ? "error" : ""}
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon"
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true);
                }}
              />
            </div>
            <input type="submit" id="submit" value="S'inscrire" />
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
