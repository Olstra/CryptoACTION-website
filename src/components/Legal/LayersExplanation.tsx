import React from "react";
import styles from "./Legal.module.sass";
import img from "../../assets/layers_overview.png";

export const Legal: React.FC = () => {
  return (
    <>
      <h2>Layers explanation:</h2>
      <img src={img} alt="overview" className={styles.layerImage} />
    </>
  );
};
