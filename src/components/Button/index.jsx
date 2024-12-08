/* eslint-disable react/prop-types */
import PropTypes from "prop-types"
import classNames from "classnames"
import { VscLoading } from "react-icons/vsc"
import styles from "./styles.module.css"

const Button = ({
    title,
    variant = "variant",
    type = "button",
    loading = false,
    disabled = false,
    className,
    icon = null,
    loadingColor = "currentColor",
    ...props
}) => {
    const isIconOnly = icon && !title

    return (
        <button
            type={type}
            title={title}
            disabled={disabled || loading || variant == "disabled"}
            className={classNames(
                styles.button,
                styles[variant],
                {
                    [styles.disabled]: disabled || loading,
                    [styles.icon]: isIconOnly,
                },
                className
            )}
            {...props}
        >
            {loading ? (
                <VscLoading
                    className="text-lg animate-spin"
                    color={loadingColor}
                    onClick={props?.onClick() ? props?.onClick() : {}}
                />
            ) : (
                <>
                    {title && <span>{title}</span>}
                    {icon}
                </>
            )}
        </button>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    variant: PropTypes.oneOf(["variant", "text", "outlined", "disabled"]),
    type: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
    loadingColor: PropTypes.string,
}

export default Button
