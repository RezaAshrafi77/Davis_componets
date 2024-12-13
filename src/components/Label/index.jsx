/* eslint-disable react/prop-types */
import { useState } from "react"
import Modal from "../Modal"
import ArchiveTable from "../../layouts/ArchiveTable"
import styles from "./styles.module.css" // Import your CSS module
import GuideIcon from "../../assets/icons/guide.svg"
import ArchiveIcon from "../../assets/icons/archive.svg"
import DangerIcon from "../../assets/icons/danger.svg"
import WarningIcon from "../../assets/icons/warning.svg"

const Label = ({
    label,
    required,
    className,
    userGuide,
    archive,
    educationalContent,
    en,
}) => {
    const [openModal, setOpenModal] = useState({
        userGuide: false,
        archive: false,
    })

    const handleModalToggle = (type) => {
        setOpenModal((prev) => ({ ...prev, [type]: !prev[type] }))
    }

    return (
        <label
            className={`${styles.label} ${
                en ? styles.enLabel : styles.label
            } ${className}`}
        >
            {label}
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
                {openModal.archive ? <ArchiveTable options={archive} /> : null}
            </Modal>
        </label>
    )
}

export default Label
