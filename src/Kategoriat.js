import "./Kategoriat.css";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db_reseptit from "./db_reseptit.json";
const Kategoriat = ({ menuOpen }) => {
  const [scrollPositions, setScrollPositions] = useState({
    aamupala: 0,
    lounas: 0,
    leivonnaiset: 0,
    valipala: 0,
  });
  const squareContainerRefs = {
    aamupala: useRef(null),
    lounas: useRef(null),
    leivonnaiset: useRef(null),
    valipala: useRef(null),
  };
  const history = useHistory();
  const activeContainerRef = useRef(null);
  const containerStartScrollLeft = useRef(0);
  const containerStartTouchX = useRef(0);
  const containerStartMouseX = useRef(0);
  const scrollStepFactor = 1; // Adjust this factor as needed
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Skrollaa sivu ylös, kun komponentti latautuu
  }, []); // Tyhjä riippuvuuslista varmistaa, että tämä suoritetaan vain kerran, kun komponentti latautuu

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(false);
        console.log("mobiililaite");
      } else {
        setIsMobile(true);
        console.log("tietokone");
      }
    };

    // Kutsutaan kerran alussa ja lisätään tapahtumakuuntelija näyttöleveyden muutoksille
    handleResize();
    window.addEventListener("resize", handleResize);

    // Poistetaan tapahtumakuuntelija komponentin purkautuessa
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Tyhjä taulukko varmistaa, että useEffect suoritetaan vain kerran

  useEffect(() => {
    const updateButtons = () => {
      Object.keys(squareContainerRefs).forEach((category) => {
        const container = squareContainerRefs[category].current;
        if (container) {
          const scrollableWidth = container.scrollWidth - container.clientWidth;

          // Siirrä tilan päivitys tästä pois
          // setScrollPositions((prevState) => ({
          //   ...prevState,
          //   [category]: container.scrollLeft,
          // }));

          // Tarkista, jos scrollaus on äärirajoilla ja päivitä nappejen näkyvyys sen mukaan
          setShowLeftButton((prev) => ({
            ...prev,
            [category]: container.scrollLeft > 0,
          }));
          setShowRightButton((prev) => ({
            ...prev,
            [category]: container.scrollLeft < scrollableWidth,
          }));
        }
      });
    };

    const handleResize = () => {
      updateButtons();
    };

    window.addEventListener("resize", handleResize);
    updateButtons();

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Tyhjä riippuvuuslista, jotta tämä useEffect suoritetaan vain kerran alussa

  const handleTouchStart = (event, category) => {
    const touch = event.touches[0];
    containerStartTouchX.current = touch.clientX;
    containerStartScrollLeft.current =
      squareContainerRefs[category].current.scrollLeft;
    activeContainerRef.current = category;
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const touchDeltaX = touch.clientX - containerStartTouchX.current;
    const containerDeltaX = touchDeltaX * scrollStepFactor;
    const newScrollLeft = containerStartScrollLeft.current - containerDeltaX;

    // Tarkistetaan, ettei uusi sijainti mene containerin ulkopuolelle
    const containerWidth =
      squareContainerRefs[activeContainerRef.current].current.clientWidth;
    const maxScrollLeft =
      squareContainerRefs[activeContainerRef.current].current.scrollWidth -
      containerWidth;
    if (newScrollLeft >= 0 && newScrollLeft <= maxScrollLeft) {
      squareContainerRefs[activeContainerRef.current].current.scrollLeft =
        newScrollLeft;
      setScrollPositions((prevState) => ({
        ...prevState,
        [activeContainerRef.current]: newScrollLeft,
      }));
    }
  };

  const handleTouchEnd = () => {
    containerStartTouchX.current = null;
    activeContainerRef.current = null;
  };

  const handleMouseDown = (event, category) => {
    containerStartMouseX.current = event.clientX;
    containerStartScrollLeft.current =
      squareContainerRefs[category].current.scrollLeft;
    activeContainerRef.current = category;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const mouseDeltaX = event.clientX - containerStartMouseX.current;
    const containerDeltaX = mouseDeltaX * scrollStepFactor;
    const newScrollLeft = containerStartScrollLeft.current - containerDeltaX;

    // Tarkistetaan, ettei uusi sijainti mene containerin ulkopuolelle
    const containerWidth =
      squareContainerRefs[activeContainerRef.current].current.clientWidth;
    const maxScrollLeft =
      squareContainerRefs[activeContainerRef.current].current.scrollWidth -
      containerWidth;
    if (newScrollLeft >= 0 && newScrollLeft <= maxScrollLeft) {
      squareContainerRefs[activeContainerRef.current].current.scrollLeft =
        newScrollLeft;
      setScrollPositions((prevState) => ({
        ...prevState,
        [activeContainerRef.current]: newScrollLeft,
      }));
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    activeContainerRef.current = null;
  };

  const showRecipe = (recipeId) => {
    history.push(`/resepti/id=${recipeId}`);
  };

  const getCategoryTitle = (category) => {
    if (category === null || category === undefined) {
      return ""; // Palautetaan tyhjä merkkijono, jos category on null tai undefined
    }
    switch (category) {
      case "aamupala":
        return "AAMUPALA JA BRUNSSI";
      case "lounas":
        return "LOUNAS JA PÄIVÄLLINEN";
      case "leivonnaiset":
        return "LEIVONNAISET JA JÄLKIRUUAT";
      case "valipala":
        return "VÄLIPALA";
      default:
        return category.toUpperCase();
    }
  };

  const scrollLeft = (category) => {
    if (squareContainerRefs[category].current) {
      const container = squareContainerRefs[category].current;
      const scrollableWidth = container.scrollWidth - container.clientWidth;
      container.scrollLeft -= 100; // Adjust scroll amount as needed
      if (container.scrollLeft === 0) {
        setShowLeftButton((prev) => ({
          ...prev,
          [category]: false,
        }));
        setShowRightButton((prev) => ({
          ...prev,
          [category]: true,
        }));
      } else {
        setShowLeftButton((prev) => ({
          ...prev,
          [category]: true,
        }));
        setShowRightButton((prev) => ({
          ...prev,
          [category]: true,
        }));
      }
    }
  };

  const scrollRight = (category) => {
    if (squareContainerRefs[category].current) {
      const container = squareContainerRefs[category].current;
      const scrollableWidth = container.scrollWidth - container.clientWidth;
      container.scrollLeft += 100; // Adjust scroll amount as needed
      if (container.scrollLeft === scrollableWidth) {
        setShowLeftButton((prev) => ({
          ...prev,
          [category]: true,
        }));
        setShowRightButton((prev) => ({
          ...prev,
          [category]: false,
        }));
      } else {
        setShowLeftButton((prev) => ({
          ...prev,
          [category]: true,
        }));
        setShowRightButton((prev) => ({
          ...prev,
          [category]: true,
        }));
      }
    }
  };

  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Kategoriat</h1>
      {Object.keys(scrollPositions).map((category, index) => (
        <div key={index} className={`${category}-container`}>
          <h3>{getCategoryTitle(category)} </h3>
          <div
            id="napitjaympyrat-etusivu"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="etusivu-nappidivi">
              <button
                className="nice-button"
                style={{
                  visibility:
                    showLeftButton[category] && isMobile ? "visible" : "hidden",
                }}
                onClick={() => scrollLeft(category)}
              >
                <b>{"<"}</b>
              </button>
            </div>
            <div
              className="square-container"
              ref={squareContainerRefs[category]}
              onTouchStart={(event) => handleTouchStart(event, category)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={(event) => handleMouseDown(event, category)}
            >
              {db_reseptit.reseptit
                .filter((recipe) => recipe.kategoria === category)
                .map((recipe, index) => (
                  <div key={index} className="square-with-text">
                    <button
                      className="square"
                      style={{
                        backgroundImage: `url(${require(`./${recipe.kuva}`)})`,
                        backgroundSize: "cover",
                      }}
                      onClick={() => showRecipe(recipe.id)}
                    ></button>
                    <div className="square-text">{recipe.nimi}</div>
                  </div>
                ))}
            </div>
            <div className="etusivu-nappidivi">
              <button
                className="nice-button"
                style={{
                  visibility:
                    showRightButton[category] && isMobile
                      ? "visible"
                      : "hidden",
                }}
                onClick={() => scrollRight(category)}
              >
                <b>{">"}</b>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kategoriat;

/* LAYOUT TOIMII, RESEPTEJÄ EI HAETA
import "./Kategoriat.css";
import "./Etusivu.css";
import React, { useRef, useEffect, useState } from "react";

const Kategoriat = ({ menuOpen }) => {
  const [scrollPositions, setScrollPositions] = useState({
    aamupala: 0,
    lounas: 0,
    leivonnaiset: 0,
    valipala: 0
  });
  const [showLeftButtons, setShowLeftButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false
  });
  const [showRightButtons, setShowRightButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false
  });
  const squareContainerRefs = {
    aamupala: useRef(null),
    lounas: useRef(null),
    leivonnaiset: useRef(null),
    valipala: useRef(null)
  };

  useEffect(() => {
    const updateScrollButtons = (category) => {
      const container = squareContainerRefs[category].current;
      if (container) {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        setShowLeftButtons(prevState => ({ ...prevState, [category]: scrollPositions[category] > 0 }));
        setShowRightButtons(prevState => ({ ...prevState, [category]: scrollPositions[category] < scrollableWidth }));
      }
    };

    Object.keys(scrollPositions).forEach(category => {
      updateScrollButtons(category);
    });
  }, [scrollPositions]);

  const scrollRight = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft += 100;
      setScrollPositions(prevState => ({ ...prevState, [category]: container.scrollLeft }));
    }
  };

  const scrollLeft = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft -= 100;
      setScrollPositions(prevState => ({ ...prevState, [category]: container.scrollLeft }));
    }
  };

  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Kategoriat</h1>
      <div className="aamupala-container">
        <h3>AAMUPALA JA BRUNSSI</h3>
        <div className="square-container" ref={squareContainerRefs.aamupala}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="square-with-text">
              <div className="square"></div>
              <div className="square-text">Ruuan nimi</div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button
            onClick={() => scrollLeft('aamupala')}
            style={{ visibility: showLeftButtons.aamupala ? "visible" : "hidden" }}
            disabled={scrollPositions.aamupala === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollRight('aamupala')}
            style={{ visibility: showRightButtons.aamupala ? "visible" : "hidden" }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="lounas-container">
        <h3>LOUNAS JA PÄIVÄLLINEN</h3>
        <div className="square-container" ref={squareContainerRefs.lounas}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="square-with-text">
              <div className="square"></div>
              <div className="square-text">Ruuan nimi</div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button
            onClick={() => scrollLeft('lounas')}
            style={{ visibility: showLeftButtons.lounas ? "visible" : "hidden" }}
            disabled={scrollPositions.lounas === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollRight('lounas')}
            style={{ visibility: showRightButtons.lounas ? "visible" : "hidden" }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="leivonnaiset-container">
        <h3>LEIVONNAISET JA JÄLKIRUUAT</h3>
        <div className="square-container" ref={squareContainerRefs.leivonnaiset}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="square-with-text">
              <div className="square"></div>
              <div className="square-text">Ruuan nimi</div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button
            onClick={() => scrollLeft('leivonnaiset')}
            style={{ visibility: showLeftButtons.leivonnaiset ? "visible" : "hidden" }}
            disabled={scrollPositions.leivonnaiset === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollRight('leivonnaiset')}
            style={{ visibility: showRightButtons.leivonnaiset ? "visible" : "hidden" }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="valipala-container">
        <h3>VÄLIPALAT</h3>
        <div className="square-container" ref={squareContainerRefs.valipala}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="square-with-text">
              <div className="square"></div>
              <div className="square-text">Ruuan nimi</div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button
            onClick={() => scrollLeft('valipala')}
            style={{ visibility: showLeftButtons.valipala ? "visible" : "hidden" }}
            disabled={scrollPositions.valipala === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollRight('valipala')}
            style={{ visibility: showRightButtons.valipala ? "visible" : "hidden" }}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

*/

/*
<div className="scroll-buttons">
            <button
              onClick={() => scrollLeft(category)}
              style={{ visibility: showLeftButtons[category] ? "visible" : "hidden" }}
              disabled={scrollPositions[category] === 0}
            >
              {"<"}
            </button>
            <button
              onClick={() => scrollRight(category)}
              style={{ visibility: showRightButtons[category] ? "visible" : "hidden" }}
            >
              {">"}
            </button>
          </div>
*/

/* RESEPTIT HAETAAN, LAYOUT EI TOIMI
import React, { useEffect, useState, useRef } from "react";
import db_reseptit from "./db_reseptit.json";
import { useHistory } from "react-router-dom";

const Kategoriat = ({ menuOpen }) => {
  const history = useHistory();
  const [recipes, setRecipes] = useState({
    aamupala: [],
    lounas: [],
    leivonnaiset: [],
    valipala: []
  });
  const [scrollPositions, setScrollPositions] = useState({
    aamupala: 0,
    lounas: 0,
    leivonnaiset: 0,
    valipala: 0
  });
  const [showLeftButtons, setShowLeftButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false
  });
  const [showRightButtons, setShowRightButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false
  });
  const squareContainerRefs = {
    aamupala: useRef(null),
    lounas: useRef(null),
    leivonnaiset: useRef(null),
    valipala: useRef(null)
  };

  useEffect(() => {
    const fetchRecipes = (category) => {
      try {
        const categoryRecipes = db_reseptit.reseptit.filter(recipe => recipe.kategoria === category);
        setRecipes(prevState => ({ ...prevState, [category]: categoryRecipes }));
        console.log(`Kaikki ${category} reseptit:`, categoryRecipes);
      } catch (error) {
        console.error('Virhe reseptien haussa:', error);
      }
    };

    Object.keys(recipes).forEach(category => fetchRecipes(category));
  }, []);

  useEffect(() => {
    const updateScrollButtons = (category) => {
      const container = squareContainerRefs[category].current;
      if (container) {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        setShowLeftButtons(prevState => ({ ...prevState, [category]: scrollPositions[category] > 0 }));
        setShowRightButtons(prevState => ({ ...prevState, [category]: scrollPositions[category] < scrollableWidth }));
      }
    };

    Object.keys(scrollPositions).forEach(category => {
      updateScrollButtons(category);
    });
  }, [scrollPositions]);

  const scrollRight = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft += 100;
      setScrollPositions(prevState => ({ ...prevState, [category]: container.scrollLeft }));
    }
  };

  const scrollLeft = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft -= 100;
      setScrollPositions(prevState => ({ ...prevState, [category]: container.scrollLeft }));
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'aamupala':
        return 'AAMIAINEN JA BRUNSSI';
      case 'lounas':
        return 'LOUNAS JA PÄIVÄLLINEN';
      case 'leivonnaiset':
        return 'LEIVONNAISET JA JÄLKIRUUAT';
      case 'valipala':
        return 'VÄLIPALAT';
      default:
        return '';
    }
  };

  const showRecipe = (recipeId) => {
    console.log("painettu, id on ", recipeId);
    history.push(`/resepti/${recipeId}`);
  };

  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Kategoriat</h1>
      {Object.keys(recipes).map((category, index) => (
        <div key={index} className={`${category}-container`}>
          <h3>{getCategoryTitle(category)}</h3>
          <div className="square-container" ref={squareContainerRefs[category]}>
            {recipes[category].map((recipe, index) => (
              <div key={index} className="square-with-text">
                <button
                  className="square"
                  style={{
                    backgroundImage: `url(${require(`./${recipe.kuva}`)})`,
                    backgroundSize: "cover"
                  }}
                  onClick={() => showRecipe(recipe.id)}
                ></button>
                <div className="square-text">{recipe.nimi}</div>
              </div>
            ))}
          </div>
          



        </div>
      ))}
    </div>
  );
};

export default Kategoriat;
*/
