import React from "react";
import eu_layer_img from "../../assets/eu_layer.png";
import pre_mica_img from "../../assets/pre_mica.png";
import mica_img from "../../assets/mica_casps.png";

const EULayer: React.FC = () => {
    return (
        <section className="content-section">
            <h2>EU Layer</h2>
            <p>Overview and global-level data/visualizations go here.</p>
            <img src={eu_layer_img} alt="EU" className="layer-image"/>
            <img src={pre_mica_img} alt="EU" className="layer-image"/>
            <img src={mica_img} alt="EU" className="layer-image"/>
        </section>
    );
};

export default EULayer;
