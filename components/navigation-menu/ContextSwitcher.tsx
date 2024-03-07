import {
  CSSProperties,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ContextSwitcher.module.css";
import contextStyles from "../layouts/ContextColors.module.css";
import { Context, useAppContext } from "@/contexts/AppContext";

type ContextSwitcherProps = {};

export const contexts: Context[] = ["family", "hobby", "work"];

const moveSlider = (
  setHighlighterStyle: (style: CSSProperties) => void,
  contextRef: MutableRefObject<HTMLDivElement[]>,
  context?: Context
) => {
  const activeIndex = contexts.findIndex((c) => c === context);
  const activeElement = contextRef.current[activeIndex];

  if (activeElement) {
    const { offsetWidth: width, offsetLeft: left } = activeElement;
    const innerOffset = contextRef.current[0].offsetLeft + 2;
    setHighlighterStyle({
      width: `${width + innerOffset * 2}px`,
      transform: `translateX(${left - innerOffset}px)`,
      backgroundColor: `var(--${context}-color-main)`,
    });
  }
};

const ContextSwitcher: FC<ContextSwitcherProps> = (props) => {
  const [highlighterStyle, setHighlighterStyle] = useState({});
  const { context, setContext } = useAppContext();
  const contextRef = useRef<HTMLDivElement[]>([]);

  useEffect(
    () => moveSlider(setHighlighterStyle, contextRef, context),
    [context]
  );

  useEffect(() => {
    const listener = () => moveSlider(setHighlighterStyle, contextRef, context);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [context]);

  return (
    <div
      className={`${contextStyles[`${context}ColorScheme`]} ${
        styles.contextSwitcherContainer
      }`}
    >
      <div className={styles.title}>Switch Context:</div>
      <button className={styles.switcher}>
        <div className={styles.highlighter} style={highlighterStyle} />
        {contexts.map((val, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) contextRef.current[idx] = el;
            }}
            className={`${styles.context} ${
              val === context ? styles.isActive : ""
            }`}
            style={
              {
                "--context-color": `var(--${val}-color-text-secondary)`,
                "--context-color-hover": `var(--${val}-color-btn)`,
              } as CSSProperties
            }
            onClick={() => setContext(val)}
          >
            {val}
          </div>
        ))}
      </button>
    </div>
  );
};

export default ContextSwitcher;
