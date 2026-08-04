import React from "react";
import styles from "./About.module.sass";
import {
  projectTitle,
  projectSubtitle,
  projectBackground,
  projectObjectives,
} from "./projectDescriptionText.tsx";

export const About: React.FC = () => {
  return (
    <section className="content-section">
      <h1 className={styles.aboutTitle}>{projectTitle}</h1>
      <p className={styles.aboutSubtitle}>{projectSubtitle}</p>

      <div className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>Background</h2>
        {projectBackground.map((paragraph, index) => (
          <p key={index} className={styles.aboutParagraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>Objectives</h2>
        <div className={styles.objectivesGrid}>
          {projectObjectives.map((obj) => (
            <div key={obj.code} className={styles.objectiveCard}>
              <span className={styles.objectiveCode}>{obj.code}</span>
              <div>
                <h3 className={styles.objectiveTitle}>{obj.title}</h3>
                <p className={styles.objectiveDesc}>{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
