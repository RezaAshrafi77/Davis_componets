/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { FaFileCircleXmark } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import Button from "../Button";
import Radio from "../Radio";
import Label from "../Label";
import Divider from "../Divider";
import { BiError } from "react-icons/bi";
import styles from "./styles.module.css";

const FileField = ({
  value,
  setValue,
  onChange,
  watch,
  label,
  required,
  register,
  questionKey,
  errors,
  divider = true,
  dividerClassName,
  buttonClassName,
  containerClassName,
  archive,
  labelClassName,
  className,
  baseURL,
  userGuide,
  educationalContent,
  disabled,
}) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (required && register) {
      register(questionKey, { required: true });
    }
  }, [required, register, questionKey]);

  const handleFileChange = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (setValue) {
      setValue(questionKey, file);
    } else {
      onChange(file);
    }
  };

  const winOpen = (link) => {
    const url = `${baseURL.substring(0, baseURL.length - 5)}${link}`;
    window.open(url, "_blank");
  };

  const handleDisplayFile = () => {
    const fileLink = watch ? watch(questionKey) : value;
    if (typeof fileLink === "string") {
      winOpen(fileLink);
    } else if (fileLink) {
      window.open(URL.createObjectURL(fileLink), "_blank");
    }
  };

  const deleteFile = () => {
    setOpenModal(true);
  };

  const handleRadioChange = (value) => {
    if (value === "10361") {
      const resetFile = null;
      if (setValue) {
        setValue(questionKey, resetFile);
      } else {
        onChange(resetFile);
      }
      setOpenModal(false);
    } else if (value === "10362") {
      setOpenModal(false);
    }
  };

  const isError = !!errors[questionKey];

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : `${text.slice(0, maxLength / 2)}...${text.slice(-maxLength / 2)}`;
  };

  const filename = useCallback(
    (file) =>
      typeof file === "string" ? truncateText(file) : truncateText(file.name),
    []
  );

  const renderFileInfo = () => {
    const fileToDisplay = value || watch(questionKey);
    return fileToDisplay ? filename(fileToDisplay) : "انتخاب فایل";
  };

  return (
    <div
      className={classNames(styles.uploadContainer, containerClassName, {
        "field-error": isError,
      })}
    >
      <Label
        archive={
          archive
            ? {
                ...archive,
                questionKey: "1578722574644",
                renderCell:
                  archive.renderCell ||
                  ((val) => (
                    <span
                      className="text-green"
                      onClick={() => winOpen(val.slice(1, -1))}
                    >
                      نمایش فایل
                    </span>
                  )),
              }
            : false
        }
        className={classNames(styles.label, labelClassName)}
        required
        label={label}
        userGuide={userGuide}
        educationalContent={educationalContent}
      />
      {divider && (
        <Divider
          className={classNames(dividerClassName, "mx-auto my-2 block w-full")}
        />
      )}

      <div className={styles.uploadPart}>
        <Button
          variant={value || watch(questionKey) ? "outlined" : "disabled"}
          className={classNames(buttonClassName, styles.button)}
          title={value || watch(questionKey) ? "نمایش فایل" : "انتخاب فایل"}
          onClick={handleDisplayFile}
        />

        <div
          className={classNames(styles.uploadShow, {
            "!bg-white": value || watch(questionKey),
            "!bg-white-f5": !value && !watch(questionKey),
          })}
        >
          <label className={classNames(styles.inputField, className)}>
            <span className="z-[1] font-600 text-2xs lg:text-xs">
              {renderFileInfo()}
            </span>
            <input
              type="file"
              className={classNames(
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                styles.input
              )}
              onChange={handleFileChange}
              disabled={false}
            />
            <Button
              variant="text"
              onClick={value || watch(questionKey) ? deleteFile : null}
              icon={
                value || watch(questionKey) ? (
                  <FaFileCircleXmark
                    color={openModal ? "#960018" : "#04900a"}
                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                  />
                ) : (
                  <MdOutlineFileUpload
                    color="#7B7B7B"
                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                  />
                )
              }
              className={value || watch(questionKey) ? "z-20" : ""}
            />
          </label>
        </div>
      </div>

      {openModal && (
        <div className={styles.confirmBox}>
          <Label
            className="self-center"
            label="آیا مایل به حذف فایل انتخاب شده هستید؟"
          />
          <Divider />
          <div className="flex justify-between w-full">
            {[
              { label: "بله", value: "10361" },
              { label: "خیر", value: "10362" },
            ].map((option) => (
              <Radio
                key={option.value}
                label={option.label}
                id={option.value}
                name="booleanOption"
                value={option.value}
                checked={false}
                onClick={() => handleRadioChange(option.value)}
                onChange={(e) => e.preventDefault()}
              />
            ))}
          </div>
        </div>
      )}

      {isError && (
        <span className="text-error">
          <BiError className="text-xs lg:text-base" />
          {"این بخش اجباری است."}
        </span>
      )}
    </div>
  );
};

export default FileField;
