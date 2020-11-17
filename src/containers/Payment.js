import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = ({ setDisplayModalLogin }) => {
  document.body.style = "background: #eaedef;";

  const location = useLocation();
  const { title, amount } = location.state;

  const token = Cookie.get("userToken");
  useEffect(() => {
    if (!token) {
      setDisplayModalLogin(true);
    }
  }, [token, setDisplayModalLogin]);

  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [completeName, setCompleteName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);
    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: completeName,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post("http://localhost:3000/pay", {
      stripeToken,
      amount,
      title,
    });
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div className="payment container">
      {completed ? (
        <div className="succeeded"> Paiement bien effectué !</div>
      ) : (
        <div className="block-payment">
          <div className="sous-block-payment">
            <h3>Résumé de la commande</h3>
            <div>
              <div className="line-payment">
                <span> Commande: {title}</span>
                <span>{amount / 100} €</span>
              </div>
              <div className="line-payment">
                <span>Frais protection acheteurs</span>
                <span>0.40 €</span>
              </div>
              <div className="line-payment">
                <span>Frais de port</span>
                <span>0.80 €</span>
              </div>
            </div>
          </div>
          <div className="sous-block-payment">
            <div className="line-payment">
              <span>Total</span>
              <span>{amount / 100 + 0.4 + 0.8} €</span>
            </div>
            <form className="card-element" onSubmit={handleSubmit}>
              <div className="line-payment">
                <span>Nom et prénom</span>
                <input
                  type="text"
                  value={completeName}
                  placeholder="Dupont Jean"
                  onChange={(event) => {
                    setCompleteName(event.target.value);
                  }}
                />
              </div>
              <CardElement />
              <div>
                <button type="submit">Payer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
