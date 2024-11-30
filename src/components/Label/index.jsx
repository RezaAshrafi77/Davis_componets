/* eslint-disable react/prop-types */
import { useState } from "react"
import { FaRegQuestionCircle } from "react-icons/fa"
import { LiaArchiveSolid } from "react-icons/lia"
import { IoIosInformationCircle } from "react-icons/io"
import Modal from "../Modal"
import ArchiveTable from "../../layouts/ArchiveTable"
import styles from "./styles.module.css" // Import your CSS module

const Label = ({
    label,
    required,
    className,
    userGuide,
    archive,
    educationalContent,
}) => {
    const [openModal, setOpenModal] = useState({
        userGuide: false,
        archive: false,
    })

    const handleModalToggle = (type) => {
        setOpenModal((prev) => ({ ...prev, [type]: !prev[type] }))
    }

    return (
        <label className={`${styles.label} ${className}`}>
            {label}
            {required && <span className={styles.required}>*</span>}

            {userGuide && (
                <FaRegQuestionCircle
                    className={`${styles.guideIcon} ${styles.iconSize} ${styles.hoverGreen} cursor-pointer`}
                    onClick={() => handleModalToggle("userGuide")}
                    title="راهنما"
                />
            )}

            {archive && (
                <LiaArchiveSolid
                    className={`${styles.iconSize} ${styles.hoverGreen} cursor-pointer`}
                    onClick={() => handleModalToggle("archive")}
                    title="آرشیو"
                />
            )}

            {educationalContent?.show && (
                <IoIosInformationCircle
                    className={`${styles.iconSize} ${styles.textGray} ${styles.hoverRed} cursor-pointer`}
                    onClick={educationalContent.action}
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
                {openModal.archive ? <ArchiveTable options={archive} /> : null}
            </Modal>
        </label>
    )
}

export default Label
