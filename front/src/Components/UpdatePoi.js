import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdatePoi = () => {
  const [Etat, setEtat] = useState("");
  const [Poi, setPoi] = useState([]);
  const [Adresse, setAdresse] = useState("");
  const [AdresseInitial, setAdresseInitiale] = useState("");
  const [Type, setType] = useState("");
  const { id } = useParams();
  const [Nom, setNom] = useState("");
  const [Email, setEmail] = useState("");
  const [Statut, setStatut] = useState("");
  let Ok = false;
  let addressArr = [];

  //const { Data: Blogs, isLoading, erreur } = UseRecuperation(url);
  const url = "http://localhost:8080/Api/Poi/" + id;

  const getPoi = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPoi(data);
        //console.log(data[0].nom);
        setNom(data.nom);
        setEtat(data.etat);
        setType(data.typePoi);
        setEmail(data.email);
        setStatut(data.statut);
        setAdresse(data.adresse);
        setAdresseInitiale(data.adresse.slice(0, data.adresse.length - 32));
      })
      .catch((err) => console.log(err));
  };

  const HandelePoiUpdating = (e) => {
    e.preventDefault();
    const nom = Nom;
    const typePoi = Type;
    const adresse = Adresse;
    const email = Email;
    const statut = Statut;
    const etat = Etat;

    const Poi = { nom, adresse, typePoi, email, statut, etat };

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Poi),
    }).then(() => {
      console.log("article ajouter avec succes.");
    });
  };

  const HandeleChangeNom = (e) => {
    setNom(e.target.value);
  };

  const HandeleChangeAdresse = (e) => {
    setAdresseInitiale(e.target.value);
    var url2 =
      "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=" +
      e.target.value;
    fetch(url2, {
      method: "GET",
      headers: {
        apiKey:
          "RVVfY2YyODNlNTUyOGE1NGJkZWFhYThjNjRmMWY1NmRlYzQ6NTg0YThiN2UtZTE1NS00YTc1LThhMzQtMjcyMmRhMTFmOTg4",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (addressArr = data))
      .then((show) => console.log(addressArr))
      .then((show) => showAddress())
      .catch((err) => console.log(err));

    // remplacer l'adresse par la longitude et l'altitude
    function showAddress() {
      if (addressArr["locations"].length > 0) {
        addressArr["locations"].forEach((element) => {
          if (
            element.locationType === "EXACT_ADDRESS" ||
            element.locationType === "LOCALITY"
          ) {
            let lat = parseFloat(element.referencePosition.latitude).toFixed(5);
            let long = parseFloat(element.referencePosition.longitude).toFixed(
              5
            );
            let adresseComplet =
              element.formattedAddress + "/  lat : " + lat + " long : " + long;
            setAdresse(adresseComplet);
            Ok = true;
          }
        });
      }
    }
  };

  const HandeleChangeType = (e) => {
    setType(e.target.value);
  };

  const HandeleValide = (e) => {
    e.preventDefault();
    setEtat(e.target.id);
    setStatut("en ligne");
    console.log(e.target.id);
  };

  const HandeleNonValide = (e) => {
    e.preventDefault();
    setEtat(e.target.id);
    console.log(e.target.e);
  };

  const HandeleModification = (e) => {
    window.location = "/";
  };

  useEffect(() => {
    getPoi();
  }, [url]);

  return (
    <div>
      {Poi && (
        <form onSubmit={HandelePoiUpdating} className="form form-update">
          <br />
          <br />
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="title">Nom du Point d'interet</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={Nom}
              required
              onChange={HandeleChangeNom}
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="title">Adresse du Point d'interet</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={AdresseInitial}
              required
              onChange={HandeleChangeAdresse}
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="type">Selectionez le type du POI</label>
            <select
              required
              className="form-control"
              id="type"
              value={Type}
              onChange={HandeleChangeType}
            >
              <option value="douche">douche</option>
              <option value="wifi">Wifi</option>
              <option value="distribution">Distribution</option>
            </select>
          </div>

          <br />

          <div className="form-group">
            {Etat !== "validé" && (
              <div>
                <button className=" valide" id="validé" onClick={HandeleValide}>
                  Valider le POI
                </button>

                <button
                  className="non-valide"
                  id="n-valide"
                  onClick={HandeleNonValide}
                >
                  Besoin d'information
                </button>
              </div>
            )}
            {Etat === "validé" && (
              <div className="form-group">
                <label htmlFor="title">Etat du POI</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Etat}
                  required
                  disabled
                />
              </div>
            )}
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary modifier"
              onClick={HandeleModification}
            >
              Valider les Modifications
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdatePoi;

/*import UseRecuperation from "./useRecuperation";

const UpdateBlog = () => {
  //const [title, setTitle] = useState("");


  let { Data: Blogs, isLoading, erreur } = UseRecuperation(url);

  
  return (
    <div className="create-blog">
      {Blogs && (
        <form onSubmit={HandleBlogUpdating} className="form">
          <div className="form-group">
            <label htmlFor="title">Titre de l'article</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={Blogs.title}
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Selectionez un auteur</label>
            <select
              required
              className="form-control"
              id="author"
              value={author}
              onChange={(e) => {
                let value = e.target.value;
                setAuthor(value);
              }}
            >
              <option value=""></option>
              <option value="Tony">Tony</option>
              <option value="Duplex">Duplex</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="body">Contenu de l'article</label>
            <textarea
              required
              value={body}
              onChange={(e) => {
                let value = e.target.value;
                setBody(value);
              }}
              className="form-control textarea"
              id="body"
              rows="10"
            ></textarea>
          </div>
          <div className="form-group">
            {!isLoading && (
              <button type="submit" className="btn-create">
                Valider les Modifications
              </button>
            )}
            {isLoading && (
              <button type="submit" className="btn-create" disabled>
                En cour de traitement ...
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;*/
