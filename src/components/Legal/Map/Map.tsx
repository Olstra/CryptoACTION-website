import { GeoJSON, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.sass";
import { europeGeojson } from "./europeGeojson.ts";
import type { FeatureCollection } from "geojson";
import { useState } from "react";
import { ScopeOptions, type ScopeType } from "./Scope.tsx";

const featureCollection: FeatureCollection = {
  type: "FeatureCollection",
  features: europeGeojson,
};

export const Map = () => {
  const [mode, setMode] = useState<ScopeType>(ScopeOptions.National);

  return (
    <>
      <div>
        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value="national"
            checked={mode === ScopeOptions.National}
            onChange={() => setMode(ScopeOptions.National)}
          />
          {ScopeOptions.National}
        </label>
        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value={ScopeOptions.Eu}
            checked={mode === ScopeOptions.Eu}
            onChange={() => setMode(ScopeOptions.Eu)}
          />
          {ScopeOptions.Eu}
        </label>
        <label className={styles.mapMode}>
          <input
            type="radio"
            name="map-mode"
            value={ScopeOptions.Global}
            checked={mode === ScopeOptions.Global}
            onChange={() => setMode(ScopeOptions.Global)}
          />
          {ScopeOptions.Global}
        </label>
      </div>

      <MapContainer
        className={styles.mapContainer}
        center={[47.25966, 11.40038]}
        zoom={4}
      >
        <GeoJSON data={featureCollection}></GeoJSON>
      </MapContainer>
    </>
  );
};
