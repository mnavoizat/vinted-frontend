import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useDropzone } from "react-dropzone";

const Publish = ({ setDisplayModalLogin }) => {
  document.body.style = "background: #eaedef;";

  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState([]);

  const formData = new FormData();

  const token = Cookie.get("userToken");
  useEffect(() => {
    if (!token) {
      setDisplayModalLogin(true);
    }
  }, [token, setDisplayModalLogin]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      formData.append("picture", picture[0]);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      alert("Votre annonce a bien été publiée");
      setPicture("");
      setTitle("");
      setDescription("");
      setBrand("");
      setSize("");
      setColor("");
      setCondition("");
      setCity("");
      setPrice("");
      setPreview("");
    } catch (error) {
      console.log(error.message);
      alert("Annonce incorrecte");
    }
  };

  const urlPreview = [...preview];
  const onDrop = useCallback(
    (acceptedFiles) => {
      setPicture(acceptedFiles);
      acceptedFiles.map((file) => {
        return urlPreview.push(URL.createObjectURL(file));
      });
      setPreview(urlPreview);
    },
    [urlPreview]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="publish container">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div className="block-publish picture">
          {/* <div><input
              type="file"
              //multiple={true}
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            /> </div>*/}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {preview.length > 0 ? (
              preview.map((url, index) => {
                return <img key={index} src={url} alt="" className="thumb" />;
              })
            ) : isDragActive ? (
              <p className="drag-drop">Déposez le fichier ici ...</p>
            ) : (
              <p className="drag-drop">
                Faites glisser et déposez les fichiers ici, ou cliquez pour
                sélectionner un fichier
              </p>
            )}
          </div>
        </div>
        <div className="block-publish">
          <div className="input">
            <p>Titre</p>
            <input
              type="text"
              placeholder="ex: chemise Zara verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Decris ton article</p>
            <textarea
              placeholder="ex: porté quelques fois, taille correctement"
              cols="30"
              rows="10"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="block-publish">
          <div className="input">
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Etat</p>
            <input
              type="text"
              placeholder="ex: Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="block-publish">
          <div className="input">
            <p>Prix</p>
            <input
              type="text"
              placeholder="ex: 0,00 €"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="button-publish">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
