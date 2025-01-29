import classNames from "classnames"
import styles from "./styles.module.css"

export const FieldSet = ({
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
                    "text-xs relative font-700 z-[1] lg:text-sm mr-6 lg:mr-8 text-[#3D0C02] rounded py-0 px-2",
                    en ? styles.enLegend : "",
                    titleClassName,
                    !gradientBorder ? "translate-y-1/2 bg-white" : ""
                )}
            >
                {title}
            </legend>
        )}
        <div
            className={classNames(
                className,
                gradientBorder
                    ? title
                        ? styles.borderImageByTitle
                        : styles.borderImage
                    : styles.border,
                "relative w-full px-3 md:px-4 py-4 lg:px-8 lg:pt-6"
            )}
        >
            {children}
        </div>
    </fieldset>
)
