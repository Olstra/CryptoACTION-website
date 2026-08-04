import type { Feature, GeoJsonProperties } from "geojson";

export type ComplianceLevel = "Yes" | "No" | "Partial" | "On Transition";

export interface CountryLayerCompliance {
  Country: string;
  MiCA: ComplianceLevel | null;
  DLT_Pilot: ComplianceLevel | null;
  DORA: ComplianceLevel | null;
  EU_RPS: ComplianceLevel | null;
  AMLD5_AMLD6: ComplianceLevel | null;
  FATF_TR_EU: ComplianceLevel | null;
  Total: number | null;
}

export interface GlobalLayerCompliance {
  Country: string;
  BCBS: ComplianceLevel | null;
  FSB: ComplianceLevel | null;
  IAIS: ComplianceLevel | null;
  IOSCO: ComplianceLevel | null;
  FATF_VASP: ComplianceLevel | null;
  FATF_TR: ComplianceLevel | null;
  Total: number | null;
}

export interface NationalLayerCompliance {
  Country: string;
  Has_Separate_Framework: string | null;
  Main_Instrument_Label: string | null;
  Style_Of_Regime: string | null;
  Total: number | null;
}

export interface PreMicaRegimeCompliance {
  Country: string;
  Pre_MiCA_Regime_Type: string | null;
  Notes: string | null;
  Total: number | null;
}

export interface MicaCaspCompliance {
  Country: string;
  Full_Implementation_Date: string | null;
  MiCA_CASPS_Status: ComplianceLevel | string | null;
  Total: number | null;
}

export function mergeComplianceIntoFeatures<T extends { Country: string }>(
  features: Array<Feature>,
  compliances: T[],
): Array<Feature> {
  const map: Record<string, T> = {};

  // Build a fast lookup map based on country name
  for (const c of compliances) {
    map[c.Country.toLowerCase().trim()] = c;
  }

  return features.map((feature) => {
    const props = feature.properties ?? ({} as GeoJsonProperties);
    let name = "<NO-NAME-FOUND>";

    if (props?.NAME) {
      name = props.NAME.toLowerCase().trim();
    }

    const match = name ? map[name] : undefined;

    const mergedProps = {
      ...props,
      ...(match || {}),
    };

    return {
      ...feature,
      properties: mergedProps,
    };
  });
}
