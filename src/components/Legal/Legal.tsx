import React from "react";
import styles from "./Legal.module.sass";
import { Map } from "./Map/Map.tsx";
import { LayersExplanation } from "./LayersExplanation.tsx";

export const Legal: React.FC = () => {
  return (
    <section className="content-section">
      <h1>Regulatory Frameworks</h1>
      <LayersExplanation />
      <div className={styles.explanationSpacing} />
      <Map />
    </section>
  );
};
