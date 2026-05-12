import React from "react";
import img from "../../assets/layers_overview.png"
import Map from "./Map.tsx";

const Legal: React.FC = () => {
    return (
        <section className="content-section">
            <h2>LEGAL</h2>
            <img src={img} alt="overview" className="layer-image"/>
            <Map/>
        </section>
    );
};

export default Legal;
