import React, { useState } from "react";

const AddPoi = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [typePoi, setTypePoi] = useState("");
  const [statut, setStatut] = useState("brouillon");
  const [etat, setEtat] = useState("");
  const [Ok, setOk] = useState();
  let addressArr = [];

  const HandelePoiAdding = (e) => {
    e.preventDefault();
    const tmp_date = new Date().toISOString().split("T");
    const date = `${tmp_date[0]} ${tmp_date[1]}`;

    const Poi = { nom, email, adresse, typePoi, statut, etat, date };
    if (!Ok) {
      fetch("http://localhost:8080/Api/Poi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Poi),
      }).then(() => {
        console.log("article ajouter avec succes.");
        window.location = "/";
      });
    } else if (Ok) {
      let element = document.getElementById("adresse");
      element.style.borderColor = "red";
    }
  };

  const HandeleChangeAdresse = (e) => {
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
          if (element.address.countryName === "France") {
            let lat = parseFloat(element.referencePosition.latitude).toFixed(5);
            let long = parseFloat(element.referencePosition.longitude).toFixed(
              5
            );
            let adresseComplet =
              element.formattedAddress + "/  lat : " + lat + " long : " + long;
            setAdresse(adresseComplet);
            setOk(false);
            console.log();
          } else {
            setOk(true);
          }
        });
      } else {
        setOk(true);
      }
    }
  };
  return (
    <div className="ajout">
      <br />
      <h4>Ajouter un Point d'interet</h4>

      <div>
        <form onSubmit={HandelePoiAdding} className="form form-update">
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="nom">Nom du Point d'interet</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              placeholder="Ex: Jumia Food"
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="adresse">Adresse du Point d'interet</label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              placeholder="Exe: 3 place de la pinede, 94470 boissy-saint-leger"
              onChange={HandeleChangeAdresse}
              required
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="title">Email du Point d'interet</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="typePoi">Selectionez le type du POI</label>
            <select
              required
              className="form-control"
              id="tyePoi"
              onChange={(e) => setTypePoi(e.target.value)}
            >
              <option></option>
              <option value="douche">douche</option>
              <option value="wifi">Wifi</option>
              <option value="distribution">Distribution</option>
            </select>
          </div>

          <br />

          <br />
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-primary modifier">
              Valider le Formulaiare
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPoi;
