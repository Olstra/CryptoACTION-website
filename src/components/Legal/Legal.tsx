import React from "react";
import styles from "./Legal.module.sass";
import img from "../../assets/layers_overview.png";
import { Map } from "./Map/Map.tsx";

export const Legal: React.FC = () => {
  return (
    <section className="content-section">
      <h1>Regulatory Frameworks</h1>
      <div>
        <h2>Layers:</h2>
        <Map />
      </div>
      <div>
        <h2>Layers explanation:</h2>
        <img src={img} alt="overview" className={styles.layerImage} />
      </div>
    </section>
  );
};
