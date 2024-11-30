/* eslint-disable react/prop-types */
import { useState } from "react"
import classNames from "classnames"
import Label from "../Label"
import { BsPencilSquare } from "react-icons/bs"
import { BiError } from "react-icons/bi"

const TextField = ({
    containerClassName,
    className,
    label,
    icon,
    userGuide,
    archive,
    labelClassName,
    questionKey,
    required,
    register,
    watch,
    onChange: customOnChange,
    value: customValue,
    errors,
    pattern,
    disabled = false,
    errorIcon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const isError = errors ? !!errors[questionKey] : false
    const errorMessage = errors?.[questionKey]?.message

    // Fallback to React Hook Form's `watch` and `register` if no `customValue` or `customOnChange` is provided
    const inputValue = customValue ?? watch?.(questionKey) ?? ""
    const inputOnChange = (e) => {
        if (customOnChange) {
            customOnChange(e) // Use custom onChange if provided
        } else if (register) {
            register(questionKey)?.onChange(e) // React Hook Form's onChange
        }
    }

    const inputProps = {
        className: classNames(
            "w-full outline-none bg-transparent text-gray-900",
            disabled && "cursor-not-allowed text-gray-400"
        ),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        disabled,
        value: inputValue,
        onChange: inputOnChange,
        ...props,
    }

    return (
        <div
            className={classNames(
                "flex flex-col gap-2",
                isError ? "text-red-500" : "text-gray-900",
                containerClassName
            )}
        >
            {label && (
                <Label
                    className={labelClassName}
                    userGuide={userGuide}
                    archive={
                        archive ? { ...archive, questionKey } : false
                    } /* !We need some property in 
                    the ArchiveTable and just add questionKey from here. */
                    label={label}
                    required={required}
                />
            )}

            <div
                className={classNames(
                    "flex items-center border rounded-md p-2 transition",
                    isError
                        ? "border-red-500"
                        : isFocused
                        ? "border-green-500 bg-white"
                        : "border-gray-300 hover:border-green-500",
                    disabled && "bg-gray-100 cursor-not-allowed",
                    className
                )}
            >
                {props.rows > 1 ? (
                    <textarea
                        {...inputProps}
                        {...(register
                            ? register(questionKey, { required, pattern })
                            : {})}
                        className="resize-none"
                    />
                ) : (
                    <input
                        {...inputProps}
                        {...(register
                            ? register(questionKey, { required, pattern })
                            : {})}
                    />
                )}

                {icon ? (
                    icon
                ) : (
                    <BsPencilSquare
                        className={classNames(
                            "ml-2 transition-colors",
                            isFocused
                                ? "text-green-500"
                                : "text-gray-400 group-hover:text-green-500"
                        )}
                    />
                )}
            </div>
            {isError && (
                <span className="text-error">
                    {errorIcon ? (
                        <BiError className="text-xs lg:text-base" />
                    ) : null}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default TextField
