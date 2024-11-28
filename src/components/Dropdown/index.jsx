/* eslint-disable react/prop-types */
import { useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import styles from "./styles.module.css"

export default function Dropdown({ label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen((prev) => !prev)

    return (
        <div className={styles.dropdown} onClick={toggleDropdown}>
            <div className={styles.labelContainer}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>
            <IoChevronDownOutline
                className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
            />
            <ul
                className={`${styles.menu} ${
                    isOpen ? styles.menuOpen : styles.menuClosed
                }`}
            >
                {options.map((item) => (
                    <li
                        key={item.label}
                        className={styles.menuItem}
                        onClick={() => onChange(item.value)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}
