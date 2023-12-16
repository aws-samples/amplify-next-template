"use client";
import styles from "./select-brand.module.css";
import imgVolkswagen from "../../images/volkswagen.png";
import imgRenault from "../../images/renault.png";
import imgChevrolet from "../../images/chevrolet.png";
import imgFiat from "../../images/fiat.png";
import imgToyota from "../../images/toyota.png";
import imgCitroen from "../../images/citroen.png";
import imgFord from "../../images/ford.png";
import imgPeugeot from "../../images/peugeot.png";
import imgHonda from "../../images/honda.png";
import Image from "next/image";
import { TextField } from "@mui/material";
import { use, useState } from "react";

const SelectBrand = ({ brands, textField, onBrandSelect, onClose }) => {
  const popularBrandsArray = [46, 36, 12, 17, 45, 11, 18, 32, 19];
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState(brands);
  const onChange = (e) => {
    const input = e.currentTarget.value;

    if (input && input.length > 50) {
      e.preventDefault();
      return;
    }

    if (!input) setFiltered(brands);

    if (input) {
      const newFilteredItems = [];
      brands.find(
        (item) =>
          item[textField].toLowerCase().indexOf(input.toLowerCase()) > -1 &&
          newFilteredItems.push(item) > 5
      );
      setFiltered(newFilteredItems);
    }

    setInput(input);
  };

  return (
    <div className={styles.selectBrandContainer}>
      <button className={styles.btnClose} onClick={onClose} type="button">
        <span aria-hidden="true">×</span>
      </button>
      <TextField
        className={styles.inputSearch}
        label="Buscar"
        onChange={onChange}
        value={input}
        variant="standard"
      />
      <div className={styles.scrollableBox}>
        <h4 className={styles.labelModal}>Marcas populares</h4>
        <div className={styles.popularBrandsContainer}>
          {filtered?.some((b) => b.id === 46) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 46)[0]);
              }}
            >
              <Image
                src={imgVolkswagen}
                className={styles.popularBrandImage}
                alt="Volkswagen"
              />
              <span>Volkswagen</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 36) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 36)[0]);
              }}
            >
              <Image
                src={imgRenault}
                className={styles.popularBrandImage}
                alt="Renault"
              />
              <span>Renault</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 12) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 12)[0]);
              }}
            >
              <Image
                src={imgChevrolet}
                className={styles.popularBrandImage}
                alt="Chevrolet"
              />
              <span>Chevrolet</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 17) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 17)[0]);
              }}
            >
              <Image
                src={imgFiat}
                className={styles.popularBrandImage}
                alt="Fiat"
              />
              <span>Fiat</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 45) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 45)[0]);
              }}
            >
              <Image
                src={imgToyota}
                className={styles.popularBrandImage}
                alt="Toyota"
              />
              <span>Toyota</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 11) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 11)[0]);
              }}
            >
              <Image
                src={imgCitroen}
                className={styles.popularBrandImage}
                alt="Citroën"
              />
              <span>Citroën</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 18) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 18)[0]);
              }}
            >
              <Image
                src={imgFord}
                className={styles.popularBrandImage}
                alt="Ford"
              />
              <span>Ford</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 32) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 32)[0]);
              }}
            >
              <Image
                src={imgPeugeot}
                className={styles.popularBrandImage}
                alt="Peugeot"
              />
              <span>Peugeot</span>
            </div>
          )}
          {filtered?.some((b) => b.id === 19) && (
            <div
              className={styles.popularBrandBox}
              onClick={() => {
                onBrandSelect(brands.filter((i) => i.id === 19)[0]);
              }}
            >
              <Image
                src={imgHonda}
                className={styles.popularBrandImage}
                alt="Honda"
              />
              <span>Honda</span>
            </div>
          )}
        </div>
        <h4 className={styles.labelModal}>Otras marcas</h4>
        <div className={styles.brandsContainer}>
          {(!filtered || filtered?.length === 0) && (
            <label className={styles.noResults}>
              Lo sentimos, no encontramos lo que buscas...
            </label>
          )}
          {filtered?.map((b, i) => {
            if (popularBrandsArray.indexOf(b.id) < 0) {
              return (
                <div
                  key={"brand" + i}
                  className={styles.brandBox}
                  onClick={() => {
                    onBrandSelect(brands.filter((i) => i.id === b.id)[0]);
                  }}
                >
                  {b[textField]}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectBrand;
