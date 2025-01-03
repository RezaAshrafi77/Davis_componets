/* eslint-disable react/prop-types */
import classNames from "classnames"
import { BiError } from "react-icons/bi"
import Label from "../Label"
import Divider from "../Divider"
import styles from "./styles.module.css"
import { Controller } from "react-hook-form"
import { IoChevronDownOutline } from "react-icons/io5"
import { Fragment, useEffect, useState } from "react"
import searchIcon from "../../assets/icons/search.svg"
import TextField from "../TextField"

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
    errorMessage = "پر کردن این قسمت الزامیست.",
    dividerClassName,
    archive,
    errorIcon,
    onChange,
    value,
    labelClassName,
    en,
    register,
    search,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const isError = !!errors[questionKey] && !value
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

    useEffect(() => {
        if (register && required) {
            register(questionKey, {
                required,
            })
        }
    }, [])

    return (
        <Fragment>
            {isOpen ? (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed top-0 left-0 h-screen w-screen z-[999]"
                ></div>
            ) : null}
            <div
                className={classNames(styles.container, containerClassName, {
                    "field-error": isError,
                    "z-[1000]": isOpen,
                })}
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
                {search ? (
                    <div className="relative w-full">
                        <div
                            className="flex items-center px-1 justify-between w-full rounded border-[0.5px] border-black py-0.5 md:py-[3px] lg:py-[5px] bg-formItemInput cursor-pointer select-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span
                                className={
                                    "text-3xs md:text-2xs lg:text-xs xl:text-[13px] font-400"
                                }
                            >
                                {value
                                    ? defaultOptions?.find(
                                          (o) => o.value == value
                                      )?.label
                                    : "لطفا یک گزینه را انتخاب کنید."}
                            </span>
                            <IoChevronDownOutline
                                className={`${styles.icon} ${
                                    isOpen ? "rotate-180 transition-all" : ""
                                }`}
                            />
                        </div>
                        {isOpen ? (
                            <div className="absolute left-0 bottom-0 translate-y-full flex flex-col rounded-b w-full transition-all z-10">
                                <div className="bg-formItem2 p-1 rounded w-full">
                                    <TextField
                                        icon={
                                            <img src={searchIcon} alt="جستجو" />
                                        }
                                        placeholder="حداقل ۲ حرف از نام دارو را وارد کنید."
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                    />
                                </div>
                                {searchValue?.length >= 2 ? (
                                    options.filter((o) =>
                                        o.label.includes(searchValue)
                                    )?.length ? (
                                        <ul className="flex flex-col divide-y divide-solid divide-gray-200 max-h-[200px] overflow-y-scroll bg-[#f7f7f7] shadow-md">
                                            {options
                                                .filter((o) =>
                                                    o.label.includes(
                                                        searchValue
                                                    )
                                                )
                                                .map((o) => (
                                                    <li
                                                        key={o.label}
                                                        onClick={() => {
                                                            onChange(o.value)
                                                            setIsOpen(false)
                                                        }}
                                                        className="p-2 text-3xs md:text-2xs lg:text-xs font-500 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        {o.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <span className="py-3 px-2 text-3xs md:text-2xs lg:text-xs font-500 bg-gray-200">
                                            موردی یافت نشد.
                                        </span>
                                    )
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                ) : hasController ? (
                    <Controller
                        control={control}
                        name={questionKey}
                        rules={{ required }}
                        render={({ field }) => renderSelect({ field })}
                    />
                ) : (
                    renderSelect({ field: { value, onChange, ref: null } })
                )}

                {isError ? (
                    <span className="error">
                        {errorIcon || (
                            <BiError className="text-xs lg:text-base" />
                        )}
                        {errorMessage}
                    </span>
                ) : null}
            </div>
        </Fragment>
    )
}

export default Select
