import React from "react";
import logo from "../assets/cryptoaction-logo.png";
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="navbar">
            <div className="container">
                <div className="brand">
                    <img src={logo} alt="Logo" className="nav-logo"/>
                    <span className="nav-title">CryptoACTION</span>
                </div>

                <nav className="nav-links">
                    <NavLink to="/" end
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Monitoring</NavLink>
                    <NavLink to="/legal"
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Legal</NavLink>
                    <NavLink to="/tracing"
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Tracing</NavLink>
                    <NavLink to="/about"
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
