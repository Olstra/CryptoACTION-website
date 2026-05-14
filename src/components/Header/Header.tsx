import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/cryptoaction-logo.png";
import "./Header.sass";

const makeClass = (isActive: boolean) =>
  `switch ${isActive ? "activeTab" : ""}`;

const tabs = [
  { id: "tabOne", label: "Monitoring", path: "/" },
  { id: "tabTwo", label: "Legal", path: "/legal" },
  { id: "tabThree", label: "Tracing", path: "/tracing" },
  { id: "tabFour", label: "About", path: "/about" },
];

export const Header: React.FC = () => {
  return (
    <header className="site-header" role="banner">
      <div className="brand">
        <img src={logo} alt="CryptoACTION logo" className="nav-logo" />
        <span className="nav-title">CryptoACTION</span>
      </div>

      <div className="wrapper header-tabs">
        <ul className="tabs group" role="tablist" aria-label="Main tabs">
          {tabs.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.path}
                end={t.path === "/"}
                className={({ isActive }) => makeClass(isActive)}
                role="tab"
                id={`btn-${t.id}`}
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
