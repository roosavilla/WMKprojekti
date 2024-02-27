import React, { useState } from "react";
import "./Uutiset.css";

const Uutiset = ({ menuOpen }) => {
  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Uutiset</h1>
      <table id="uutisruudukko">
        <tbody>
          <tr>
            <td>
              <div>UUTINEN kuva</div>
            </td>
            <td>
              <div><h3 className="uutisotsikko">UUTINEN OTSIKKO</h3><p className="uutisteksti">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><h3 className="uutisotsikko">UUTINEN OTSIKKO</h3><p className="uutisteksti">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
            </td>
            <td>
              <div>UUTINEN kuva</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>UUTINEN kuva</div>
            </td>
            <td>
              <div><h3 className="uutisotsikko">UUTINEN OTSIKKO</h3><p className="uutisteksti">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Uutiset;
