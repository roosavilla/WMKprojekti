import React, { useEffect, useState } from "react";
import "./Resepti.css";
import { FaRegClock } from "react-icons/fa6";
import { LuChefHat } from "react-icons/lu";
import { LuSoup } from "react-icons/lu";
import reseptitData from "./db_reseptit.json"; // Tuodaan JSON-tiedosto suoraan importilla

function Resepti() {
  const [resepti, setResepti] = useState(null);

  useEffect(() => {
    // Asetetaan ensimmäinen resepti komponentin tilaan
    setResepti(reseptitData.reseptit[0]);
  }, []);

  return (
    <div>
      {resepti && (
        <table id="reseptiruudukko">
          <thead></thead>
          <tbody>
            <tr>
              <td id="ruokanimi">
                <h1 className="ruskea">{resepti.nimi}</h1>
                <p className="ruskea">
                  <b>
                    <FaRegClock /> {resepti.aika}
                  </b>{" "}
                </p>
                <p id="kuvaus">{resepti.kuvaus}</p>
              </td>
              <td id="ruokakuva">
                {/* Käytetään suoraan polkua kuvatiedostoon */}
                <img src={require(`./${resepti.kuva}`)} alt={resepti.nimi} />
              </td>
            </tr>
            <tr>
              <td id="ruokaainekset">
                <h3 className="ruskea">Ainekset:</h3>
                <p className="ruskea">
                  <b>{resepti.annoskoko}</b>
                </p>
                <table id="ainesosaruudukko">
                  <tbody>
                    {resepti.ainesosat.map((ainesosa, index) => (
                      <tr key={index}>
                        <td>{ainesosa.maara}</td>
                        <td>{ainesosa.ainesosa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td id="ruokaohjeet">
                <h3 className="ruskea">
                  <LuChefHat /> Tee näin:
                </h3>
                <table id="ohjeruudukko">
                  <tbody>
                    {resepti.valmistusohjeet.map((ohje, index) => (
                      <tr key={index}>
                        <td>{ohje}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="ruskea">
                  <LuSoup /> Nauti!
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Resepti;
