/* eslint-disable react/prop-types */
import { Fragment, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import styles from "./styles.module.css"
import classNames from "classnames"

export default function Dropdown({ label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen((prev) => !prev)

    return (
        <Fragment>
            {isOpen ? (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed top-0 left-0 h-full w-full z-[999]"
                ></div>
            ) : null}
            <div
                className={classNames(
                    styles.dropdown,
                    isOpen ? "z-[1000]" : ""
                )}
                onClick={toggleDropdown}
            >
                <div className={styles.labelContainer}>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.value}>{value}</span>
                </div>
                <IoChevronDownOutline
                    className={`${styles.icon} ${
                        isOpen ? styles.iconOpen : ""
                    }`}
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
        </Fragment>
    )
}
