/* eslint-disable react/prop-types */
import classNames from "classnames";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BsCalendar2Event } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import Label from "../Label";
import styles from "./styles.module.css";
import { Controller } from "react-hook-form";
import Divider from "../Divider";
import CalendarSVG from "../../assets/icons/calendar.svg";

const DateInput = ({
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
    />
  ),
  archive,
  errorIcon,
  divider,
  dividerClassName,
}) => {
  const isError = !!errors[id];
  const errorMessage = "پر کردن این قسمت الزامیست.";

  return (
    <div
      className={classNames(
        styles.container,
        containerClassName,
        isError && "field-error"
      )}
    >
      {/* Label */}
      <Label
        label={label}
        required={required}
        className={labelClassName}
        archive={archive ? { ...archive, questionKey: id } : false}
      />
      {divider && (
        <Divider
          className={classNames(
            dividerClassName,
            "mx-auto mt-1 mb-2 block w-1/2"
          )}
        />
      )}
      {/* Input Field */}
      <div className={classNames(className, "group", styles.field)}>
        <Controller
          control={control}
          name={id}
          rules={{ required }}
          render={({ field: { onChange } }) => (
            <DatePicker
              inputClass={styles.dateInput}
              placeholder={placeholder}
              calendar={calendar}
              locale={locale}
              format={format}
              containerClassName={styles.dateInputContainer}
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
              "group-hover:text-success text-gray-500 inline"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      {/* Error Message */}
      {isError && (
        <span className="error">
          {errorIcon || <BiError className="text-xs lg:text-base" />}
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default DateInput;
