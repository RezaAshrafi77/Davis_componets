/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { FaFileCircleXmark } from "react-icons/fa6"
import { MdOutlineFileUpload } from "react-icons/md"
import Button from "../Button"
import Radio from "../Radio"
import Label from "../Label"
import Divider from "../Divider"
import { BiError } from "react-icons/bi"
import styles from "./styles.module.css"

const FileField = ({
    value,
    setValue,
    onChange,
    watch,
    label,
    required,
    register,
    questionKey,
    errors,
    divider = true,
    dividerClassName,
    buttonClassName,
    containerClassName,
    archive,
    labelClassName,
    className,
    baseURL,
    userGuide,
    educationalContent,
    disabled,
    accept,
    more,
    en,
}) => {
    const [openModal, setOpenModal] = useState(false)
    const inputRef = useRef(null)
    const _value = watch ? watch(questionKey) : value

    useEffect(() => {
        if (required && register) {
            register(questionKey, { required })
        }
    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files ? event.target.files[0] : null
        if (setValue) {
            setValue(questionKey, file)
        } else {
            onChange(file)
        }
    }

    const winOpen = (link) => {
        const url = `${baseURL.substring(0, baseURL.length - 5)}${link}`
        window.open(url, "_blank")
    }

    const handleDisplayFile = () => {
        const fileLink = _value
        if (typeof fileLink === "string") {
            winOpen(fileLink)
        } else if (fileLink) {
            window.open(URL.createObjectURL(fileLink), "_blank")
        }
    }

    const deleteFile = () => {
        setOpenModal(true)
    }

    const handleRadioChange = (value) => {
        if (value === "10361") {
            const resetFile = ""
            if (setValue) {
                setValue(questionKey, resetFile)
            } else {
                onChange(resetFile)
            }
            setOpenModal(false)
        } else if (value === "10362") {
            setOpenModal(false)
        }
    }

    const isError = !!errors?.[questionKey]

    const truncateText = (text, maxLength = 20) => {
        if (!text) return ""
        return text.length <= maxLength
            ? text
            : `${text.slice(0, maxLength / 2)}...${text.slice(-maxLength / 2)}`
    }

    const filename = useCallback(
        (file) =>
            typeof file === "string"
                ? truncateText(file)
                : truncateText(file.name),
        []
    )

    const renderFileInfo = () => {
        const fileToDisplay = _value
        return fileToDisplay
            ? filename(fileToDisplay)
            : en
            ? "Choose a file"
            : "انتخاب فایل"
    }

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }
    return (
        <div
            className={classNames(styles.container, containerClassName, {
                "field-error": isError,
            })}
            dir={en ? "ltr" : ""}
        >
            {label && (
                <Label
                    className={classNames(
                        labelClassName,
                        labelDirectionStyle[divider]
                    )}
                    userGuide={userGuide}
                    educationalContent={educationalContent}
                    archive={
                        archive
                            ? {
                                  ...archive,
                                  questionKey,
                                  renderCell:
                                      archive.renderCell ||
                                      ((val) => (
                                          <span
                                              className="text-success"
                                              onClick={() =>
                                                  winOpen(val.slice(1, -1))
                                              }
                                          >
                                              {"نمایش فایل"}
                                          </span>
                                      )),
                              }
                            : false
                    }
                    label={label}
                    required={required}
                    en={en}
                    more={more}
                />
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            <div className={styles.uploadPart}>
                <Button
                    variant={"outlined"}
                    className={classNames(buttonClassName, styles.button)}
                    title={
                        _value
                            ? en
                                ? "Display file"
                                : "نمایش فایل"
                            : en
                            ? "Choose a file"
                            : "انتخاب فایل"
                    }
                    onClick={() =>
                        _value ? handleDisplayFile() : inputRef.current.click()
                    }
                />

                <div
                    className={classNames(
                        styles.uploadShow,
                        {
                            "!bg-white": _value,
                            "!bg-white-f5": !_value,
                        },
                        "group"
                    )}
                >
                    <label className={classNames(styles.inputField, className)}>
                        <span className="z-[1] font-600 text-2xs lg:text-[11px] xl:text-xs">
                            {renderFileInfo()}
                        </span>
                        <input
                            type="file"
                            ref={inputRef}
                            className={classNames(
                                disabled
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer",
                                styles.input
                            )}
                            onChange={handleFileChange}
                            disabled={false}
                            accept={accept}
                        />
                        <Button
                            variant="text"
                            onClick={_value ? deleteFile : null}
                            icon={
                                _value ? (
                                    <FaFileCircleXmark
                                        color={
                                            openModal ? "#960018" : "#04900a"
                                        }
                                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    />
                                ) : (
                                    <MdOutlineFileUpload
                                        color="#7B7B7B"
                                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] group-hover:!text-success"
                                    />
                                )
                            }
                            className={_value ? "z-20" : ""}
                        />
                    </label>
                </div>
            </div>

            {openModal && (
                <div className={styles.confirmBox}>
                    <Label
                        className="self-center"
                        label={"آیا مایل به حذف فایل انتخاب شده هستید؟"}
                    />
                    <Divider position={"center"} />
                    <div className="flex justify-between w-full">
                        {[
                            { label: "بله", value: "10361" },
                            { label: "خیر", value: "10362" },
                        ].map((option) => (
                            <Radio
                                key={option.value}
                                label={option.label}
                                id={option.value}
                                name="booleanOption"
                                value={option.value}
                                checked={false}
                                onClick={() => handleRadioChange(option.value)}
                                onChange={(e) => e.preventDefault()}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isError && (
                <span className="error">
                    <BiError className="text-2xs lg:text-xs" />
                    {"پر کردن این قسمت الزامیست."}
                </span>
            )}
        </div>
    )
}

export default FileField
