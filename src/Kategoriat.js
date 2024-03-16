import "./Kategoriat.css";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db_reseptit from "./db_reseptit.json";

const Kategoriat = ({ menuOpen }) => {
  const history = useHistory();
  const [scrollPositions, setScrollPositions] = useState({
    aamupala: 0,
    lounas: 0,
    leivonnaiset: 0,
    valipala: 0,
  });
  const [showLeftButtons, setShowLeftButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false,
  });
  const [showRightButtons, setShowRightButtons] = useState({
    aamupala: false,
    lounas: false,
    leivonnaiset: false,
    valipala: false,
  });
  const squareContainerRefs = {
    aamupala: useRef(null),
    lounas: useRef(null),
    leivonnaiset: useRef(null),
    valipala: useRef(null),
  };

  useEffect(() => {
    const updateScrollButtons = (category) => {
      const container = squareContainerRefs[category].current;
      if (container) {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        setShowLeftButtons((prevState) => ({
          ...prevState,
          [category]: scrollPositions[category] > 0,
        }));
        setShowRightButtons((prevState) => ({
          ...prevState,
          [category]: scrollPositions[category] < scrollableWidth,
        }));
      }
    };

    Object.keys(scrollPositions).forEach((category) => {
      updateScrollButtons(category);
    });
  }, [scrollPositions]);

  const scrollRight = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft += 150;
      setScrollPositions((prevState) => ({
        ...prevState,
        [category]: container.scrollLeft,
      }));
    }
  };

  const scrollLeft = (category) => {
    const container = squareContainerRefs[category].current;
    if (container) {
      container.scrollLeft -= 150;
      setScrollPositions((prevState) => ({
        ...prevState,
        [category]: container.scrollLeft,
      }));
    }
  };

  const showRecipe = (recipeId) => {
    console.log("Painettu, id on ", recipeId);
    history.push(`/resepti/id=${recipeId}`);
  };

  const getCategoryTitle = (category) => {
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

  return (
    <div className={menuOpen ? "component-hidden" : ""}>
      <h1 id="otsikko">Kategoriat</h1>
      {Object.keys(scrollPositions).map((category, index) => (
        <div key={index} className={`${category}-container`}>
          <h3>
            {getCategoryTitle(category)}{" "}
            <span style={{ marginLeft: "5px" }}></span>
            <div id="kategoriatnappulat">
            <button
              className="nice-button"
              onClick={() => scrollLeft(category)}
              style={{
                visibility: showLeftButtons[category] ? "visible" : "hidden",
              }}
              disabled={scrollPositions[category] === 0}
            >
              {"<"}
            </button>
            <button
              className="nice-button"
              onClick={() => scrollRight(category)}
              style={{
                visibility: showRightButtons[category] ? "visible" : "hidden",
              }}
            >
              {">"}
            </button>
            </div>
          </h3>
          <div className="square-container" ref={squareContainerRefs[category]}>
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
