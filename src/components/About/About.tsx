import React from "react";
import styles from "./About.module.sass";
import {
  projectTitle,
  projectSubtitle,
  projectDescription,
} from "./projectDescriptionText.tsx";

export const About: React.FC = () => {
  return (
    <section className="content-section">
      <h1 className={styles.aboutTitle}>{projectTitle}</h1>
      <p className={styles.aboutSubtitle}>{projectSubtitle}</p>
      <br />
      <p className={styles.aboutParagraph}>{projectDescription}</p>
    </section>
  );
};
