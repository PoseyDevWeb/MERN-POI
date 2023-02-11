import React, { useState } from "react";
import PoiDetail from "./PoiDetail";
import PoiList from "./PoiList";

const Home = (props) => {
  const [constante, setConstante] = useState(0);

  const [data, setData] = useState();

  const handleData = (newData) => {
    setData(newData);
  };

  // Fonction qui sera passée en prop à ChildComponent
  console.log(data);
  return (
    <div className="home">
      <br />

      <div className="poi-list">
        <PoiList callback={handleData} />
      </div>
      <br />
      <br />
      <div className="poi-detail">
        <PoiDetail value={data} />
      </div>
    </div>
  );
};

export default Home;
