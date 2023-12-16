"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./select-modal.module.css";
import imgCaretDown from "../../images/caret-down.png";
import Image from "next/image";
import { Box, Modal } from "@mui/material";

const SelectModal = ({
  disabled,
  modalComponent,
  open,
  onClick,
  onClose,
  placeholder,
  textField,
  value,
}) => {
  return (
    <>
      <div
        className={
          disabled
            ? `${styles.selectModalContainer} ${styles.disabled}`
            : styles.selectModalContainer
        }
        onClick={onClick}
      >
        <label
          className={
            value ? styles.input : `${styles.input} ${styles.placeholder}`
          }
        >
          {value ? value[textField].toLowerCase() : placeholder}
        </label>
        |
        <Image
          src={imgCaretDown}
          alt={placeholder}
          className={styles.imgSelect}
        />
      </div>
      <Modal
        className={styles.modalContainer}
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={onClose}
        open={open}
      >
        <Box className={styles.modalBox}>{modalComponent}</Box>
      </Modal>
    </>
  );
};

SelectModal.propTypes = {
  placeholder: PropTypes.string,
};

export default SelectModal;
