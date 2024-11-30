/* eslint-disable react/prop-types */
import classNames from "classnames"
import { BiError } from "react-icons/bi"
import Label from "../Label"
import Divider from "../Divider"
import styles from "./styles.module.css"

const Select = ({
    Controller,
    control,
    label,
    inputClassName,
    optionClassName,
    containerClassName,
    options = [],
    required = false,
    divider = false,
    userGuide,
    questionKey,
    errors = {},
    errorMessage = "این سوال اجباری است.",
    dividerClassName,
    archive,
    errorIcon,
    onChange,
    value,
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

    return (
        <div
            className={classNames(
                styles.container,
                containerClassName,
                isError ? "field-error" : ""
            )}
        >
            <Label
                label={label}
                required={required}
                userGuide={userGuide}
                archive={archive ? { ...archive, questionKey } : null}
            />
            {divider && <Divider className={dividerClassName} />}
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
                <span className="text-error">
                    {errorIcon || <BiError className="text-xs lg:text-base" />}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default Select
