import React from "react";
import "./Monitoring.sass";

type Tx = {
  entryId: number;
  caseDescription: string;
  txList: string[];
};

type Row = {
  address: string;
  risk: "low" | "medium" | "high" | string;
  transactions?: Tx | null;
};

const initialData: Row[] = [
  {
    address: "bc1ql49ydapnjafl5t2cp9zqpjwe6pdgmxy98859v2",
    risk: "low",
    transactions: null,
  },
  {
    address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
    risk: "high",
    transactions: {
      entryId: 123,
      caseDescription: "Associated with suspicious transfers to mixer",
      txList: ["34xp4v...v4Twseo", "0xTX02...", "0xTX03..."],
    },
  },
  {
    address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97",
    risk: "medium",
    transactions: {
      entryId: 456,
      caseDescription: "Linked to phishing campaign",
      txList: ["0xTX10...", "0xTX11..."],
    },
  },
];

export const Monitoring: React.FC = () => {
  return (
    <section className="content-section">
      <h1>Monitoring</h1>
      <div className="table-wrapper" role="region">
        <table className="monitoring-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Risk level</th>
              <th>Transactions list (TXs associated with a committed crime)</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((r) => (
              <tr key={r.address}>
                <td className="addr-cell">{r.address}</td>
                <td>
                  <span className={`risk-pill risk-${r.risk}`}>{r.risk}</span>
                </td>
                <td>
                  {r.transactions ? (
                    <div>
                      <p style={{ background: "white" }}>
                        Entry ID: {r.transactions.entryId}
                      </p>
                      <p style={{ background: "white" }}>
                        TX list: {r.transactions.txList}
                      </p>
                      <p style={{ background: "white" }}>
                        Case description: {r.transactions.caseDescription}
                      </p>
                    </div>
                  ) : (
                    <span className="dash">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
