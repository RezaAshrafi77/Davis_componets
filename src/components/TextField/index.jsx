/* eslint-disable react/prop-types */
import classNames from "classnames";
import { Label } from "../Label";
import { BiError } from "react-icons/bi";
import { Divider } from "../Divider";
import NoteIcon from "../../assets/icons/note.svg";
import { BsPencilSquare } from "react-icons/bs";

export const TextField = ({
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
  inputClassName,
  en,
  labelMore,
  placeholder = "در اینجا وارد کنید ...",
  showLockIcon = true,
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
      inputClassName,
      "w-full font-400 xs:text-3xs md:text-2xs lg:text-xs xl:text-sm text-black border-[0.5px]  rounded border-black placeholder:text-3xs md:placeholder:text-2xs lg:placeholder:text-xs bg-transparent py-1 px-1.5 hover:outline-none hover:bg-white hover:ring-0 hover:border-success focus:outline-none focus:bg-white focus:ring-0 focus:border-success",
      props.rows ? "!py-2 !px-2" : "",
      disabled && "cursor-not-allowed",
      inputValue ? "!bg-white" : ""
    ),
    dir: en ? "ltr" : "rtl",
    disabled,
    value: props.rows ? inputValue.replace(/<br\s*\/?>/gi, "\n") : inputValue,
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
        "bg-formItem w-full flex flex-col relative p-2 rounded",
        props.rows ? "gap-1" : "",
        containerClassName
      )}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
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
          disabled={disabled && showLockIcon}
        />
      )}
      {divider && (
        <Divider className={classNames(dividerClassName)} position={divider} />
      )}
      <div
        className={classNames(
          className,
          "group flex justify-center items-center relative overflow-hidden"
        )}
      >
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
              "absolute top-1/2 left-1 lg:left-1.5 -translate-y-1/2",
              en ? "!left-auto !right-1" : "!left-1"
            )}
          >
            {icon ? (
              icon
            ) : (
              <img
                src={NoteIcon}
                className="h-[13px] w-[13px] lg:h-[19px] lg:w-[19px]"
                alt=""
              />
            )}
          </div>
        ) : (
          <div
            className={classNames(
              "absolute top-1/2 left-1 lg:left-1.5 -translate-y-1/2",
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
