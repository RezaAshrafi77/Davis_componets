/* eslint-disable react/prop-types */
import classNames from "classnames"
import Divider from "../Divider"
import Label from "../Label"
import Radio from "../Radio/index"
import styles from "./styles.module.css"
import useDevice from "../../hooks/useDevice"
import { BiError } from "react-icons/bi"

export default function RadioOptions({
    containerClassName = "",
    register = () => {},
    options = [],
    active,
    divider = false,
    label = "",
    onClick,
    userGuide = null,
    questionKey = "",
    wrap = false,
    labelClassName = "",
    optionsContainer = "",
    radioClassName = "",
    required = false,
    educationalContent = null,
    errors = {},
    errorIcon = null,
    errorMessage = "این سوال اجباری است.",
    archive = null,
    dividerClassName,
}) {
    const [device] = useDevice()
    const isError = errors?.[questionKey]
    const renderOptions = () =>
        options.map((option) => (
            <Radio
                key={option.label}
                className={classNames(radioClassName, styles.radio)}
                checked={active === option.value}
                value={option.value}
                label={option.label}
                onClick={onClick}
                {...register(questionKey, { required })}
            />
        ))

    return (
        <div
            className={classNames(
                styles.container,
                containerClassName,
                { "!flex-nowrap": !wrap && device === "desktop" },
                { "field-error": isError }
            )}
        >
            <Label
                className={classNames(styles.label, labelClassName)}
                userGuide={userGuide}
                label={label}
                required={required}
                educationalContent={educationalContent}
                archive={archive ? { ...archive, questionKey } : false}
            />
            {divider && (
                <Divider
                    className={classNames(
                        dividerClassName,
                        "mx-auto my-2 block w-full"
                    )}
                />
            )}
            <div
                className={classNames(
                    optionsContainer,
                    { "lg:max-w-fit": options.length === 2 },
                    styles.options
                )}
            >
                {renderOptions()}
            </div>
            {isError && (
                <span className="text-error flex items-center gap-2 mt-1">
                    {errorIcon || <BiError className="text-xs lg:text-base" />}
                    {errorMessage}
                </span>
            )}
        </div>
    )
}
