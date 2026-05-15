import { GeoJSON, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.sass";
import { europeGeojson } from "../data/europeGeojson.ts";
import type { Feature, FeatureCollection } from "geojson";
import { useState } from "react";
import { ScopeOptions, type ScopeType } from "../data/Scope.ts";
import { mergeComplianceIntoFeatures } from "../data/dataPreparator.ts";
import { Layer } from "leaflet";
import { COLOR_MAP_EU } from "../data/colorMaps.ts";
import { euCompliances } from "../data/euLayerData.ts";

const preparedData = mergeComplianceIntoFeatures(europeGeojson, euCompliances);

const featureCollection: FeatureCollection = {
  type: "FeatureCollection",
  features: preparedData,
};

export const Map = () => {
  const [mode, setMode] = useState<ScopeType>(ScopeOptions.Eu);

  function getStyle(feature: Feature) {
    const total = feature?.properties?.Total;
    const color = COLOR_MAP_EU[total] ?? "black";
    return { fillColor: color, fillOpacity: 1, weight: 1, color: "white" };
  }

  function onEachFeature(feature: Feature, layer: Layer) {
    const props = feature.properties;
    if (props?.NAME) {
      layer.bindPopup(
        `
        <div style="background: white">
          <p style="background: white">
            <span style="font-weight: bold">${props.NAME}</span><br>
            MiCA: ${props.MiCA}<br>
            DLT Pilot: ${props.DLT_Pilot}<br>
            DORA: ${props.DORA}<br>
            EU RPS: ${props.EU_RPS}<br>
            AMLD5, AMLD6: ${props.AMLD5_AMLD6}<br>
            FATF TR EU: ${props.FATF_TR_EU}<br>
          </p>
        </div>
      `,
      );
    }

    layer.on({
      mouseover: () => {
        layer.setStyle({ weight: 4 });
      },
      mouseout: () => {
        layer.setStyle(getStyle(feature));
      },
    });
  }

  return (
    <>
      <div>
        <h2>Layers</h2>
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
        center={[49.8153, 6.1296]}
        zoom={4}
      >
        <GeoJSON
          data={featureCollection}
          style={(feature) => getStyle(feature)}
          onEachFeature={onEachFeature}
        ></GeoJSON>
      </MapContainer>
    </>
  );
};
