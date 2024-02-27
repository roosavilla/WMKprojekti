import React, { useRef, useEffect, useState } from "react";
import "./Etusivu.css";
import { VscSearch } from "react-icons/vsc";

const Etusivu = ({ menuOpen }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const circleContainerRef = useRef(null);

  useEffect(() => {
    const updateButtons = () => {
      const container = circleContainerRef.current;
      if (container) {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        setShowLeftButton(container.scrollLeft > 0); // Näytä vasen nappula, jos scrolli on vasemmalla
        setShowRightButton(container.scrollLeft < scrollableWidth); // Näytä oikea nappula, jos scrolli on oikealla
      }
    };
  
    // Päivitä napit myös näyttölaitteen leveyden muutoksissa
    const handleResize = () => {
      updateButtons();
    };
  
    // Lisää tapahtumankäsittelijä näytön koon muutoksille
    window.addEventListener('resize', handleResize);
  
    // Ensimmäinen päivitys
    updateButtons();
  
    // Poista tapahtumankäsittelijä kun komponentti puretaan
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollPosition]);
  

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
              style={{padding:"15px" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <VscSearch />
            </div>
          </div>
        </div>
      </div>
      <div className="reseptit-container">
        <h3>UUSIMMAT RESEPTIT</h3>
        <div className="circle-container" ref={circleContainerRef}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="circle-with-text">
              <div className="circle"></div>
              <div className="circle-text">Ruuan nimi</div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button
            onClick={scrollLeft}
            style={{ visibility: showLeftButton ? "visible" : "hidden" }}
            disabled={scrollPosition === 0}
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            style={{ visibility: showRightButton ? "visible" : "hidden" }}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Etusivu;
