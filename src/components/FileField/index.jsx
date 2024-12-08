/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { FaFileCircleXmark } from "react-icons/fa6"
import { MdOutlineFileUpload } from "react-icons/md"
import Button from "../Button"
import Radio from "../Radio"
import Label from "../Label"
import Divider from "../Divider"
import { BiError } from "react-icons/bi"
import { baseURL } from "../../config/config"
import styles from "./styles.module.css"

export default function FileUploader({
    watch,
    setValue,
    selectOption,
    setSelectOption,
    label,
    required = true,
    questionKey,
    register,
    errors,
    divider = true,
    dividerClassName,
    buttonClassName,
    containerClassName,
    archive,
    labelClassName,
}) {
    const [file, setFile] = useState(null)
    const [imageSrc, setImageSrc] = useState("")
    const fileInputRef = useRef(null)

    const handleFileChange = (event) => {
        let selectedFile
        if (event.target.files) {
            selectedFile = event.target.files[0]
            setValue(questionKey, selectedFile)
            setFile(selectedFile)
            setImageSrc(URL.createObjectURL(selectedFile))
        }
    }

    const winOpen = (link) => {
        window.open(
            `${baseURL.substring(0, baseURL.length - 5)}${link}`,
            "_blank"
        )
    }

    const handleDisplayFile = () => {
        const link = watch(questionKey)
        if (file) {
            window.open(imageSrc, "_blank")
        } else if (link) {
            winOpen(link)
        }
    }

    const deleteFile = () => {
        setSelectOption(true)
    }
    const filename = watch(questionKey)

    const handleRadioChange = (value) => {
        if (value == "10361") {
            setImageSrc("")
            setFile(null)
            setValue(questionKey, "")
            fileInputRef.current && (fileInputRef.current.value = "")
            setSelectOption(false)
        } else if (value == "10362") {
            setSelectOption(false)
        }
    }

    useEffect(() => {
        if (required) {
            register(questionKey, {
                required: true,
            })
        }
    }, [])

    const isError = !!errors[questionKey]
    return (
        <div
            className={classNames(
                styles.uploadContainer,
                containerClassName,
                isError ? "field-error" : ""
            )}
        >
            <Label
                archive={
                    archive
                        ? {
                              ...archive,
                              questionKey: "1578722574644",
                              renderCell: archive?.renderCell
                                  ? archive?.renderCell
                                  : (val) => (
                                        <span
                                            className="text-green"
                                            onClick={() =>
                                                winOpen(
                                                    val.slice(1, val.length - 1)
                                                )
                                            }
                                        >
                                            نمایش فایل
                                        </span>
                                    ),
                          }
                        : false
                }
                className={classNames(styles.label, labelClassName)}
                required
                label={label}
            />
            {divider ? (
                <Divider
                    className={classNames(
                        dividerClassName,
                        "mx-auto my-2 block w-full"
                    )}
                />
            ) : null}
            <div className={styles.uploadPart}>
                <Button
                    variant={
                        file || watch(questionKey) ? "outlined" : "disabled"
                    }
                    className={classNames(buttonClassName, styles.button)}
                    title={
                        file || watch(questionKey)
                            ? "نمایش فایل"
                            : "انتخاب فایل"
                    }
                    onClick={handleDisplayFile}
                />
                <div
                    className={classNames(
                        styles.uploadShow,
                        file || watch(questionKey)
                            ? "!bg-white"
                            : "!bg-white-f5"
                    )}
                >
                    <label className="relative w-full justify-between flex items-center cursor-pointer overflow-hidden text-ellipsis">
                        <span className="font-600 text-2xs lg:text-xs">
                            {file
                                ? file.name.split(".").slice(0, -1).join(".")
                                : filename &&
                                  filename.split("/").pop().split(".")[0]
                                ? filename.split("/").pop().split(".")[0]
                                : "انتخاب فایل"}
                        </span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{
                                opacity: 0,
                            }}
                            className="z-10 w-full h-full absolute left-0 top-0"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="text"
                            onClick={
                                file || watch(questionKey) ? deleteFile : null
                            }
                            icon={
                                file || watch(questionKey) ? (
                                    <FaFileCircleXmark
                                        color={
                                            selectOption ? "#960018" : "#04900a"
                                        }
                                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    />
                                ) : (
                                    <MdOutlineFileUpload
                                        color="#7B7B7B"
                                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    />
                                )
                            }
                            className={file ? "z-20" : ""}
                        />
                    </label>
                </div>
            </div>
            {selectOption && (
                <div className={styles.confirmBox}>
                    <Label
                        className="self-center"
                        label={"آیا مایل به حذف فایل انتخاب شده هستید؟"}
                    />
                    <Divider />
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
                                onChange={(e) => e}
                            />
                        ))}
                    </div>
                </div>
            )}
            {isError && (
                <span className="text-error">
                    {<BiError className="text-xs lg:text-base" />}
                    {"این بخش اجباری است."}
                </span>
            )}
        </div>
    )
}
