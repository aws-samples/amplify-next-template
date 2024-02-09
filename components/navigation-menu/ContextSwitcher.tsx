import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./ContextSwitcher.module.css";
import { Context, useAppContext } from "./AppContext";

const contexts: {
  label: Context;
  title: string;
}[] = [
  { label: "family", title: "Family" },
  { label: "hobby", title: "Hobby" },
  { label: "work", title: "Work" },
];

function ContextSwitcher() {
  const [highlighterStyle, setHighlighterStyle] = useState({});
  const { context, setContext } = useAppContext();
  const contextRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const activeIndex = contexts.findIndex((c) => c.label == context);
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
  }, [context]);

  return (
    <div className={styles.contextSwitcherContainer}>
      <div className={styles.title}>Switch Context:</div>
      <button className={styles.switcher}>
        <div className={styles.highlighter} style={highlighterStyle} />
        {contexts.map(({ label, title }, idx) => (
          <div
            key={label}
            ref={(el) => {
              if (el) contextRef.current[idx] = el;
            }}
            className={`${styles.context} ${
              context == label ? styles.isActive : ""
            }`}
            style={
              {
                "--context-color": `var(--${label}-color-text-secondary)`,
                "--context-color-hover": `var(--${label}-color-btn)`,
              } as CSSProperties
            }
            onClick={() => setContext(label)}
          >
            {title}
          </div>
        ))}
      </button>
    </div>
  );
}

export default ContextSwitcher;
