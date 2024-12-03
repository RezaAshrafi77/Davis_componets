/* eslint-disable react/prop-types */
import { forwardRef } from "react"
import classNames from "classnames"
import styles from "./styles.module.css"

const Radio = forwardRef(
    ({ className, label, checked, disabled, ...props }, ref) => {
        return (
            <label
                className={classNames(
                    className,
                    styles.container,
                    checked && styles.checkedContainer,
                    disabled && styles.disabledContainer,
                    "group"
                )}
                aria-checked={checked}
                aria-disabled={disabled}
            >
                <input
                    className={styles.input}
                    ref={ref}
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    {...props}
                />
                <span className={styles.label}>{label}</span>
                <div
                    className={classNames(
                        styles.secondLayer,
                        checked && styles.secondLayerChecked,
                        "group-hover:shadow-lg"
                    )}
                >
                    <div
                        className={classNames(
                            styles.firstLayer,
                            checked && styles.firstLayerChecked
                        )}
                    >
                        <div
                            className={classNames(
                                styles.dot,
                                checked && styles.dotChecked
                            )}
                        ></div>
                    </div>
                </div>
            </label>
        )
    }
)

Radio.displayName = "Radio"

export default Radio
