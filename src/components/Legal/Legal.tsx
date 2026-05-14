import React from "react";
import "./Legal.sass";
import img from "../../assets/layers_overview.png";
import { Map } from "./Map/Map.tsx";

export const Legal: React.FC = () => {
  return (
    <section className="content-section">
      <h1>Regulatory Frameworks Overview</h1>
      <img src={img} alt="overview" className="layer-image" />
      <Map />
    </section>
  );
};
