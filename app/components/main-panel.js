"use client";
import styles from "./main-panel.module.css";
import Image from "next/image";
import imgHome from "../../images/perro.png";
import imgLogo from "../../images/logo.png";
import QuoterCar from "./quoter-car";
import QuoteResult from "./quote-result";
import { useState } from "react";

const MainPanel = ({ brands }) => {
  const [resultQuote, setResultQuote] = useState(null);
  return (
    <div className={styles.mainPanel}>
      <div className={styles.logoContainer}>
        <Image
          src={imgLogo}
          className={styles.logo}
          alt="PianesiChiramberro | Asesores de seguros"
        />
        <p className={styles.homeDesc}>
          Oficina Representada de Zurich en Olavarría
        </p>
      </div>
      {!resultQuote && (
        <div className={styles.quoterContainer}>
          <div className={styles.leftPanel}>
            <QuoterCar brands={brands} setResultQuote={setResultQuote} />
          </div>
          <div className={styles.rightPanel}>
            <Image
              src={imgHome}
              className={styles.imgHome}
              alt="Oficina Representada de Zurich en Olavarría"
            />
          </div>
        </div>
      )}
      {resultQuote && <QuoteResult data={resultQuote} />}
    </div>
  );
};

export default MainPanel;
