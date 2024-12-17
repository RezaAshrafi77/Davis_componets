/* eslint-disable react/prop-types */
import classNames from "classnames"
import { BiError } from "react-icons/bi"
// import useDevice from "../../hooks/useDevice"
import CheckBox from "../CheckBox"
import Divider from "../Divider"
import Label from "../Label"
import styles from "./styles.module.css"
import { useEffect } from "react"

const CheckBoxGroup = ({
    containerClassName,
    optionsContainer,
    checkBoxClassName,
    options = [],
    label,
    divider = false,
    labelClassName,
    educationalContent,
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
    register,
    en,
}) => {
    // const [device] = useDevice()
    const isError = !!errors?.[questionKey]
    const selectedValues = (watch?.(questionKey) || []).map((o) => String(o))

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
            en={en}
        />
    )

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }

    useEffect(() => {
        if (required) {
            register(questionKey, {
                required,
            })
        }
    }, [])
    return (
        <div
            className={classNames(
                styles.container,
                containerClassName,
                isError ? "field-error" : ""
            )}
        >
            {label && (
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
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            <div
                className={classNames(optionsContainer, styles.options)}
                dir={en ? "ltr" : "rtl"}
            >
                {options.map(renderCheckBox)}
            </div>
            {isError && (
                <span className="error">
                    {errorIcon || <BiError className="text-xs lg:text-base" />}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}

export default CheckBoxGroup
