import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} UZH, Blockchain Center, CryptoACTION</p>
    </footer>
  );
};
