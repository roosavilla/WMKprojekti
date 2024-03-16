import React, { useState, useEffect } from "react";
import "./Uutiset.css";

const Uutiset = ({ menuOpen }) => {

  useEffect(() => {
    window.scrollTo(0, 0); // Skrollaa sivu ylös, kun komponentti latautuu
  }, []); // Tyhjä riippuvuuslista varmistaa, että tämä suoritetaan vain kerran, kun komponentti latautuu
  
  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Uutiset</h1>
      <table id="uutisruudukko">
        <tbody>
          <tr>
            <td className="ruokakuva">
              <div>
                <img
                  src={require("./reseptikuvat/avokadoleipa.jpg")}
                  alt="Avokadoleipa"
                  className="img-container"
                />
              </div>
            </td>
            <td>
              <div>
                <h3 className="uutisotsikko">
                  OLETKO JO MAISTANUT KOKO MAAILMAN VILLINNYTTÄ AVOKADOLEIPÄÄ?
                </h3>
                <p className="uutisteksti">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <h3 className="uutisotsikko">
                  ONKO SINULLA JO TÄMÄ KÄTEVÄ PASTAN MITTAUSNIKSI KÄYTÖSSÄ?
                </h3>
                <p className="uutisteksti">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </td>
            <td className="ruokakuva">
              <div>
                <img
                  src={require("./raakapasta.jpg")}
                  alt="Pasta"
                  className="img-container"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="ruokakuva">
              <div><img
                  src={require("./reseptikuvat/smoothiebowl.jpeg")}
                  alt="Smoothiebowl"
                  className="img-container"
                /></div>
            </td>
            <td>
              <div>
                <h3 className="uutisotsikko">VIREYTTÄ KEVÄÄSEEN</h3>
                <p className="uutisteksti">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Uutiset;
