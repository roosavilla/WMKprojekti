import React, { useState } from "react";
import "./Tietoa.css";

const Tietoa = ({menuOpen}) => {
  return (
    <div className={menuOpen ? "component-hidden":""}>
      <h1 id="tietoa-otsikko">Tietoa</h1>
      {/* Lisää haluamasi sisältö ja layout tähän */}
    </div>
  );
};

export default Tietoa;
