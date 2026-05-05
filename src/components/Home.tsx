import React from "react";
import img from "../assets/layers_overview.png"

const Home: React.FC = () => {
    return (
        <section className="content-section">
            <h2>Layer's Overview</h2>
            <p>Overview and global-level data/visualizations go here.</p>
            <img src={img} alt="overview" className="layer-image"/>
        </section>
    );
};

export default Home;
