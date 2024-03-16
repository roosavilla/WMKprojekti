import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Etusivu from "./Etusivu";
import Kategoriat from "./Kategoriat";
import Uutiset from "./Uutiset";
import Tietoa from "./Tietoa";
import "./App.css";
import Resepti from "./Resepti";
import Otayhteytta from "./Otayhteytta";

function App() {
  // Alustetaan tila aktiiviselle kohdalle
  const [activeNavItem, setActiveNavItem] = useState(
    localStorage.getItem("activeNavItem") || "ETUSIVU"
  );
  const [menuOpen, setMenuOpen] = useState(false); // Tila hampurilaisvalikon avoimuudelle

  // Funktio aktiivisen kohdan asettamiseksi
  const setActiveItem = (itemName) => {
    setActiveNavItem(itemName);
    setMenuOpen(false); // Suljetaan hampurilaisvalikko valinnan jälkeen
    localStorage.setItem("activeNavItem", itemName);
  };

  useEffect(() => {
    // Tämä ajetaan aina kun komponentti latautuu
    setActiveItem("ETUSIVU");
  }, []);

  useEffect(() => {
    // Tarkistetaan, onko LocalStoragesta tallennettu aktiivista valintaa ja päivitetään se
    const storedActiveItem = localStorage.getItem("activeNavItem");
    if (storedActiveItem) {
      setActiveNavItem(storedActiveItem);
    }
  }, []);

  return (
    <Router basename="/WMKprojekti">
      <div className="App">
        <nav className="navigation">
          <Link
            to="/"
            className="logo-button"
            onClick={() => setActiveItem("ETUSIVU")}
          >
            <img
              src={require("./RoosanReseptitLogo.png")}
              alt="Logo"
              className="logo"
            />
          </Link>
          {/* Hampparivalikko */}
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
          </div>
          <ul className={menuOpen ? "nav-items open" : "nav-items"}>
            {/* Painikkeet */}
            <li className={activeNavItem === "ETUSIVU" ? "active" : ""}>
              <Link to="/" onClick={() => setActiveItem("ETUSIVU")}>
                ETUSIVU
              </Link>
            </li>
            <li className={activeNavItem === "KATEGORIAT" ? "active" : ""}>
              <Link
                to="/kategoriat"
                onClick={() => setActiveItem("KATEGORIAT")}
              >
                KATEGORIAT
              </Link>
            </li>
            <li className={activeNavItem === "UUTISET" ? "active" : ""}>
              <Link to="/uutiset" onClick={() => setActiveItem("UUTISET")}>
                UUTISET
              </Link>
            </li>
            <li className={activeNavItem === "TIETOA" ? "active" : ""}>
              <Link to="/tietoa" onClick={() => setActiveItem("TIETOA")}>
                TIETOA
              </Link>
            </li>
          </ul>
        </nav>
        {/* Reitit */}
        <Switch>
          <Route exact path="/">
            <Etusivu menuOpen={menuOpen} />
          </Route>
          <Route path="/kategoriat">
            <Kategoriat menuOpen={menuOpen} />
          </Route>
          <Route path="/uutiset">
            <Uutiset menuOpen={menuOpen} />
          </Route>
          <Route path="/tietoa">
            <Tietoa menuOpen={menuOpen} />
          </Route>
          <Route path="/resepti/id=:recipeId">
            <Resepti menuOpen={menuOpen} />
          </Route>
          <Route path="/otayhteytta">
            <Otayhteytta menuOpen={menuOpen} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
