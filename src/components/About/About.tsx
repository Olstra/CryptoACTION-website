import React from "react";
import "./About.sass";
import {
  projectTitle,
  projectSubtitle,
  projectDescription,
} from "./projectDescriptionText.tsx";

export const About: React.FC = () => {
  return (
    <section className="content-section">
      <h1 className="about-title">{projectTitle}</h1>
      <p className="about-subtitle">{projectSubtitle}</p>
      <br />
      <p className="about-p">{projectDescription}</p>
    </section>
  );
};
