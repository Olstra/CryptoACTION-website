import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <p>© {new Date().getFullYear()} UZH, Blockchain Center, CryptoACTION</p>
            </div>
        </footer>
    );
};

export default Footer;
