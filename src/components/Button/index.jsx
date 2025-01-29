/* eslint-disable react/prop-types */
import classNames from "classnames"
import { VscLoading } from "react-icons/vsc"

export const Button = ({
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

    const variatStyles = {
        outlined: "text-black bg-white border border-black",
        variant: "bg-success border border-success text-white",
        text: "p-0 shadow-none text-black",
        icon: "p-0.5",
    }

    return (
        <button
            type={type}
            title={title}
            disabled={disabled || loading || variant == "disabled"}
            className={classNames(
                "flex items-center justify-center gap-4 font-500 px-2 py-1 rounded text-2xs lg:text-xs xl:text-sm shadow-sm",
                variatStyles[variant],
                {
                    "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed":
                        disabled || loading,
                    "p-0.5": isIconOnly,
                },
                className
            )}
            {...props}
        >
            {loading ? (
                <VscLoading
                    className="text-lg animate-spin"
                    color={loadingColor}
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
