import React, { useState, useEffect } from "react";
import "./Tietoa.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

const Tietoa = ({ menuOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [aiheTeksti, setAiheTeksti] = useState("");
  const [vapaaTeksti, setVapaaTeksti] = useState("");
  const history = useHistory();

  const avaaLomake = () => {
    history.push(`/otayhteytta`)
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Skrollaa sivu ylös, kun komponentti latautuu
  }, []); // Tyhjä riippuvuuslista varmistaa, että tämä suoritetaan vain kerran, kun komponentti latautuu

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tarkista, että molemmat tekstikentät ovat täytetty
    if (!aiheTeksti || !vapaaTeksti) {
      alert("Täytä kaikki tekstikentät ennen lomakkeen lähettämistä!");
      return;
    }
    // Lähetä lomake, kun kaikki kentät on täytetty
    // Tähän voit lisätä lomakkeen lähetyskoodin
    setModalIsOpen(false);
  };

  return (
    <div className={`Tietoa-container ${menuOpen ? "component-hidden" : ""}`}>
      <h1 className="tietoa-otsikko">Tietoa</h1>
      <div className="Tietoa-content">
        <table id="tietoa-table">
          <tbody>
            <tr>
              <td className="tietoa-table-yksi">
                <IoPersonCircleOutline className="icon" />
              </td>
              <td className="tietoa-table-kaksi">
                <div>
                  <h3 className="tarkoitusotsikko">SIVUSTON TARKOITUS</h3>
                  <p className="tietoa-teksti">
                    Tämä sivusto on toteutettu Web- ja mobiilikäyttöliittymät kurssin loppuprojektina.<br></br> <br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
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
              <td className="tietoa-table-kolme">
                <FaQuestion className="icon" />
              </td>
              <td className="tietoa-table-nelja">
                <div>
                  <h3 className="tarkoitusotsikko">JÄIKÖ KYSYTTÄVÄÄ?</h3>
                  <a href="#" className="tietoa-teksti" onClick={avaaLomake}>
                    Ota yhteyttä lomakkeella
                  </a>
                  
                  <p className="tietoa-teksti"> Puhelimitse: +358 123123123</p>
                  <p className="tietoa-teksti">
                    {" "}
                    Sähköpostitse: keksittyosoite@gmail.fi
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tietoa;

/*
<Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                  >
                    <h2 className="tietoa-otsikko">Ota yhteyttä -lomake</h2>
                    <form
                      className="ota-yhteytta-lomake"
                      onSubmit={handleSubmit}
                    >
                      <label htmlFor="aihe" className="tarkoitusotsikko">
                        AIHE:
                      </label>
                      <textarea
                        id="aiheTeksti"
                        className="tietoa-teksti"
                        rows="1"
                        value={aiheTeksti}
                        onChange={(e) => setAiheTeksti(e.target.value)}
                      />
                      <br></br>
                      <label htmlFor="vapaaTeksti" className="tarkoitusotsikko">
                        VAPAA TEKSTI:
                      </label>
                      <textarea
                        id="vapaaTeksti"
                        className="tietoa-teksti"
                        rows="8"
                        value={vapaaTeksti}
                        onChange={(e) => setVapaaTeksti(e.target.value)}
                      />
                      <br></br>
                      <br></br>
                      <div id="lomake-buttonit">
                        <button onClick={closeModal}>Peruuta</button>
                        <button type="submit">Lähetä</button>
                      </div>
                    </form>
                  </Modal>
*/
