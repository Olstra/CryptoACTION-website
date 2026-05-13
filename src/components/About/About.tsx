import React from "react";
import {projectTitle, projectSubtitle, projectDescription} from "./projectDescriptionText.tsx";

export const About: React.FC = () => {
    return (
        <section className="content-section">
            <h1>{projectTitle}</h1>
            <p>{projectSubtitle}</p>
            <br/>
            <p>{projectDescription}</p>
        </section>
    );
};
