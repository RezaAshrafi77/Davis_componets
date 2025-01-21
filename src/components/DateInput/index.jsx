/* eslint-disable react/prop-types */
import classNames from "classnames";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BiError } from "react-icons/bi";
import { Controller } from "react-hook-form";
import { Divider } from "../Divider";
import { Label } from "../Label";
import CalendarSVG from "../../assets/icons/calendar.svg";
import styles from "./styles.module.css";

export const DateInput = ({
  label,
  id,
  control,
  containerClassName,
  className,
  required = false,
  errors = {},
  watch,
  labelClassName,
  placeholder = "روز/ ماه/ سال",
  format = "YYYY/MM/DD",
  calendar = persian,
  locale = persian_fa,
  icon = (
    <img
      src={CalendarSVG}
      className="h-[13px] w-[13px] lg:h-[19px] lg:w-[19px]"
      loading="lazy"
      alt="تاریخ"
    />
  ),
  archive,
  divider,
  dividerClassName,
  disabled,
  userGuide,
  educationalContent,
}) => {
  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
  };

  const error = errors[id]?.message;

  return (
    <div
      className={classNames(
        "w-full flex flex-col p-2 bg-formItem rounded relative",
        containerClassName,
        error && "field-error"
      )}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Label */}
      <Label
        label={label}
        required={required}
        className={classNames(labelClassName, labelDirectionStyle[divider])}
        archive={archive ? { ...archive, questionKey: id } : false}
        disabled={disabled}
        userGuide={userGuide}
        educationalContent={educationalContent}
      />
      {divider && (
        <Divider
          className={classNames(
            dividerClassName,
            "mx-auto mt-1 mb-2 block w-1/2"
          )}
          position={divider}
        />
      )}
      {/* Input Field */}
      <div
        className={classNames(
          className,
          styles.field,
          "group bg-formItemInput border-[0.5px] border-black rounded relative transition-all duration-200 hover:border-success hover:bg-white focus-within:ring-1 focus-within:border-success focus-within:ring-success"
        )}
      >
        <Controller
          control={control}
          name={id}
          render={({ field: { onChange } }) => (
            <DatePicker
              inputClass={
                styles.dateInput +
                " " +
                `w-full font-400 text-3xs md:text-2xs lg:text-xs xl:text-sm text-black 
              placeholder:text-3xs md:placeholder:text-2xs lg:placeholder:text-xs bg-transparent border-none outline-none py-1 pr-1 lg:pr-1.5 hover:bg-white hover:border-black`
              }
              placeholder={placeholder}
              calendar={calendar}
              locale={locale}
              format={format}
              containerClassName={
                "w-full relative !flex justify-center items-center"
              }
              calendarPosition="top"
              fixMainPosition={false}
              fixRelativePosition={false}
              showOtherDays
              value={watch(id) || ""}
              onChange={(date) => onChange(date ? date.toString() : "")}
            />
          )}
        />
        {/* Calendar Icon */}
        {icon && (
          <span
            className={classNames(
              styles.icon,
              "absolute left-1 lg:left-1.5 top-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer",
              "group-hover:text-success text-gray-500 inline"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      {/* Error Message */}
      {error && (
        <span className="error">
          {<BiError className="text-xs lg:text-base" />}
          {error}
        </span>
      )}
    </div>
  );
};
