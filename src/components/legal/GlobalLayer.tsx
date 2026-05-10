import React from "react";
import img from "../../assets/global_layer.png";

const GlobalLayer: React.FC = () => {
    return (
        <section className="content-section">
            <h2>Global Layer</h2>
            <p>Overview and global-level data/visualizations go here.</p>
                <img src={img} alt="Global" className="layer-image"/>
        </section>
    );
};

export default GlobalLayer;
