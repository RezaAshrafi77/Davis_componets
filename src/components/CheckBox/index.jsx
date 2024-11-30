/* eslint-disable react/prop-types */
import classNames from "classnames"
import styles from "./styles.module.css"

const CheckBox = ({
    name,
    value,
    label,
    checked = false,
    onChange,
    disabled = false,
    className,
}) => {
    return (
        <label
            className={classNames(styles.container, className, {
                [styles.checkedContainer]: checked,
                [styles.disabledContainer]: disabled,
            })}
        >
            <span className={styles.label}>{label}</span>
            <div
                className={classNames(styles.secondLayer, {
                    [styles.secondLayerChecked]: checked,
                })}
            >
                <div
                    className={classNames(styles.firstLayer, {
                        [styles.firstLayerChecked]: checked,
                    })}
                >
                    <input
                        type="checkbox"
                        className={styles.input}
                        name={name}
                        value={value}
                        onChange={onChange}
                        checked={checked}
                        disabled={disabled}
                    />
                </div>
            </div>
        </label>
    )
}

CheckBox.displayName = "CheckBox"

export default CheckBox
