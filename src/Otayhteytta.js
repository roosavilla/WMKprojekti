import React, { useState } from "react";

import { useHistory } from "react-router-dom";

function Otayhteytta({ menuOpen }) {
  const [aiheTeksti, setAiheTeksti] = useState("");
  const [vapaaTeksti, setVapaaTeksti] = useState("");
  const [sahkoposti, setSahkoposti] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tarkista, että tekstikentät ovat täytetty
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!aiheTeksti || !vapaaTeksti || !sahkoposti) {
      alert("Täytä kaikki tekstikentät ennen lomakkeen lähettämistä!");
      return;
    }

    // Tarkista sähköpostin muoto, jos se on annettu
    if (sahkoposti && !emailRegex.test(sahkoposti)) {
      alert("Anna validi sähköpostiosoite!");
      return;
    }

    history.push(`/tietoa`);
    alert("Viesti lähetettiin onnistuneesti :)");
  };

  const handleClose = () => {
    history.push(`/tietoa`);
  };

  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h2 className="tietoa-otsikko">Ota yhteyttä -lomake</h2>
      <form className="ota-yhteytta-lomake" onSubmit={handleSubmit}>
        <label htmlFor="sahkoposti" className="tarkoitusotsikko">
          SÄHKÖPOSTISI:
        </label>
        <textarea
          id="sahkoposti"
          className="tietoa-teksti"
          rows="1"
          value={sahkoposti}
          onChange={(e) => setSahkoposti(e.target.value)}
        />
        <label htmlFor="aihe" className="tarkoitusotsikko">
          AIHE:
        </label>
        <textarea
          id="aiheTeksti"
          className="tietoa-teksti"
          rows="1"
          value={aiheTeksti}
          onChange={(e) => setAiheTeksti(e.target.value)}
        />
        <label htmlFor="vapaaTeksti" className="tarkoitusotsikko">
          VAPAA TEKSTI:
        </label>
        <textarea
          id="vapaaTeksti"
          className="tietoa-teksti"
          rows="8"
          value={vapaaTeksti}
          onChange={(e) => setVapaaTeksti(e.target.value)}
        />
        <br></br>
        <div id="lomake-buttonit">
          <button onClick={handleClose}>Peruuta</button>
          <button type="submit">Lähetä</button>
        </div>
      </form>
    </div>
  );
}

export default Otayhteytta;
