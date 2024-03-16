import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Etusivu from "./Etusivu";
import Kategoriat from "./Kategoriat";
import Uutiset from "./Uutiset";
import Tietoa from "./Tietoa";
import "./App.css";
import Resepti from "./Resepti";
import Otayhteytta from "./Otayhteytta";

function App() {
  const [activeNavItem, setActiveNavItem] = useState(
    localStorage.getItem("activeNavItem") || "ETUSIVU"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const setActiveItem = (itemName) => {
    setActiveNavItem(itemName);
    setMenuOpen(false);
    localStorage.setItem("activeNavItem", itemName);
  };

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeNavItem");
    if (storedActiveItem) {
      setActiveNavItem(storedActiveItem);
    } else {
      setActiveNavItem("ETUSIVU");
      localStorage.setItem("activeNavItem", "ETUSIVU");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navigation">
          <Link to="/" className="logo-button" onClick={() => setActiveItem("ETUSIVU")}>
            <img src={require("./RoosanReseptitLogo.png")} alt="Logo" className="logo" />
          </Link>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
            <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
          </div>
          <ul className={menuOpen ? "nav-items open" : "nav-items"}>
            <li className={activeNavItem === "ETUSIVU" ? "active" : ""}>
              <Link to="/etusivu" onClick={() => setActiveItem("ETUSIVU")}>
                ETUSIVU
              </Link>
            </li>
            <li className={activeNavItem === "KATEGORIAT" ? "active" : ""}>
              <Link to="/kategoriat" onClick={() => setActiveItem("KATEGORIAT")}>
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
        <Switch>
          <Route exact path={["/", "/etusivu", "/WMKprojekti"]}>
            <Redirect to="/etusivu" />
          </Route>
          <Route exact path="/etusivu">
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

