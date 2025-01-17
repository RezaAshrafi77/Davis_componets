/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { FaFileCircleXmark } from "react-icons/fa6"
import { MdOutlineFileUpload } from "react-icons/md"
import { Button } from "../Button"
import { Radio } from "../Radio"
import { Label } from "../Label"
import { Divider } from "../Divider"
import { BiError } from "react-icons/bi"
import styles from "./styles.module.css"

export const FileField = ({
    value,
    setValue,
    onChange,
    watch,
    label,
    required,
    register,
    questionKey,
    errors,
    divider = "center",
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
    labelMore,
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
            className={classNames(
                "w-full flex flex-col p-2 bg-formItem rounded relative",
                containerClassName,
                {
                    "field-error": isError,
                }
            )}
            style={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            }}
            dir={en ? "ltr" : ""}
        >
            {label && (
                <Label
                    className={classNames(
                        labelClassName,
                        labelDirectionStyle[divider]
                    )}
                    more={labelMore}
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
                />
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            <div className={"flex w-full items-center justify-between gap-4"}>
                <Button
                    variant={"outlined"}
                    className={classNames(
                        buttonClassName,
                        "h-[22px] lg:h-[26px] w-[81px] lg:!text-xs text-nowrap border-black !bg-background hover:!bg-white px-2 !border-[0.5px] opacity-90 hover:opacity-100"
                    )}
                    title={
                        _value
                            ? en
                                ? "Display file"
                                : "نمایش فایل"
                            : en
                            ? "Upload"
                            : "انتخاب فایل"
                    }
                    onClick={() =>
                        _value ? handleDisplayFile() : inputRef.current.click()
                    }
                />

                <div
                    className={classNames(
                        "border-[0.5px] w-full cursor-pointer flex items-center justify-between px-2 border-black rounded hover:!bg-white",
                        {
                            "!bg-white": _value,
                            "!bg-white-f5": !_value,
                        },
                        "group"
                    )}
                >
                    <label
                        className={classNames(
                            "relative w-full justify-between flex items-center cursor-pointer overflow-hidden text-ellipsis",
                            className
                        )}
                    >
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
                                "z-10 w-full h-full absolute left-0 top-0 opacity-0"
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
                                        className={classNames(
                                            "w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]  group-hover:!text-success",
                                            _value
                                                ? "text-success"
                                                : "text-[#7B7B7B]"
                                        )}
                                    />
                                )
                            }
                            className={_value ? "z-20" : ""}
                        />
                    </label>
                </div>
            </div>

            {openModal && (
                <div
                    className={
                        styles.confirmBox +
                        " " +
                        "z-20 bg-white bg-opacity-40 backdrop-blur-md absolute left-0 top-0 w-full flex flex-col justify-between min-h-full px-2 py-2"
                    }
                >
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
