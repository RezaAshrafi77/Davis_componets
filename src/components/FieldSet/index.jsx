import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.css"

const FieldSet = ({
    title,
    children,
    className,
    titleClassName,
    childrenClassName,
}) => (
    <fieldset
        className={classNames(styles.fieldset, className)}
        role="group"
        aria-labelledby={title ? "fieldset-legend" : undefined}
    >
        {title && (
            <legend
                id="fieldset-legend"
                className={classNames(styles.legend, titleClassName)}
            >
                {title}
            </legend>
        )}
        <div className={classNames(childrenClassName)}>{children}</div>
    </fieldset>
)

FieldSet.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
}

export default FieldSet
