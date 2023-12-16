"use client";
import styles from "./autocomplete.module.css";
import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";

const Autocomplete = (props) => {
  const [position, setPosition] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState(
    props.value ? props.value[props.textField] : ""
  );
  const limitResults = props.limitResults ? props.limitResults : 50;
  const autocompleteRef = useRef(null);
  useOutsideAlerter(autocompleteRef, isShow);

  function useOutsideAlerter(ref, isShow) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target))
          setIsShow(false);
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchmove", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchmove", handleClickOutside);
      };
    }, [ref, isShow]);
  }

  useEffect(() => {
    return () => {
      let elem = document.querySelectorAll("li[class=active]")[0];
      if (elem)
        elem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
    };
  }, [position]);

  useEffect(() => {
    return () => {
      setInput("");
    };
  }, [props.items]);

  const onChange = (e) => {
    const { items } = props;
    const input = e.currentTarget.value;

    if (
      props.type &&
      props.type === "number" &&
      input &&
      !/^\d+\.?\d*$/.test(input)
    ) {
      e.preventDefault();
      return;
    }

    if (props.maxLength && input && input.length > props.maxLength) {
      e.preventDefault();
      return;
    }

    if (
      input &&
      (!props.minInputCharacters || input.length >= props.minInputCharacters)
    ) {
      const newFilteredItems = [];
      /*HACK FOR CITIES*/
      items.forEach((item) => {
        if (
          item[props.textField].indexOf(") ") >= 0 &&
          item[props.textField]
            .split(") ")[1]
            .toLowerCase()
            .startsWith(input.toLowerCase()) &&
          newFilteredItems.length < limitResults
        ) {
          newFilteredItems.push(item);
        }
      });
      /*END HACK FOR CITIES*/
      if (newFilteredItems.length < limitResults) {
        items.find(
          (item) =>
            item[props.textField].toLowerCase().indexOf(input.toLowerCase()) >
              -1 &&
            !newFilteredItems.some(
              (it) => it[props.textField] === item[props.textField]
            ) &&
            newFilteredItems.push(item) > limitResults
        );
      }
      setPosition(0);
      setFiltered(newFilteredItems);
      setIsShow(true);
    } else {
      if (!input && !props.minInputCharacters && props.items)
        setFiltered(props.items);
      else setFiltered([]);
    }
    setInput(e.currentTarget.value);
    if (props.onChange) props.onChange(e.currentTarget.value);
    if (props.onSelect) props.onSelect(null);
  };

  const onClick = (e) => {
    setPosition(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
    const item = props.items.filter(
      (i) =>
        i[props.textField].toLowerCase() ===
        e.currentTarget.innerText.toLowerCase()
    )[0];
    if (props.onSelect) props.onSelect(item);
  };

  const onKeyDown = (e) => {
    if (isShow) {
      if (e.keyCode === 9) {
        // tab key - will exit the element
        setIsShow(false);
      } else if (e.keyCode === 13) {
        // enter key
        setPosition(0);
        setIsShow(false);
        setInput(filtered[position][props.textField]);
        if (props.onSelect) props.onSelect(filtered[position]);
      } else if (position > 0 && e.keyCode === 38) {
        // up arrow
        return setPosition(position - 1);
      } else if (position < filtered.length - 1 && e.keyCode === 40) {
        // down arrow
        return setPosition(position + 1);
      }
    } else {
      if (e.keyCode === 40) {
        if (props.value) setFiltered([props.value]);
        else if (!input && !props.minInputCharacters && props.items)
          setFiltered(props.items);
        setIsShow(true);
      }
    }
  };

  const handleInputClick = () => {
    if (!props.loading) {
      if (props.value) setFiltered([props.value]);
      else if (!input && !props.minInputCharacters && props.items)
        setFiltered(props.items);
      setIsShow(!isShow);
    }
  };

  const renderAutocomplete = () => {
    if (isShow && !props.disabled) {
      return (
        <ul className={props.resultsClassName}>
          {filtered.map((item, index) => {
            let isActive;
            if (index === position) {
              isActive = true;
            }

            return (
              <li
                className={
                  isActive
                    ? `${styles.listItem} ${styles.active}`
                    : styles.listItem
                }
                key={index}
                onClick={onClick}
              >
                {item[props.textField].toLowerCase()}
              </li>
            );
          })}
          {!filtered.length && !props.minInputCharacters && (
            <li className={styles.listItem}>
              {props.noResultText.toLowerCase()}
            </li>
          )}
          {!filtered.length &&
            props.minInputCharacters &&
            input &&
            input.length >= props.minInputCharacters && (
              <li className={styles.listItem}>
                {props.noResultText.toLowerCase()}
              </li>
            )}
          {!filtered.length &&
            props.minInputCharacters &&
            (!input || input.length < props.minInputCharacters) && (
              <li className={styles.listItem}>
                {"Ingrese mínimo " +
                  props.minInputCharacters +
                  " caracteres..."}
              </li>
            )}
        </ul>
      );
    }
    return <></>;
  };
  return (
    <div ref={autocompleteRef} className="autocomplete-container">
      <TextField
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={handleInputClick}
        value={props.value ? props.value[props.textField] : input}
        className={props.className}
        label={props.loading ? props.loadingText : props.placeholder}
        disabled={props.loading || props.disabled}
        validation={props.validation}
        variant="standard"
      />
      {props.arrowImg && (
        <img src={props.arrowImg} className={props.arrowClassName} alt="" />
      )}
      {renderAutocomplete()}
    </div>
  );
};
export default Autocomplete;
