import React, { useState } from "react";
import styles from "./Map.module.sass";

import nationalImg from "../../../assets/national_layer.png";
import euImg from "../../../assets/eu_layer.png";
import globalImg from "../../../assets/global_layer.png";

const IMAGES: Record<string, string> = {
  national: nationalImg,
  eu: euImg,
  global: globalImg,
};

export const Map: React.FC = () => {
  const [mode, setMode] = useState<"national" | "eu" | "global">("national");

  return (
    <>
      <fieldset className={styles.mapModeFieldset}>
        <h2>Select layer map:</h2>

        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value="national"
            checked={mode === "national"}
            onChange={() => setMode("national")}
          />
          National
        </label>

        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value="eu"
            checked={mode === "eu"}
            onChange={() => setMode("eu")}
          />
          EU
        </label>

        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value="global"
            checked={mode === "global"}
            onChange={() => setMode("global")}
          />
          Global
        </label>
      </fieldset>

      <div>
        <img
          src={IMAGES[mode]}
          alt={`${mode} map`}
          className={styles.mapImage}
        />
      </div>
    </>
  );
};
