import React, { useRef, useEffect, useState } from "react";
import "./Etusivu.css";
import { VscSearch } from "react-icons/vsc";
import db_reseptit from "./db_reseptit.json";

const Etusivu = ({ menuOpen }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null); // Tilamuuttuja hakutulokselle
  const [searchPerformed, setSearchPerformed] = useState(false); // Tilamuuttuja, joka kertoo, onko haku suoritettu

  const circleContainerRef = useRef(null);

  useEffect(() => {
    const updateButtons = () => {
      const container = circleContainerRef.current;
      if (container) {
        const scrollableWidth =
          container.scrollWidth - container.clientWidth;
        setShowLeftButton(container.scrollLeft > 0); // Näytä vasen nappula, jos scrolli on vasemmalla
        setShowRightButton(container.scrollLeft < scrollableWidth); // Näytä oikea nappula, jos scrolli on oikealla
      }
    };

    // Päivitä napit myös näyttölaitteen leveyden muutoksissa
    const handleResize = () => {
      updateButtons();
    };

    // Lisää tapahtumankäsittelijä näytön koon muutoksille
    window.addEventListener("resize", handleResize);

    // Ensimmäinen päivitys
    updateButtons();

    // Poista tapahtumankäsittelijä kun komponentti puretaan
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollPosition]);

  const handleSearch = () => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();

    // Suodatetaan reseptit hakusanan perusteella
    const foundRecipes = db_reseptit.reseptit.filter((recipe) => {
      const lowercaseName = recipe.nimi.toLowerCase().replace(/\s+/g, "");
      return lowercaseName.includes(lowercaseQuery);
    });

    // Aseta hakutulos tilaan
    setSearchResult(foundRecipes);

    // Aseta tila hakutuloksen perusteella
    setSearchPerformed(true);

    if (foundRecipes.length !== 0) {
      console.log(foundRecipes); // Tulosta löytyneet reseptit konsoliin
    } else {
      console.log("Ei löytynyt reseptejä");
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Aseta hakutulos nulliksi ja tila, että haku on suoritettu, kun käyttäjä muuttaa hakusanaa
    setSearchResult(null);
    setSearchPerformed(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const scrollRight = () => {
    const container = circleContainerRef.current;
    if (container) {
      container.scrollLeft += 100;
      setScrollPosition(container.scrollLeft);
    }
  };

  const scrollLeft = () => {
    const container = circleContainerRef.current;
    if (container) {
      container.scrollLeft -= 100;
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <div className={menuOpen ? "component-hidden" : "container"}>
      <div className="container">
        <img
          src={require("./muffini.jpg")}
          alt="Muffini"
          className="img-container"
        />
        <div className="absolute-content">
          <h1 id="etusivu">Reseptit</h1>
        </div>
        <div className="text-container">
          <div className="text">
            <h2>
              Roosan reseptit sivusto tarjoaa Roosan lempireseptit kaikkien
              näkyville! Käytä alla olevaa hakutoimintoa tai ylläolevaa
              kategoriat-valikkoa löytääksesi reseptejä. Herkullisia hetkiä!
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Hae reseptejä"
              style={{
                padding: "15px",
                outline: "none",
              }}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={(e) => {
                e.target.style.border = "2px solid rgba(110, 73, 47, 1)";
              }} // Kun input-kenttä saa fokuksen, muutetaan reunus ruskeaksi
              onBlur={(e) => {
                e.target.style.border = "none";
              }} // Kun input-kenttä menettää fokuksen
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            >
              <VscSearch />
            </div>
          </div>
        </div>
      </div>
      <div className="reseptit-container">
        <h3>
          {searchPerformed
            ? searchResult && searchResult.length > 0
              ? `HAULLASI LÖYTYI ${searchResult.length} RESEPTI${
                  searchResult.length > 1 ? "Ä" : ""
                }`
              : "HAULLASI EI LÖYTYNYT RESEPTEJÄ"
            : "UUSIMMAT RESEPTIT"}
        </h3>
        <div className="circle-container" ref={circleContainerRef}>
          {searchPerformed && searchResult ? (
            searchResult.map((recipe, index) => (
              <div key={index} className="circle-with-text">
                <div
                  className="circle"
                  style={{
                    backgroundImage: `url(${require(`./${recipe.kuva}`)})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="circle-text">{recipe.nimi}</div>
              </div>
            ))
          ) : (
            [...Array(6)].map((_, index) => (
              <div key={index} className="circle-with-text">
                <div className="circle"></div>
                <div className="circle-text">Ruuan nimi</div>
              </div>
            ))
          )}
        </div>
        <div className="scroll-buttons">
          {searchPerformed ? null : (
            <>
              <button
                onClick={scrollLeft}
                style={{
                  visibility: showLeftButton ? "visible" : "hidden",
                }}
                disabled={scrollPosition === 0}
              >
                {"<"}
              </button>
              <button
                onClick={scrollRight}
                style={{
                  visibility: showRightButton ? "visible" : "hidden",
                }}
              >
                {">"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Etusivu;

