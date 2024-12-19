import classNames from "classnames";
import styles from "./styles.module.css";

const FieldSet = ({
  title,
  children,
  containerClassName,
  className,
  titleClassName,
  en,
  gradientBorder = true,
}) => (
  <fieldset
    className={classNames(
      styles.fieldset,
      containerClassName,
      !gradientBorder ? "!border-none" : ""
    )}
    role="group"
    // dir={en ? "ltr" : ""}
    aria-labelledby={title ? "fieldset-legend" : undefined}
  >
    {/* {gradientBorder ? (
      <img
        src={borderSVG}
        className="absolute left-0 -top-3.5 min-w-full min-h-full"
      />
    ) : null} */}
    {title && (
      <legend
        id="fieldset-legend"
        className={classNames(
          styles.legend,
          en ? styles.enLegend : "",
          titleClassName,
          !gradientBorder ? "top-[5px] z-1" : ""
        )}
      >
        {title}
      </legend>
    )}
    <div
      className={classNames(
        className,
        gradientBorder ? styles.borderImage : styles.border,
        styles.container
      )}
    >
      {children}
    </div>
  </fieldset>
);

export default FieldSet;
