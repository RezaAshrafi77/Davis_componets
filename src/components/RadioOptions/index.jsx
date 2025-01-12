/* eslint-disable react/prop-types */
import classNames from "classnames";
import { Divider } from "../Divider";
import { Label } from "../Label";
import { Radio } from "../Radio/index";
import styles from "./styles.module.css";
// import useDevice from "../../hooks/useDevice"
import { BiError } from "react-icons/bi";

export function RadioOptions({
  containerClassName = "",
  register = () => {},
  options = [],
  active,
  divider = false,
  label = "",
  onClick,
  userGuide = null,
  questionKey = "",
  // wrap = false,
  labelClassName = "",
  optionsContainer = "",
  radioClassName = "",
  required = false,
  educationalContent = null,
  errors = {},
  errorIcon = null,
  errorMessage = "پر کردن این قسمت الزامیست.",
  archive = null,
  dividerClassName,
  en,
  labelMore,
}) {
  const isError = !!errors?.[questionKey];
  const renderOptions = () =>
    options.map((option) => (
      <Radio
        key={option.label}
        en={en}
        className={classNames(radioClassName)}
        checked={active === option.value}
        value={option.value}
        label={option.label}
        onClick={onClick}
        {...register(questionKey, { required })}
      />
    ));

  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
  };

  return (
    <div
      className={classNames(
        "bg-formItem w-full flex flex-col relative p-2 rounded",
        containerClassName,
        {
          "field-error": isError,
        }
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
        />
      )}
      {divider && (
        <Divider className={classNames(dividerClassName)} position={divider} />
      )}
      <div
        className={classNames(
          optionsContainer,
          styles.options + " " + "flex flex-wrap w-full gap-1.5"
        )}
        dir={en ? "ltr" : "rtl"}
      >
        {renderOptions()}
      </div>
      {isError && (
        <span className="error">
          {errorIcon || <BiError className="text-xs lg:text-base" />}
          {errorMessage}
        </span>
      )}
    </div>
  );
}
