export interface Publication {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  methods: string[];
  blockchainType: "utxo" | "account" | "agnostic";
  category: string;
  subCategory?: string;
  url?: string;
  doi?: string;
}

/**
 * Parses BibTeX string content into structured Publication objects.
 */
export function parseBibtex(bibtexString: string): Publication[] {
  const publications: Publication[] = [];

  // Match entries like @article{id, ... } or @inproceedings{id, ... }
  const entryRegex = /@([a-zA-Z]+)\s*\{\s*([^,\s]+)\s*,([\s\S]*?)\n\s*\}/g;
  let match;

  while ((match = entryRegex.exec(bibtexString)) !== null) {
    const id = match[2];
    const body = match[3];

    const fields: Record<string, string> = {};
    const fieldRegex =
      /\b([a-zA-Z_-]+)\s*=\s*(?:\{([^}]*)\}|"([^"]*)"|([^\s,]+))/g;
    let fieldMatch;

    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      const key = fieldMatch[1].toLowerCase();
      const val = fieldMatch[2] || fieldMatch[3] || fieldMatch[4] || "";
      fields[key] = val.replace(/[\{\}]/g, "").trim();
    }

    const title = fields["title"] || "Untitled";
    const authors = fields["author"] || fields["authors"] || "Unknown Author";
    const year = parseInt(fields["year"], 10) || 2024;
    const venue =
      fields["booktitle"] || fields["journal"] || fields["publisher"] || "";
    const doi = fields["doi"];
    const url = fields["url"] || (doi ? `https://doi.org/${doi}` : undefined);

    // Parse keywords or tags
    const rawKeywords =
      fields["keywords"] || fields["tag"] || fields["tags"] || "";
    const methods = rawKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    // Determine blockchain type from keywords/methods
    let blockchainType: "utxo" | "account" | "agnostic" = "agnostic";
    const lowerKeywords = rawKeywords.toLowerCase();
    if (lowerKeywords.includes("utxo") || lowerKeywords.includes("bitcoin")) {
      blockchainType = "utxo";
    } else if (
      lowerKeywords.includes("account") ||
      lowerKeywords.includes("ethereum") ||
      lowerKeywords.includes("evm")
    ) {
      blockchainType = "account";
    }

    // Determine category from process step keywords
    let category = "Tracing";
    for (const m of methods) {
      const lowerM = m.toLowerCase();
      if (lowerM.includes("monitoring")) {
        category = "Monitoring";
      } else if (lowerM.includes("tracing")) {
        category = "Tracing";
      } else if (lowerM.includes("attribution")) {
        category = "Attribution";
      } else if (
        lowerM.includes("evidence management") ||
        lowerM.includes("legal action")
      ) {
        category = "Legal Action";
      } else if (lowerM.includes("prevention")) {
        category = "Prevention";
      } else if (
        lowerM.includes("all-in-one") ||
        lowerM.includes("all in one")
      ) {
        category = "All-in-one Tools";
      }
    }

    publications.push({
      id,
      title,
      authors,
      year,
      venue,
      methods,
      blockchainType,
      category,
      url,
      doi,
    });
  }

  return publications;
}
