import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-cryptoaction.png";
import styles from "./Header.module.sass";

const makeClass = (isActive: boolean) =>
  `${styles.switch} ${isActive ? styles.activeTab : ""}`.trim();

const tabs = [
  { id: "tabOne", label: "Monitoring", path: "/" },
  { id: "tabTwo", label: "Regulatory Landscape", path: "/legal" },
  { id: "tabThree", label: "Tracing Taxonomy", path: "/tracing" },
  { id: "tabFour", label: "About", path: "/about" },
];

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.brand}>
        <img src={logo} alt="CryptoACTION logo" className={styles.navLogo} />
        <span className={styles.navTitle}>CryptoACTION</span>
      </div>

      <div className={styles.hamburgerContainer}>
        <button className={styles.hamburger} onClick={() => setOpen((s) => !s)}>
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      <div className={`${styles.wrapper} ${open ? styles.open : ""}`}>
        <ul className={styles.tabs}>
          {tabs.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.path}
                end={t.path === "/"}
                className={({ isActive }) => makeClass(isActive)}
                id={`btn-${t.id}`}
                onClick={() => setOpen(false)}
              >
                {t.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
