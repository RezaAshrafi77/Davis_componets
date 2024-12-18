import classNames from "classnames";
import styles from "./styles.module.css";
import borderSVG from "../../assets/images/border.svg";

const FieldSet = ({
  title,
  children,
  className,
  titleClassName,
  en,
  gradientBorder = true,
}) => (
  <fieldset
    className={classNames(
      styles.fieldset,
      className,
      !gradientBorder ? styles.border : ""
    )}
    role="group"
    // dir={en ? "ltr" : ""}
    aria-labelledby={title ? "fieldset-legend" : undefined}
  >
    {gradientBorder ? (
      <img
        src={borderSVG}
        className="absolute left-0 -top-3.5 min-w-full min-h-full"
      />
    ) : null}
    {title && (
      <legend
        id="fieldset-legend"
        className={classNames(
          styles.legend,
          en ? styles.enLegend : "",
          titleClassName
        )}
      >
        {title}
      </legend>
    )}
    {children}s
  </fieldset>
);

export default FieldSet;
