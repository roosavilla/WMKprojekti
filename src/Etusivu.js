// Etusivu.js
import React, { useRef, useEffect, useState } from "react";
import "./Etusivu.css";
import { VscSearch } from "react-icons/vsc";
import { TfiFaceSad } from "react-icons/tfi";
import db_reseptit from "./db_reseptit.json";
import { useHistory } from "react-router-dom";

const Etusivu = ({ menuOpen }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  //const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const circleContainerRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const updateButtons = () => {
      const container = circleContainerRef.current;
      if (container) {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(container.scrollLeft < scrollableWidth);
      }
    };

    const handleResize = () => {
      updateButtons();
    };

    window.addEventListener("resize", handleResize);
    updateButtons();

    // Tämä suoritetaan kun komponentti purkautuu
    return () => window.removeEventListener("resize", handleResize);

    // Jos haluat, että tämä koukku suoritetaan aina kun searchPerformed muuttuu,
    // voit lisätä searchPerformed riippuvuudeksi kuten alla:
  }, [scrollPosition, searchPerformed]);

  const handleSearch = () => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    const foundRecipes = db_reseptit.reseptit.filter((recipe) => {
      const lowercaseName = recipe.nimi.toLowerCase().replace(/\s+/g, "");
      return lowercaseName.includes(lowercaseQuery);
    });

    setSearchResult(foundRecipes);
    setSearchPerformed(true);

    if (foundRecipes.length !== 0) {
      console.log(foundRecipes);
    } else {
      console.log("Ei löytynyt reseptejä");
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
      container.scrollLeft += 150;
      setScrollPosition(container.scrollLeft);
    }
  };

  const scrollLeft = () => {
    const container = circleContainerRef.current;
    if (container) {
      container.scrollLeft -= 150;
      setScrollPosition(container.scrollLeft);
    }
  };

  const showRecipe = (recipeId) => {
    console.log("painettu, id on ", recipeId);
    history.push(`/resepti/id=${recipeId}`);
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
              }}
              onBlur={(e) => {
                e.target.style.border = "none";
              }}
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
        <h3 id="etusivunnappulat">
          {searchPerformed
            ? searchResult && searchResult.length > 0
              ? `HAULLASI LÖYTYI ${searchResult.length} RESEPTI${
                  searchResult.length > 1 ? "Ä" : ""
                }`
              : "HAULLASI EI LÖYTYNYT RESEPTEJÄ"
            : "UUSIMMAT RESEPTIT"}
          <span id="etusivu-napit-vali" style={{ marginLeft: "10px" }}></span>
          <div id="etusivunappulat">
            <button
              className="nice-button"
              onClick={scrollLeft}
              style={{
                visibility: showLeftButton ? "visible" : "hidden",
              }}
            >
              {"<"}
            </button>
            <button
              className="nice-button"
              onClick={scrollRight}
              style={{
                visibility: showRightButton ? "visible" : "hidden",
              }}
            >
              {">"}
            </button>
          </div>
        </h3>
        <div className="circle-container" ref={circleContainerRef}>
          {searchPerformed && searchResult
            ? searchResult.map((recipe, index) => (
                <div key={index} className="circle-with-text">
                  <button
                    className="circle"
                    style={{
                      backgroundImage: `url(${require(`./${recipe.kuva}`)})`,
                      backgroundSize: "cover",
                    }}
                    onClick={() => showRecipe(recipe.id)}
                  ></button>
                  <div className="circle-text">{recipe.nimi}</div>
                </div>
              ))
            : db_reseptit.reseptit
                .slice(0, 6) // Valitse kuusi ensimmäistä reseptiä
                .map((recipe, index) => (
                  <div key={index} className="circle-with-text">
                    <button
                      className="circle"
                      style={{
                        backgroundImage: `url(${require(`./${recipe.kuva}`)})`,
                        backgroundSize: "cover",
                      }}
                      onClick={() => showRecipe(recipe.id)}
                    ></button>
                    <div className="circle-text">{recipe.nimi}</div>
                  </div>
                ))}

          {searchPerformed && searchResult && searchResult.length === 0 && (
            <div className="no-results">
              <p>
                {" "}
                <b>
                  <TfiFaceSad id="surunaama" />
                </b>
                Kokeile toista hakusanaa tai{" "}
                <span id="vaihdarivi">
                  tarkastele reseptejä kategorioittain.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Etusivu;

/*
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
*/
