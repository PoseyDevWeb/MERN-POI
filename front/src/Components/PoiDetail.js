import React, { useEffect, useState } from "react";

import { Link, redirect } from "react-router-dom";

const PoiDetail = (props) => {
  let url = `http://localhost:8080/Api/Poi/${props.value}`;
  const [Poi, setPoi] = useState([]);
  const [Delete, setDelete] = useState();
  const [show, setShow] = useState(true);

  const getDetailPoi = () => {
    fetch(url)
      .then((responses) => responses.json())
      .then((data) => {
        setPoi(data);
      });
  };

  const HandeleDelete = () => {
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      console.log("suprimé avec succé");
      setDelete(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    });
  };
  useEffect(() => {
    getDetailPoi();
  }, [url]);

  if (!show) {
    return (window.location = "/");
  }
  return (
    <div>
      {Poi._id && !Delete && (
        <div className="vrai">
          <h4>Detail du point d'interet numero : </h4>
          <br />
          <br />
          <div>
            <p className="label">
              Nom = <b>{Poi.nom}</b>{" "}
            </p>
            <p className="label">
              Email = <b>{Poi.email}</b>
            </p>
            <p className="label">
              Adresse = <b>{Poi.adresse.slice(0, Poi.adresse.length - 32)}</b>
            </p>
            <p className="label">
              Longitude ={" "}
              <b>
                {Poi.adresse.slice(Poi.adresse.length - 8, Poi.adresse.length)}
              </b>
            </p>
            <p className="label">
              Latitude ={" "}
              <b>
                {Poi.adresse.slice(
                  Poi.adresse.length - 24,
                  Poi.adresse.length - 15
                )}
              </b>
            </p>
            <p className="label">
              Statut = <b>{Poi.statut}</b>
            </p>
            <p className="label">
              Type du POI = <b>{Poi.typePoi}</b>
            </p>
          </div>
          <div className="btn-detail">
            <Link
              to={`/modifier/${Poi._id}`}
              className="btn btn-primary"
              id="edit"
            >
              Modifier
            </Link>
            {!Poi.etat && (
              <Link
                to="/"
                className="btn btn-primary"
                id="info"
                onClick={HandeleDelete}
              >
                Plus d'infos
              </Link>
            )}
            <Link
              to="/"
              className="btn btn-primary"
              id="delete"
              onClick={HandeleDelete}
            >
              Supprimer
            </Link>
          </div>
        </div>
      )}
      {!Poi._id && !Delete && (
        <div className="faux">
          <h1>Cliquez pour voir les details</h1>
        </div>
      )}
      {Delete && show && (
        <div className="faux">
          <h1>POI suprimé avec succé</h1>
        </div>
      )}
    </div>
  );
};

export default PoiDetail;
