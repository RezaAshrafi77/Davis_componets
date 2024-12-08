/* eslint-disable react/prop-types */
import { useState } from "react";
import classNames from "classnames";
import Label from "../Label";
import { BsPencilSquare } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import styles from "./styles.module.css";
import Divider from "../Divider";
import NoteIcon from "../../assets/icons/note.svg";

const TextField = ({
  containerClassName,
  className,
  label,
  icon,
  userGuide,
  archive,
  labelClassName,
  questionKey,
  required,
  register,
  watch,
  onChange: customOnChange,
  value: customValue,
  errors,
  pattern,
  disabled = false,
  errorIcon,
  divider,
  dividerClassName,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isError = errors ? !!errors[questionKey] : false;
  const errorMessage = errors?.[questionKey]?.message;

  // Fallback to React Hook Form's `watch` and `register` if no `customValue` or `customOnChange` is provided
  const inputValue = customValue ?? watch?.(questionKey) ?? "";
  const inputOnChange = (e) => {
    if (customOnChange) {
      customOnChange(e); // Use custom onChange if provided
    } else if (register) {
      register(questionKey)?.onChange(e); // React Hook Form's onChange
    }
  };

  const inputProps = {
    className: classNames(
      styles.input,
      "w-full outline-none bg-transparent",
      disabled && "cursor-not-allowed"
    ),

    disabled,
    value: inputValue,
    onChange: inputOnChange,
    ...props,
  };

  return (
    <div
      className={classNames(
        isError ? "field-error" : "",
        styles.container,
        containerClassName
      )}
    >
      {label && (
        <Label
          className={labelClassName}
          userGuide={userGuide}
          archive={
            archive ? { ...archive, questionKey } : false
          } /* !We need some property in 
                    the ArchiveTable and just add questionKey from here. */
          label={label}
          required={required}
        />
      )}
      {divider ? (
        <Divider
          className={classNames(dividerClassName, "mx-auto my-2 block w-full")}
        />
      ) : null}
      <div
        className={classNames(
          isFocused
            ? "border-green !bg-white"
            : "hover:border-green border-black",
          className,
          !props.rows ? "pl-7" : "pl-1",
          "group",
          styles.field,
          disabled ? styles.disabled : null
        )}
      >
        {props.rows > 1 ? (
          <textarea
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...inputProps}
            {...(register ? register(questionKey, { required, pattern }) : {})}
          />
        ) : (
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...inputProps}
            {...(register ? register(questionKey, { required, pattern }) : {})}
          />
        )}

        {icon && !props.rows ? (
          <div className={styles.icon}>{icon}</div>
        ) : (
          <div className={styles.icon}>
            <img src={NoteIcon} alt="" />
          </div>
        )}
        {props.rows && icon ? icon : null}
      </div>
      {isError && (
        <span className="text-error">
          {errorIcon ? errorIcon : <BiError className="text-xs lg:text-base" />}
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextField;
