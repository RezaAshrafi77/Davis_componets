/* eslint-disable react/prop-types */
import styles from "./styles.module.css"
import classNames from "classnames"

export default function Divider({ className }) {
    return <div className={classNames(styles.divider, className)}></div>
}
