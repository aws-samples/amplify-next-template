import styles from "./quote-result.module.css";
import React, { useEffect, useRef, useState } from "react";
import {
  vehicleWebResultCoverages,
  vehicleWebResultCoverageTags,
} from "../../services/LocalSettings";
import { Box, Modal, TextField } from "@mui/material";
import imgZurich from "../../images/zurich-web.png";
import imgInfo from "../../images/info.png";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";

const QuoteResult = ({ data }) => {
  const [estadoActual, setEstadoActual] = useState(null);
  const [selectedTag, setSelectedTag] = useState(0);
  const [formValido, setFormValido] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);
  const [formResultado, setFormResultado] = useState({
    nombre: "",
    email: "",
    validaciones: {},
  });

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    checkFormValido();
    // eslint-disable-next-line
  }, [formResultado]);

  useEffect(() => {
    if (selectedTag > 0) setIsOpen(true);
  }, [selectedTag]);

  function checkFormValido() {
    setFormValido(
      formResultado.nombre &&
        !formResultado.validaciones.nombre &&
        formResultado.email &&
        !formResultado.validaciones.email
    );
  }

  const handleTagInfoClick = (event) => {
    var tagId = event.target.getAttribute("data-tag-id");
    setSelectedTag(tagId);
  };

  function handleNombreChange(event) {
    var mensaje = null;
    if (!event.target.value) mensaje = "Nombre es obligatorio";

    setFormResultado((prevForm) => ({
      ...prevForm,
      nombre: event.target.value,
      validaciones: {
        ...prevForm.validaciones,
        nombre: mensaje,
      },
    }));
  }

  function handleEmailChange(event) {
    var mensaje = null;
    if (!event.target.value) mensaje = "Email/Teléfono es obligatorio";
    else {
      var numRe = /^\d+\.?\d*$/;

      if (numRe.test(event.target.value)) {
        if (event.target.value.length > 15) return;
        if (event.target.value.length < 7) mensaje = "Email/Teléfono inválido";
      } else {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(event.target.value)) mensaje = "Email/Teléfono inválido";
      }
    }

    setFormResultado((prevForm) => ({
      ...prevForm,
      email: event.target.value,
      validaciones: {
        ...prevForm.validaciones,
        email: mensaje,
      },
    }));
  }

  function onFormSubmit(event) {
    event.preventDefault();
    var packages = [];
    vehicleWebResultCoverages.forEach((cov) => {
      for (let index = 0; index < cov.items.length; index++) {
        const item = cov.items[index];
        var coverageInfo = data.desglose.find(
          (c) => c.descripcion === item.code
        );
        if (coverageInfo) {
          packages.push({
            name: coverageInfo.descripcionLarga,
            price: new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "narrowSymbol",
            }).format(coverageInfo.premio),
          });
          break;
        }
      }
    });

    var payload = {
      name: formResultado.nombre,
      email: formResultado.email,
      vehicle: data.vehiculoDescripcion + " " + data.items[0].anio,
      hasGas: data.hasGas,
      is0km: data.is0km,
      price:
        "$" +
        new Intl.NumberFormat("es-AR").format(data.items[0].valorVehiculo),
      age: data.age,
      packages: packages,
    };
    //sendMailCotizacionResultado(payload, handleEmailResponse)
    setEstadoActual("enviando");
  }

  function handleEmailResponse(result) {
    setEstadoActual(result.isError ? "error" : "ok");
  }

  let carouselElements = [];
  vehicleWebResultCoverages.forEach((cov) => {
    for (let index = 0; index < cov.items.length; index++) {
      const item = cov.items[index];
      var coverageInfo = data.desglose.find((c) => c.descripcion === item.code);
      if (coverageInfo) {
        carouselElements.push({
          code: item.code,
          name: coverageInfo.descripcionLarga,
          price: new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(coverageInfo.premio),
          tags: item.tags,
        });
        break;
      }
    }
  });

  return (
    <div className={styles.quoteResultContainer}>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="cotizacion-resultado-modal"
      >
        <Box>
          <h2>
            {selectedTag > 0 &&
              vehicleWebResultCoverageTags.find(
                (t) => t.id === parseInt(selectedTag)
              ).title}
          </h2>
          <button onClick={closeModal} className="modal-close">
            X
          </button>
          <div>
            {selectedTag > 0 && (
              <p>
                {
                  vehicleWebResultCoverageTags.find(
                    (t) => t.id === parseInt(selectedTag)
                  ).description
                }
              </p>
            )}
          </div>
        </Box>
      </Modal>
      <div style={{ marginBottom: "5px" }}>
        {/*<Image
            src={imgZurich}
            alt='Zurich'
    />*/}
      </div>
      <div className={styles.headerContainer}>
        <div>
          <h2>Te ofrecemos estas coberturas</h2>
          <div className={styles.brandDesc}>
            {data.vehiculoDescripcion}{" "}
            <span className="cotizacion-resultado-vehiculo-anio-inline">
              {data.items[0].anio}
            </span>
          </div>
        </div>
        <div className={styles.amountContainer}>
          Suma Asegurada:
          <b>
            {" "}
            $
            {new Intl.NumberFormat("es-AR").format(data.items[0].valorVehiculo)}
          </b>
        </div>
      </div>
      <p className={styles.infoLabel}>
        Los siniestros de pérdida total, robo o hurto del vehículo, se pagan a
        valor de reposición actualizado.
        <br />
        <b>Beneficio 0km:</b> Reposición del vehículo a valor de un 0km por 2
        años.
      </p>
      <p className={styles.infoLabelCell}>
        Deslizá sobre las coberturas para comparar precios y alcance de cada
        una.
      </p>
      <div>
        {data.desglose && data.desglose.length > 0 && (
          <div className={styles.resultsGrid}>
            {
              <div className={styles.carousel}>
                <Carousel
                  autoPlay={false}
                  swipe={true}
                  cycleNavigation={false}
                  interval={500}
                  duration={1000}
                  animation="slide"
                  navButtonsAlwaysVisible={false}
                  navButtonsAlwaysInvisibleisible={true}
                  onChange={(e) => {
                    setSelectedCarouselIndex(e);
                  }}
                >
                  {carouselElements.map((e, i) => (
                    <div key={i}>
                      <div className={styles.headerCell}>
                        <div className={styles.coverageDesc}>{e.name}</div>
                        <div style={{ paddingBottom: "0px" }}>
                          <span className={styles.price}>{e.price}</span> /mes
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
                <div
                  className={styles.headerCell}
                  style={{ marginTop: "15px" }}
                >
                  {vehicleWebResultCoverageTags.map((tag, tagIndex) => {
                    var tagFound = carouselElements[
                      selectedCarouselIndex
                    ].tags.find((t) => t === tag.id);
                    return (
                      <div key={tagIndex} className={styles.infoCell}>
                        <label className={styles.tagTitle}>{tag.title}</label>
                        {tagFound ? (
                          <svg
                            className={styles.check}
                            data-icon="check-circle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="32"
                            height="32"
                          >
                            <path
                              fill="currentColor"
                              d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className={styles.uncheck}
                            data-icon="times-circle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="32"
                            height="32"
                          >
                            <path
                              fill="currentColor"
                              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                            ></path>
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            }
            {
              <div className={styles.columnCoverage}>
                <div
                  className={`${styles.headerCell} ${styles.tagHeader}`}
                ></div>
                {vehicleWebResultCoverageTags.map((tag, tagIndex) => {
                  return (
                    <div key={tagIndex} className={styles.infoCell}>
                      <label className={styles.tagTitle}>{tag.title}</label>
                      {<Image src={imgInfo} className={styles.tagInfo} />}
                    </div>
                  );
                })}
              </div>
            }
            {vehicleWebResultCoverages.map((webResultCoverageGroup, index) => {
              var elementToReturn;
              webResultCoverageGroup.items.map((webResultCoverageItem) => {
                if (!elementToReturn) {
                  var coverageInfo = data.desglose.find(
                    (c) => c.descripcion === webResultCoverageItem.code
                  );
                  if (coverageInfo) {
                    elementToReturn = (
                      <div key={index} className={styles.columnCoverage}>
                        <div className={styles.headerCell}>
                          <div className={styles.coverageDesc}>
                            {coverageInfo.descripcionLarga}
                          </div>
                          <div
                            className="quote-card-price"
                            style={{ paddingBottom: "0px" }}
                          >
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "USD",
                              currencyDisplay: "narrowSymbol",
                            }).format(coverageInfo.premio)}{" "}
                            /mes
                          </div>
                        </div>
                        <div>
                          {vehicleWebResultCoverageTags.map((tag, tagIndex) => {
                            var tagFound = webResultCoverageItem.tags.find(
                              (t) => t === tag.id
                            );
                            return (
                              <div key={tagIndex} className={styles.infoCell}>
                                {tagFound ? (
                                  <svg
                                    className={styles.check}
                                    data-icon="check-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="32"
                                    height="32"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <svg
                                    className={styles.uncheck}
                                    data-icon="times-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="32"
                                    height="32"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                                    ></path>
                                  </svg>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                }
                return <></>;
              });
              return !elementToReturn ? null : elementToReturn;
            })}
          </div>
        )}
      </div>
      <div className={styles.wp}>
        <Link
          href={
            "//wa.me/5492284662477?text=Hola!%20Quiero%20conocer%20m%C3%A1s%20acerca%20del%20seguro%20para%20mi%20auto."
          }
          className="whatsapp-link"
          target="_blank"
          rel="noreferrer"
        >
          <div className="whatsapp-box">
            <div className="whatsapp-green-box">
              {/*<img src={imgWp} className="whatsapp-logo" alt='Whatsapp'/>*/}
            </div>
            <div className="whatsapp-content">
              <div>
                ¿Tenés dudas? Consultanos por <b>Whatsapp</b>
              </div>
              {/*<img src={imgArrowRight} className="arrow-icon" alt=''/>*/}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuoteResult;
