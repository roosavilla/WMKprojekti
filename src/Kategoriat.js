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

export default Kategoriat;