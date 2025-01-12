/* eslint-disable react/prop-types */
import styles from "./styles.module.css";
import classNames from "classnames";

export function Divider({ className, position }) {
  const positionStyle = {
    center: styles.center,
    right: styles.right,
    left: styles.left,
  };
  return (
    <div
      className={classNames(
        "w-full rounded-md h-[1px] mt-1 mb-2",
        positionStyle[position],
        className
      )}
    ></div>
  );
}
