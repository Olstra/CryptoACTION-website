import { GeoJSON, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.sass";
import { europeGeojson } from "../../../geojson/europeGeojson.ts";
import type { Feature, FeatureCollection } from "geojson";
import { useMemo, useState } from "react";
import { ScopeOptions, type ScopeType } from "../data/Scope.ts";
import { mergeComplianceIntoFeatures } from "../data/dataPreparator.ts";
import { Layer } from "leaflet";
import { COLOR_MAP_EU } from "../data/colorMaps.ts";

import { euCompliances } from "../data/euLayerData.ts";
import { globalCompliances } from "../data/globalLayerData.ts";
import { regulatoryFrameworks } from "../data/nationalLayerData.ts";
import { preMicaRegimes } from "../data/preMicaData.ts";
import { micaCasps } from "../data/micaCaspsData.ts";

export const Map = () => {
  const [mode, setMode] = useState<ScopeType | string>(ScopeOptions.Global);

  // Helper to map current mode value to a clean display label
  const activeLayerLabel = useMemo(() => {
    switch (mode) {
      case ScopeOptions.Global:
        return "Global Layer";
      case ScopeOptions.Eu:
        return "Regional Layer (EU)";
      case ScopeOptions.PreMica:
        return "Regional Layer (Pre-MiCA)";
      case ScopeOptions.MicaCasps:
        return "Regional Layer (MiCA CASPs)";
      case ScopeOptions.National:
        return "National Layer";
      default:
        return "Active Layer";
    }
  }, [mode]);

  const featureCollection = useMemo<FeatureCollection>(() => {
    let activeData: any[];

    switch (mode) {
      case ScopeOptions.Global:
        activeData = globalCompliances;
        break;
      case ScopeOptions.Eu:
        activeData = euCompliances;
        break;
      case ScopeOptions.National:
        activeData = regulatoryFrameworks;
        break;
      case ScopeOptions.PreMica:
        activeData = preMicaRegimes;
        break;
      case ScopeOptions.MicaCasps:
        activeData = micaCasps;
        break;
      default:
        activeData = globalCompliances;
    }

    return {
      type: "FeatureCollection",
      features: mergeComplianceIntoFeatures(europeGeojson, activeData),
    };
  }, [mode]);

  function getStyle(feature: Feature) {
    const total = feature?.properties?.Total;

    const color =
      total !== undefined && COLOR_MAP_EU[total]
        ? COLOR_MAP_EU[total]
        : "black";

    return { fillColor: color, fillOpacity: 0.8, weight: 1, color: "white" };
  }

  function onEachFeature(feature: Feature, layer: Layer) {
    const props = feature.properties;

    if (props?.NAME) {
      let popupContent = `
        <div style="background: white">
          <p style="background: white; color: black">
            <span style="font-weight: bold">${props.NAME}</span><br>
      `;

      if (mode === ScopeOptions.Eu) {
        popupContent += `
          MiCA: ${props.MiCA ?? "-"}<br>
          DLT Pilot: ${props.DLT_Pilot ?? "-"}<br>
          DORA: ${props.DORA ?? "-"}<br>
          EU RPS: ${props.EU_RPS ?? "-"}<br>
          AMLD5, AMLD6: ${props.AMLD5_AMLD6 ?? "-"}<br>
          FATF TR EU: ${props.FATF_TR_EU ?? "-"}<br>
          Total: ${props.Total ?? "-"}
        `;
      } else if (mode === ScopeOptions.Global) {
        popupContent += `
          BCBS: ${props.BCBS ?? "-"}<br>
          FSB: ${props.FSB ?? "-"}<br>
          IAIS: ${props.IAIS ?? "-"}<br>
          IOSCO: ${props.IOSCO ?? "-"}<br>
          FATF VASP: ${props.FATF_VASP ?? "-"}<br>
          FATF TR: ${props.FATF_TR ?? "-"}<br>
          Total: ${props.Total ?? "-"}
        `;
      } else if (mode === ScopeOptions.National) {
        popupContent += `
          Separate Framework: ${props.Has_Separate_Framework ?? "-"}<br>
          Main Instrument: ${props.Main_Instrument_Label ?? "-"}<br>
          Style of Regime: ${props.Style_Of_Regime ?? "-"}
        `;
      } else if (mode === ScopeOptions.PreMica) {
        popupContent += `
          Pre-MiCA Regime: ${props.Pre_MiCA_Regime_Type ?? "-"}<br>
          Notes: ${props.Notes ?? "-"}
        `;
      } else if (mode === ScopeOptions.MicaCasps) {
        popupContent += `
          Implementation Date: ${props.Full_Implementation_Date ?? "-"}<br>
          MiCA CASPS Status: ${props.MiCA_CASPS_Status ?? "-"}
        `;
      }

      popupContent += `</p></div>`;
      layer.bindPopup(popupContent);
    }

    layer.on({
      mouseover: () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // reason: this property does exist on the object and is used correctly
        layer.setStyle({ weight: 4 });
      },
      mouseout: () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        layer.setStyle(getStyle(feature));
      },
    });
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <h2>Layers</h2>
        <span className={styles.helperText}>
          Click layers to update map view
        </span>
      </div>

      <div className={styles.controlsContainer}>
        {/* Global Layer Section */}
        <div className={styles.flexRow}>
          <span className={styles.layerLabel}>Global layer:</span>
          <div className={styles.flexSpacer} />
          <button
            type="button"
            className={`${styles.mapMode} ${mode === ScopeOptions.Global ? styles.active : ""}`}
            onClick={() => setMode(ScopeOptions.Global)}
            title="Click to view Global layer data"
          >
            {ScopeOptions.Global}
          </button>
          <div className={styles.flexSpacer} />
        </div>

        <hr className={styles.sectionDivider} />

        {/* Regional Layer Section */}
        <div className={styles.flexRow}>
          <span className={styles.layerLabel}>Regional layer:</span>
          <div className={styles.flexSpacer} />
          <button
            type="button"
            className={`${styles.mapMode} ${mode === ScopeOptions.Eu ? styles.active : ""}`}
            onClick={() => setMode(ScopeOptions.Eu)}
            title="Click to view Regional layer data"
          >
            {ScopeOptions.Eu}
          </button>
          <div className={styles.flexSpacer} />
        </div>

        <div className={styles.flexRowSub}>
          <div className={styles.flexSpacer} />
          <button
            type="button"
            className={`${styles.mapMode} ${mode === ScopeOptions.PreMica ? styles.active : ""}`}
            onClick={() => setMode(ScopeOptions.PreMica)}
            title="Click to view Pre-MiCA data"
          >
            Pre-MiCA
          </button>
          <button
            type="button"
            className={`${styles.mapMode} ${mode === ScopeOptions.MicaCasps ? styles.active : ""}`}
            onClick={() => setMode(ScopeOptions.MicaCasps)}
            title="Click to view MiCA CASPs data"
          >
            MiCA CASPs
          </button>
        </div>

        <hr className={styles.sectionDivider} />

        {/* National Layer Section */}
        <div className={styles.flexRow}>
          <span className={styles.layerLabel}>National Layer:</span>
          <div className={styles.flexSpacer} />
          <button
            type="button"
            className={`${styles.mapMode} ${mode === ScopeOptions.National ? styles.active : ""}`}
            onClick={() => setMode(ScopeOptions.National)}
            title="Click to view National layer data"
          >
            {ScopeOptions.National}
          </button>
          <div className={styles.flexSpacer} />
        </div>
      </div>

      {/* Selected Layer Info Banner right above the map */}
      <div className={styles.activeLayerIndicator}>
        <span className={styles.indicatorLabel}>Current View:</span>
        <span className={styles.indicatorValue}>{activeLayerLabel}</span>
      </div>

      <MapContainer className={styles.mapContainer} center={[55, 17]} zoom={4}>
        <GeoJSON
          key={mode}
          data={featureCollection}
          style={(feature) => getStyle(feature as Feature)}
          onEachFeature={onEachFeature}
        ></GeoJSON>
      </MapContainer>
    </>
  );
};
