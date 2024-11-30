/* eslint-disable react/prop-types */
import classNames from "classnames"
import { BiError } from "react-icons/bi"
import useDevice from "../../hooks/useDevice"
import CheckBox from "../CheckBox"
import Divider from "../Divider"
import Label from "../Label"
import styles from "./styles.module.css"

const CheckBoxGroup = ({
    containerClassName,
    optionsContainer,
    checkBoxClassName,
    options = [],
    label,
    wrap = false,
    divider = false,
    labelClassName,
    userGuide,
    errors,
    questionKey,
    required = false,
    setValue,
    errorMessage = "این سوال اجباری است.",
    watch,
    errorIcon,
    archive,
    dividerClassName,
}) => {
    const [device] = useDevice()
    const isError = !!errors?.[questionKey]
    const selectedValues = watch?.(questionKey) || []

    const handleCheckboxChange = (value) => {
        const updatedValues = selectedValues.includes(String(value))
            ? selectedValues.filter((v) => v !== String(value))
            : [...selectedValues, String(value)]

        setValue?.(questionKey, updatedValues, { shouldValidate: true })
    }

    const renderCheckBox = (option) => (
        <CheckBox
            key={option.value}
            name={questionKey}
            value={option.value}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            className={classNames(styles.checkBox, checkBoxClassName)}
        />
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
                className={classNames(labelClassName, styles.label)}
                label={label}
                required={required}
                userGuide={userGuide}
                archive={archive ? { ...archive, questionKey } : null}
            />
            {divider && (
                <Divider
                    className={classNames(
                        dividerClassName,
                        "mx-auto my-2 block w-1/2"
                    )}
                />
            )}
            {!divider && (wrap || device !== "desktop") ? (
                options.map(renderCheckBox)
            ) : (
                <div className={classNames(optionsContainer, styles.options)}>
                    {options.map(renderCheckBox)}
                </div>
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

export default CheckBoxGroup
