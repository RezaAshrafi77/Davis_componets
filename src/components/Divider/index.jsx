/* eslint-disable react/prop-types */
import styles from "./styles.module.css"
import classNames from "classnames"

export default function Divider({ className, position }) {
    const positionStyle = {
        center: styles.center,
        right: styles.right,
        left: styles.left,
    }
    return (
        <div
            className={classNames(
                styles.divider,
                positionStyle[position],
                className
            )}
        ></div>
    )
}
