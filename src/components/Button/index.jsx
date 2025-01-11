/* eslint-disable react/prop-types */
import classNames from "classnames";
import { VscLoading } from "react-icons/vsc";
import styles from "./styles.module.css";

export const Button = ({
  title,
  variant = "variant",
  type = "button",
  loading = false,
  disabled = false,
  className,
  icon = null,
  loadingColor = "currentColor",
  ...props
}) => {
  const isIconOnly = icon && !title;

  return (
    <button
      type={type}
      title={title}
      disabled={disabled || loading || variant == "disabled"}
      className={classNames(
        styles.button,
        styles[variant],
        {
          [styles.disabled]: disabled || loading,
          [styles.icon]: isIconOnly,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <VscLoading className="text-lg animate-spin" color={loadingColor} />
      ) : (
        <>
          {title && <span>{title}</span>}
          {icon}
        </>
      )}
    </button>
  );
};
