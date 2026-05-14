import React from "react";
import styles from "./Monitoring.module.sass";

type Tx = {
  entryId: number;
  caseDescription: string;
  txList: string[];
};

type Row = {
  address: string;
  risk: "Low" | "Medium" | "High" | string;
  transactions?: Tx | null;
};

const initialData: Row[] = [
  {
    address: "bc1ql49ydapnjafl5t2cp9zqpjwe6pdgmxy98859v2",
    risk: "Low",
    transactions: null,
  },
  {
    address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
    risk: "High",
    transactions: {
      entryId: 123,
      caseDescription: "Associated with suspicious transfers to mixer",
      txList: ["34xp4v...v4Twseo", "0xTX02...", "0xTX03..."],
    },
  },
  {
    address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97",
    risk: "Medium",
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
      <div className={styles.tableWrapper}>
        <table className={styles.monitoringTable}>
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
                <td className={styles.addrCell}>{r.address}</td>
                <td>
                  <span
                    className={`${styles.riskPill} ${styles[`risk${r.risk}`]}`}
                  >
                    {r.risk}
                  </span>
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
                    <span className={styles.dash}>-</span>
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
