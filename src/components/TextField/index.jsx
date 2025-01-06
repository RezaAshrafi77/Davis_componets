/* eslint-disable react/prop-types */
import classNames from "classnames";
import Label from "../Label";
import { BiError } from "react-icons/bi";
import styles from "./styles.module.css";
import Divider from "../Divider";
import NoteIcon from "../../assets/icons/note.svg";
import { BsPencilSquare } from "react-icons/bs";

const TextField = ({
  containerClassName,
  className,
  label,
  icon,
  userGuide,
  educationalContent,
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
  en,
  labelMore,
  placeholder = "در اینجا وارد کنید ...",
  ...props
}) => {
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
      props.rows ? "!py-2 !px-2" : "",
      disabled && "cursor-not-allowed",
      inputValue ? "!bg-white" : ""
    ),
    dir: en ? "ltr" : "rtl",
    disabled,
    value: inputValue,
    onChange: inputOnChange,
    placeholder,
    ...props,
  };

  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
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
          className={classNames(labelClassName, labelDirectionStyle[divider])}
          userGuide={userGuide}
          educationalContent={educationalContent}
          archive={archive ? { ...archive, questionKey } : false}
          label={label}
          required={required}
          en={en}
          more={labelMore}
        />
      )}
      {divider && (
        <Divider className={classNames(dividerClassName)} position={divider} />
      )}
      <div className={classNames(className, "group", styles.field)}>
        {props.rows > 1 ? (
          <textarea
            {...inputProps}
            {...(register
              ? register(questionKey, {
                  required: required ? "پر کردن این قسمت الزامیست." : false,
                  pattern,
                  valueAsNumber: props.type == "number",
                })
              : {})}
          />
        ) : (
          <input
            {...inputProps}
            {...(register
              ? register(questionKey, {
                  required: required ? "پر کردن این قسمت الزامیست." : false,
                  pattern,
                })
              : {})}
          />
        )}
        {!props.rows ? (
          <div
            className={classNames(
              styles.icon,
              en ? "!left-auto !right-1" : "!left-1"
            )}
          >
            {icon ? icon : <img src={NoteIcon} alt="" />}
          </div>
        ) : (
          <div
            className={classNames(
              styles.icon,
              en ? "left-auto right-2" : "left-2"
            )}
            style={{
              height: props.rows * 20,
              width: props.rows * 20,
              maxHeight: 60,
              maxWidth: 60,
            }}
          >
            <BsPencilSquare className="opacity-5 w-full h-full" />
          </div>
        )}
      </div>
      {isError && (
        <span className="error">
          {errorIcon ? errorIcon : <BiError className="text-xs lg:text-base" />}
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextField;
