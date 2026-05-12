import React, { useEffect, useState } from "react";

type Tx = {
    entryId: number;
    caseDescription: string;
    txList: string[]; // simplified for display; can be detailed objects
};

type Row = {
    address: string;
    risk: "low" | "medium" | "high" | string;
    transactions?: Tx | null;
};

const initialData: Row[] = [
    {
        address: "0xAbc...123",
        risk: "low",
        transactions: null,
    },
    {
        address: "0xVwz...987",
        risk: "high",
        transactions: {
            entryId: 123,
            caseDescription: "Associated with suspicious transfers to mixer",
            txList: ["0xTX01...", "0xTX02...", "0xTX03..."],
        },
    },
    {
        address: "0xMore...000",
        risk: "medium",
        transactions: {
            entryId: 456,
            caseDescription: "Linked to phishing campaign",
            txList: ["0xTX10...", "0xTX11..."],
        },
    },
];

const Monitoring: React.FC = () => {
    const [rows, setRows] = useState<Row[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Placeholder: replace this with a real API call when ready.
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Example:
            // const resp = await fetch("/api/monitoring");
            // const json: Row[] = await resp.json();
            // setRows(json);

            // Demo delay to simulate network request (remove in production)
            await new Promise((r) => setTimeout(r, 600));
            // For now we just keep initialData (or merge with it)
            setRows(initialData);
        } catch (e: any) {
            setError(e?.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Uncomment fetchData() when you have an API endpoint to call
        // fetchData();
    }, []);

    return (
        <section className="content-section monitoring">
            <div className="monitoring-header">
                <h2>Monitoring</h2>
                <button
                    className="btn-refresh"
                    onClick={() => {
                        // when API is ready just call fetchData()
                        fetchData();
                    }}
                    aria-label="Refresh monitoring data"
                >
                    Refresh
                </button>
            </div>

            {loading && <div className="status">Loading...</div>}
            {error && <div className="status error">Error: {error}</div>}

            <div className="table-wrapper" role="region" aria-label="Monitored addresses table">
                <table className="monitoring-table">
                    <thead>
                    <tr>
                        <th>Address</th>
                        <th>Risk level</th>
                        <th>Transactions list (TXs associated with a committed crime)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((r) => (
                        <tr key={r.address}>
                            <td className="addr-cell">
                                <div className="address">{r.address}</div>
                            </td>
                            <td>
                                <span className={`risk-pill risk-${r.risk}`}>{r.risk}</span>
                            </td>
                            <td>
                                {r.transactions ? (
                                    <div className="tx-card">
                                        <div className="tx-entry">{"{ "}</div>
                                        <div className="tx-field">
                                            <strong>entryId:</strong> {r.transactions.entryId}
                                        </div>
                                        <div className="tx-field">
                                            <strong>CaseDescription:</strong> {r.transactions.caseDescription}
                                        </div>
                                        <div className="tx-field">
                                            <strong>TXList:</strong>
                                            <ul className="tx-list">
                                                {r.transactions.txList.map((t, i) => (
                                                    <li key={i}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="tx-entry">{"}"}</div>
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

export default Monitoring;
