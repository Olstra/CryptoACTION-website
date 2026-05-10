import React from "react";
import img from "../../assets/layers_overview.png"
import GlobalLayer from "./GlobalLayer.tsx";
import NationalLayer from "./NationalLayer.tsx";
import EULayer from "./EULayer.tsx";

const Legal: React.FC = () => {
    return (
        <section className="content-section">
            <h2>LEGAL</h2>
            <img src={img} alt="overview" className="layer-image"/>
            <NationalLayer/>
            <EULayer/>
            <GlobalLayer/>
        </section>
    );
};

export default Legal;
