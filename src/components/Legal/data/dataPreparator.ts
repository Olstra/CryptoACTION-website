import type { Feature, GeoJsonProperties } from "geojson";

export type ComplianceLevel = "Yes" | "No" | "Partial";

export interface CountryCompliance {
  Country: string;
  MiCA: ComplianceLevel;
  DLT_Pilot: ComplianceLevel;
  DORA: ComplianceLevel;
  EU_RPS: ComplianceLevel;
  AMLD5_AMLD6: ComplianceLevel;
  FATF_TR_EU: ComplianceLevel;
  Total: number;
}

export function mergeComplianceIntoFeatures(
  features: Array<Feature>,
  compliances: CountryCompliance[],
): Array<Feature> {
  const map: Record<string, CountryCompliance> = {};

  for (const c of compliances) {
    map[c.Country.toLowerCase()] = c;
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
      ...(match
        ? {
            MiCA: match.MiCA,
            DLT_Pilot: match.DLT_Pilot,
            DORA: match.DORA,
            EU_RPS: match.EU_RPS,
            AMLD5_AMLD6: match.AMLD5_AMLD6,
            FATF_TR_EU: match.FATF_TR_EU,
            Total: match.Total,
          }
        : {}),
    };

    return {
      ...feature,
      properties: mergedProps,
    };
  });
}
