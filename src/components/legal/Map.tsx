import React, {useEffect, useRef, useState} from "react";
import "./Map.css";

import nationalImg from "../../assets/national_layer.png";
import eu_img from "../../assets/eu_layer.png";
import global_img from "../../assets/global_layer.png";

const IMAGES: Record<string, string> = {
    national: nationalImg,
    eu: eu_img,
    global: global_img,
};

const Map: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"national" | "eu" | "global">("national");
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleDocClick(e: MouseEvent) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("click", handleDocClick);
        return () => document.removeEventListener("click", handleDocClick);
    }, []);

    return (
        <section className="content-section map-section">
            <h2>MAP</h2>

            <div ref={rootRef} className="dropdown">
                <button
                    type="button"
                    className="dropbtn"
                    onClick={() => setOpen((s) => !s)}
                    aria-haspopup="true"
                    aria-expanded={open}
                >
                    {mode} ▾
                </button>

                <div id="myDropdown" className={`dropdown-content${open ? " show" : ""}`}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("national");
                            setOpen(false);
                        }}
                    >
                        National
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("eu");
                            setOpen(false);
                        }}
                    >
                        EU
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("global");
                            setOpen(false);
                        }}
                    >
                        Global
                    </a>
                </div>
            </div>

            <div>
                <img
                    src={IMAGES[mode]}
                    alt={mode}
                    style={{ maxWidth: "100%", height: "auto", borderRadius: 8, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
                />
            </div>
        </section>
    );
};

export default Map;
