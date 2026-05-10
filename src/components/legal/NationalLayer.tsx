import React from "react";
import img from "../../assets/national_layer.png";

const NationalLayer: React.FC = () => {
    return (
        <section className="content-section">
            <h2>National Layer</h2>
            <p>Overview and global-level data/visualizations go here.</p>
            <img src={img} alt="National" className="layer-image"/>
        </section>
    );
};

export default NationalLayer;
