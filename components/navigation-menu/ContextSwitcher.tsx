import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./ContextSwitcher.module.css";

export type Context = "family" | "hobby" | "work";

type ContextSwitcherProps = {
  switchContext: (context: Context) => void;
  activeContext: Context;
};

const contexts: {
  label: Context;
  title: string;
}[] = [
  { label: "family", title: "Family" },
  { label: "hobby", title: "Hobby" },
  { label: "work", title: "Work" },
];

function ContextSwitcher({
  switchContext,
  activeContext,
}: ContextSwitcherProps) {
  const [highlighterStyle, setHighlighterStyle] = useState({});
  const contextRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const activeIndex = contexts.findIndex((c) => c.label == activeContext);
    const activeElement = contextRef.current[activeIndex];

    if (activeElement) {
      const { offsetWidth: width, offsetLeft: left } = activeElement;
      const innerOffset = contextRef.current[0].offsetLeft + 2;
      setHighlighterStyle({
        width: `${width + innerOffset * 2}px`,
        transform: `translateX(${left - innerOffset}px)`,
        backgroundColor: `var(--${activeContext}-color-main)`,
      });
    }
  }, [activeContext]);

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
              activeContext == label ? styles.isActive : ""
            }`}
            style={
              {
                "--context-color": `var(--${label}-color-text-secondary)`,
                "--context-color-hover": `var(--${label}-color-btn)`,
              } as CSSProperties
            }
            onClick={() => switchContext(label)}
          >
            {title}
          </div>
        ))}
      </button>
    </div>
  );
}

export default ContextSwitcher;
