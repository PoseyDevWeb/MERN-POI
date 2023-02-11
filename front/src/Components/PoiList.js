import React, { useEffect, useState } from "react";

const PoiList = (props) => {
  const url = " http://localhost:8080/Api/Poi";
  const [Poi, setPoi] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const valeurArray = [];

  let inputData = 0;
  let count = 0;

  const getPoi = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPoi(data);
        //console.log(data[0].nom);
      })
      .catch((err) => console.log(err));
  };

  const Handeleclick = (e) => {
    e.preventDefault();
  };

  const HandeleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  if (searchInput) {
    let ok = 0;
    for (let i = 0; i < Poi.length; i++) {
      if (
        Poi[i].nom.toLowerCase().includes(searchInput.toLowerCase()) === true &&
        searchInput.length > 0
      ) {
        valeurArray[ok] = Poi[i];
        ok++;
      }
    }
    console.log(valeurArray);
  }
  let scroll = document.querySelector(".pois");
  let scroll2 = document.querySelector(".search");
  useEffect(() => {
    getPoi();
  }, [url]);
  console.log(scroll);
  if (Poi.length > 3) {
    scroll.classList.add("poi");
  }
  if (valeurArray.length > 3) {
    scroll2.classList.add("poi");
  }

  return (
    <div>
      <form className="form-inline">
        <fieldset>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              required="required"
              onChange={HandeleSearch}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={Handeleclick}>
                Recherche
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      <br />
      <h4>Liste des points d'interets</h4>

      <div className="pois">
        {Poi &&
          !searchInput &&
          Poi.map((pois, i) => (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title" key={pois.id}>
                  {pois.nom}
                </h4>
                <p className="card-text">
                  {pois.adresse.slice(0, pois.adresse.length - 32)}
                </p>
                <h6
                  className="btn btn-primary azim"
                  id={pois._id}
                  onClick={(e) => {
                    count = count + 1;
                    inputData = e.target.id;
                    props.callback(inputData);
                    console.log(count);
                    let element = document.getElementById(`${inputData}`);
                    console.log(element);
                    let elementT = document.querySelectorAll("h6");
                    elementT.forEach(function (h6) {
                      h6.style.backgroundColor = "#028bfc";
                    });

                    element.style.backgroundColor = "red";
                  }}
                >
                  voir plus ...
                </h6>
              </div>
            </div>
          ))}
      </div>

      {!Poi && (
        <div>
          <h3>liste vide: veuillez ajouter</h3>
        </div>
      )}
      <div className="search">
        {valeurArray &&
          valeurArray.map((pois, i) => (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title" key={pois._id}>
                  {pois.nom}
                </h4>
                <p className="card-text">
                  {pois.adresse.slice(0, pois.adresse.length - 32)}
                </p>
                <h6
                  className="btn btn-primary azim"
                  id={pois._id}
                  onClick={(e) => {
                    count = count + 1;
                    inputData = e.target.id;
                    props.callback(inputData);
                    console.log(count);
                    let element = document.getElementById(`${inputData}`);
                    console.log(element);
                    let elementT = document.querySelectorAll("h6");
                    elementT.forEach(function (h6) {
                      h6.style.backgroundColor = "#028bfc";
                    });

                    element.style.backgroundColor = "red";
                  }}
                >
                  voir plus ...
                </h6>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PoiList;
