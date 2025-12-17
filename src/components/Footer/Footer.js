// src/components/Footer/Footer.js
import React from "react";
import "./footer.css";

export default function Footer({ dark }) {
  return (
    <footer className={`footer ${dark ? "dark-footer" : "light-footer"}`}>
      <span className="footer-text">Developed by Waz</span>
    </footer>
  );
}
