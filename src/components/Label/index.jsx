/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import ArchiveTable from "../../layouts/ArchiveTable"
import styles from "./styles.module.css" // Import your CSS module
import GuideIcon from "../../assets/icons/guide.svg"
import ArchiveIcon from "../../assets/icons/archive.svg"
import DangerIcon from "../../assets/icons/danger.svg"
import WarningIcon from "../../assets/icons/warning.svg"
import { MdOutlineMoreHoriz } from "react-icons/md"
import useDevice from "../../hooks/useDevice"
import classNames from "classnames"
import { MdChevronLeft } from "react-icons/md"

const Label = ({
    label,
    required,
    className,
    userGuide,
    archive,
    educationalContent,
    en,
    more,
}) => {
    const labelRef = useRef(null)
    const spanRef = useRef(null)
    const [truncatedText, setTruncatedText] = useState(label)
    const [openModal, setOpenModal] = useState({
        userGuide: false,
        archive: false,
    })
    const [openMoreBox, setOpenMoreBox] = useState(false)
    const [device] = useDevice()
    const [showMore, setShowMore] = useState(more)
    const buttonWidth = 30
    const gap = 4

    const handleModalToggle = (type) => {
        setOpenModal((prev) => ({ ...prev, [type]: !prev[type] }))
    }

    useEffect(() => {
        const measureWidth = () => {
            if (labelRef.current && spanRef.current) {
                const labelWidth = labelRef.current.offsetWidth
                const textWidth = spanRef.current.offsetWidth

                // Check if text exceeds available width
                if (
                    textWidth + (device == "desktop" ? 100 : 40) >
                    labelWidth - (buttonWidth + gap)
                ) {
                    let newText = label
                    let words = newText.split(" ")
                    let truncated = ""
                    for (let word of words) {
                        spanRef.current.innerText = truncated + word + " "
                        if (
                            spanRef.current.offsetWidth >
                            labelWidth - (buttonWidth + gap)
                        ) {
                            break
                        }
                        truncated += word + " "
                    }

                    setTruncatedText(truncated.trim() + "")
                    setShowMore(true)
                } else {
                    setTruncatedText(label)
                    setShowMore(false)
                }
            }
        }

        measureWidth()
        window.addEventListener("resize", measureWidth)

        return () => window.removeEventListener("resize", measureWidth)
    }, [label])

    return (
        <Fragment>
            {openMoreBox ? (
                <div
                    onClick={() => setOpenMoreBox(false)}
                    className="fixed top-0 left-0 h-full w-full z-[999]"
                ></div>
            ) : null}
            <label
                className={classNames(
                    className,
                    styles.label,
                    en ? styles.enLabel : styles.label,
                    showMore ? styles.labelMore : "relative",
                    "select-none"
                )}
                dir={en ? "ltr" : ""}
                ref={labelRef}
            >
                {showMore ? (
                    <Fragment>
                        <span
                            ref={spanRef}
                            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                        >
                            {truncatedText}
                        </span>
                        <MdOutlineMoreHoriz
                            onClick={() => {
                                setOpenMoreBox(true)
                            }}
                            className="text-lg lg:text-xl hover:cursor-pointer"
                            style={{
                                width: `${buttonWidth}px`,
                                marginRight: `${gap}px`,
                                cursor: "pointer",
                            }}
                        />
                    </Fragment>
                ) : (
                    label
                )}
                {required && <span className={styles.required}>*</span>}
                {userGuide && (
                    <img
                        src={GuideIcon}
                        alt="راهنما"
                        onClick={() => handleModalToggle("userGuide")}
                        className={`${styles.guideIcon}`}
                    />
                )}
                {archive && (
                    <img
                        src={ArchiveIcon}
                        alt="آرشیو"
                        onClick={() => handleModalToggle("archive")}
                        className={`${styles.archiveIcon}`}
                    />
                )}

                {educationalContent?.show && (
                    <img
                        src={
                            educationalContent?.type == "danger"
                                ? DangerIcon
                                : WarningIcon
                        }
                        alt="محتوای آموزشی"
                        onClick={() => educationalContent.action()}
                        className={`${styles.eduIcon} ${educationalContent.className}`}
                    />
                )}

                <Modal
                    isOpen={openModal.userGuide || openModal.archive}
                    onClose={() =>
                        setOpenModal({ userGuide: false, archive: false })
                    }
                    containerClassName={styles.modalContainer}
                >
                    {openModal.userGuide ? userGuide : null}
                    {openModal.archive ? (
                        <ArchiveTable options={archive} />
                    ) : null}
                </Modal>
                {openMoreBox ? (
                    <div className={styles.moreBox}>
                        {label}
                        <div
                            className="mr-auto flex items-center md:text-3xs lg:text-2xs xl:text-xs cursor-pointer"
                            onClick={() => setOpenMoreBox(false)}
                        >
                            بازگشت{" "}
                            <MdChevronLeft className="text-xs md:text-sm lg:text-base xl:text-xl" />
                        </div>
                    </div>
                ) : null}
            </label>
        </Fragment>
    )
}

export default Label
