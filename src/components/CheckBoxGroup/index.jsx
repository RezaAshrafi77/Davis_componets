/* eslint-disable react/prop-types */
import classNames from "classnames";
import { BiError } from "react-icons/bi";
// import useDevice from "../../hooks/useDevice"
import { CheckBox } from "../CheckBox";
import { Divider } from "../Divider";
import { Label } from "../Label";
import styles from "./styles.module.css";
import { useEffect } from "react";

export const CheckBoxGroup = ({
  containerClassName,
  optionsContainer,
  checkBoxClassName,
  options = [],
  label,
  divider = false,
  labelClassName,
  educationalContent,
  userGuide,
  errors,
  questionKey,
  required = false,
  setValue,
  watch,
  archive,
  dividerClassName,
  labelMore,
  disabled,
  register,
  en,
}) => {
  // const [device] = useDevice()
  const error = errors?.[questionKey] ? errors?.[questionKey]?.message : null;

  const selectedValues = (watch?.(questionKey) || []).map((o) => String(o));

  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(String(value))
      ? selectedValues.filter((v) => v !== String(value))
      : [...selectedValues, String(value)];
    setValue?.(questionKey, updatedValues, { shouldValidate: true });
  };

  const renderCheckBox = (option) => (
    <CheckBox
      key={option.value}
      name={questionKey}
      value={option.value}
      label={option.label}
      checked={selectedValues.includes(option.value)}
      onChange={() => handleCheckboxChange(option.value)}
      className={classNames(checkBoxClassName)}
      en={en}
    />
  );

  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
  };

  useEffect(() => {
    if (register && required) {
      register(questionKey, {
        required: true,
      });
    }
  }, []);

  return (
    <div
      className={classNames(
        "w-full flex flex-col p-2 bg-formItem rounded relative",
        containerClassName,
        error ? "field-error" : ""
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
          disabled={disabled}
        />
      )}
      {divider && (
        <Divider className={classNames(dividerClassName)} position={divider} />
      )}
      <div
        className={classNames(
          optionsContainer,
          styles.options,
          "flex w-full flex-wrap gap-1.5"
        )}
        dir={en ? "ltr" : "rtl"}
      >
        {options.map(renderCheckBox)}
      </div>
      {error && (
        <span className="error">
          {<BiError className="text-xs lg:text-base" />}
          {error}
        </span>
      )}
    </div>
  );
};
