/* eslint-disable react/prop-types */
import classNames from "classnames"
import { BiError } from "react-icons/bi"
import Label from "../Label"
import Divider from "../Divider"
import styles from "./styles.module.css"
import { Controller } from "react-hook-form"

const Select = ({
    control,
    label,
    inputClassName,
    optionClassName,
    containerClassName,
    options = [],
    required = false,
    divider = false,
    userGuide,
    educationalContent,
    questionKey,
    errors = {},
    errorMessage = "این سوال اجباری است.",
    dividerClassName,
    archive,
    errorIcon,
    onChange,
    value,
    labelClassName,
    en,
    ...props
}) => {
    const isError = errors?.[questionKey]
    const hasController = !!Controller && !!control

    const defaultOptions = [
        { label: "لطفا یک گزینه را انتخاب کنید.", value: "" },
        ...options,
    ]

    const renderSelect = ({ field }) => (
        <select
            id={questionKey}
            className={classNames(inputClassName, styles.field)}
            onChange={(e) => {
                const selectedValue =
                    e.target.value === "لطفا یک گزینه را انتخاب کنید."
                        ? undefined
                        : e.target.value
                if (field?.onChange) field.onChange(selectedValue)
                if (onChange) onChange(selectedValue)
            }}
            value={field?.value ?? value}
            ref={field?.ref}
            dir={en ? "ltr" : "rtl"}
            {...props}
        >
            {defaultOptions.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className={classNames(styles.options, optionClassName)}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }

    return (
        <div
            className={classNames(
                styles.container,
                containerClassName,
                isError ? "field-error" : ""
            )}
        >
            <Label
                className={classNames(
                    labelClassName,
                    labelDirectionStyle[divider]
                )}
                userGuide={userGuide}
                educationalContent={educationalContent}
                archive={archive ? { ...archive, questionKey } : false}
                label={label}
                required={required}
                en={en}
            />
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            {hasController ? (
                <Controller
                    control={control}
                    name={questionKey}
                    rules={{ required }}
                    render={({ field }) => renderSelect({ field })}
                />
            ) : (
                renderSelect({ field: { value, onChange, ref: null } })
            )}
            {isError && (
                <span className="error">
                    {errorIcon || <BiError className="text-xs lg:text-base" />}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default Select
