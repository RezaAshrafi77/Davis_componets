/* eslint-disable react/prop-types */
import classNames from "classnames";
import { BiError } from "react-icons/bi";
import { Label } from "../Label";
import { Divider } from "../Divider";
import { TextField } from "../TextField";
import { Controller } from "react-hook-form";
import { IoChevronDownOutline } from "react-icons/io5";
import { Fragment, useEffect, useState } from "react";
import searchIcon from "../../assets/icons/search.svg";

export const Select = ({
  control,
  label,
  inputClassName,
  optionClassName,
  containerClassName,
  options = [],
  divider,
  userGuide,
  educationalContent,
  questionKey,
  errors = {},
  dividerClassName,
  archive,
  onChange,
  value,
  labelClassName,
  en,
  search,
  labelMore,
  disabled,
  register,
  validation,
  placeholder,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const error = errors?.[questionKey] ? errors[questionKey]?.message : null;
  const hasController = !!Controller && !!control;

  const defaultOptions = [
    { label: "لطفا یک گزینه را انتخاب کنید.", value: "" },
    ...options,
  ];

  const renderSelect = ({ field }) => (
    <select
      id={questionKey}
      className={classNames(
        inputClassName,
        "text-2xs lg:text-xs rounded border-[0.5px] border-solid border-black hover:border-success  bg-transparent font-400  py-1 lg:py-0.5 px-1 lg:px-1.5  !ring-0 hover:bg-white cursor-pointer outline-none"
      )}
      onChange={(e) => {
        const selectedValue =
          e.target.value === "لطفا یک گزینه را انتخاب کنید."
            ? undefined
            : e.target.value;
        if (field?.onChange) field.onChange(selectedValue);
        if (onChange) onChange(selectedValue);
      }}
      value={field?.value ?? value}
      ref={field?.ref}
      dir={en ? "ltr" : "rtl"}
      disabled={disabled}
      {...props}
    >
      {defaultOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={classNames(
            "text-2xs lg:text-xs p-2 bg-transparent rounded border-[0.5px] border-solid border-black",
            optionClassName
          )}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
  };

  useEffect(() => {
    if (register && validation) {
      register(questionKey, validation);
    }
  }, []);

  return (
    <Fragment>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 h-screen w-screen z-[999]"
        ></div>
      ) : null}
      <div
        className={classNames(
          "bg-formItem w-full flex flex-col relative p-2 rounded",
          containerClassName,
          {
            "field-error": error,
            "z-[1000]": isOpen,
          }
        )}
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Label
          className={classNames(labelClassName, labelDirectionStyle[divider])}
          userGuide={userGuide}
          educationalContent={educationalContent}
          archive={archive ? { ...archive, questionKey } : false}
          label={label}
          required={validation ? validation.required : null}
          en={en}
          more={labelMore}
          disabled={disabled}
        />
        {divider && (
          <Divider
            className={classNames(dividerClassName)}
            position={divider}
          />
        )}
        {search ? (
          <div className="relative w-full">
            <div
              className="flex items-center px-1 justify-between w-full rounded border-[0.5px] border-black py-0.5 md:py-[3px] lg:py-[5px] bg-formItemInput cursor-pointer select-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={"text-2xs lg:text-xs xl:text-[13px] font-400"}>
                {value
                  ? defaultOptions?.find((o) => o.value == value)?.label
                  : "لطفا یک گزینه را انتخاب کنید."}
              </span>
              <IoChevronDownOutline
                className={` ${isOpen ? "rotate-180 transition-all" : ""}`}
              />
            </div>
            {isOpen ? (
              <div className="absolute left-0 bottom-0 translate-y-full flex flex-col rounded-b w-full transition-all z-10">
                <div className="bg-formItem2 p-1 rounded w-full">
                  <TextField
                    icon={<img src={searchIcon} alt="جستجو" loading="lazy" />}
                    placeholder={
                      placeholder || '"حداقل ۲ حرف از نام دارو را وارد کنید."'
                    }
                    value={searchValue}
                    disabled={disabled}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                {searchValue?.length >= 2 ? (
                  options.filter((o) => o.label.includes(searchValue))
                    ?.length ? (
                    <ul className="flex flex-col divide-y divide-solid divide-gray-200 max-h-[200px] overflow-y-scroll bg-[#f7f7f7] shadow-md">
                      {options
                        .filter((o) => o.label.includes(searchValue))
                        .map((o) => (
                          <li
                            key={o.label}
                            onClick={() => {
                              onChange(o.value);
                              setIsOpen(false);
                            }}
                            className="p-2 text-2xs lg:text-xs font-500 hover:bg-gray-200 cursor-pointer"
                          >
                            {o.label}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <span className="py-3 px-2 text-2xs lg:text-xs font-500 bg-gray-200">
                      موردی یافت نشد.
                    </span>
                  )
                ) : null}
              </div>
            ) : null}
          </div>
        ) : hasController ? (
          <Controller
            control={control}
            name={questionKey}
            rules={validation}
            render={({ field }) => renderSelect({ field })}
          />
        ) : (
          renderSelect({ field: { value, onChange, ref: null } })
        )}

        {error ? (
          <span className="error">
            {<BiError className="text-xs lg:text-base" />}
            {error}
          </span>
        ) : null}
      </div>
    </Fragment>
  );
};
