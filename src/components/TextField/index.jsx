/* eslint-disable react/prop-types */
import { useState } from "react"
import classNames from "classnames"
import Label from "../Label"
import { BiError } from "react-icons/bi"
import styles from "./styles.module.css"
import Divider from "../Divider"
import NoteIcon from "../../assets/icons/note.svg"

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
    divider,
    dividerClassName,
    en,
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
            styles.input,
            "w-full outline-none bg-transparent",
            disabled && "cursor-not-allowed"
        ),

        disabled,
        value: inputValue,
        onChange: inputOnChange,
        ...props,
    }

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }

    return (
        <div
            className={classNames(
                isError ? "field-error" : "",
                styles.container,
                containerClassName
            )}
        >
            {label && (
                <Label
                    className={classNames(
                        labelClassName,
                        labelDirectionStyle[divider]
                    )}
                    userGuide={userGuide}
                    archive={archive ? { ...archive, questionKey } : false}
                    label={label}
                    required={required}
                    en={en}
                />
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            <div
                className={classNames(
                    isFocused
                        ? "border-green !bg-white"
                        : "hover:border-green border-black",
                    className,
                    "group",
                    styles.field,
                    disabled ? styles.disabled : null
                )}
            >
                {props.rows > 1 ? (
                    <textarea
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...inputProps}
                        {...(register
                            ? register(questionKey, { required, pattern })
                            : {})}
                    />
                ) : (
                    <input
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...inputProps}
                        {...(register
                            ? register(questionKey, { required, pattern })
                            : {})}
                    />
                )}

                {!props.rows ? (
                    icon ? (
                        <div className={styles.icon}>{icon}</div>
                    ) : (
                        <div className={styles.icon}>
                            <img src={NoteIcon} alt="" />
                        </div>
                    )
                ) : null}
                {props.rows && icon ? icon : null}
            </div>
            {isError && (
                <span className="text-error">
                    {errorIcon ? (
                        errorIcon
                    ) : (
                        <BiError className="text-xs lg:text-base" />
                    )}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default TextField
