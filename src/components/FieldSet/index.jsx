import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.css"

const FieldSet = ({ title, children, className, titleClassName, en }) => (
    <fieldset
        className={classNames(styles.fieldset, className)}
        role="group"
        // dir={en ? "ltr" : ""}
        aria-labelledby={title ? "fieldset-legend" : undefined}
    >
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
        {children}
    </fieldset>
)

FieldSet.propTypes = {
    en: PropTypes.boolean,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
}

export default FieldSet
