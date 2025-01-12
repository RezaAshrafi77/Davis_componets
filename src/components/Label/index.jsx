/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react";
import { Modal } from "../Modal";
import { ArchiveTable } from "../../layouts/ArchiveTable";
import styles from "./styles.module.css"; // Import your CSS module
import GuideIcon from "../../assets/icons/guide.svg";
import ArchiveIcon from "../../assets/icons/archive.svg";
import DangerIcon from "../../assets/icons/danger.svg";
import WarningIcon from "../../assets/icons/warning.svg";
import { MdOutlineMoreHoriz } from "react-icons/md";
import useDevice from "../../hooks/useDevice";
import classNames from "classnames";
import { MdChevronLeft } from "react-icons/md";

export const Label = ({
  label,
  required,
  className,
  userGuide,
  archive,
  educationalContent,
  en,
  more,
}) => {
  const labelRef = useRef(null);
  const spanRef = useRef(null);
  const [truncatedText, setTruncatedText] = useState(label);
  const [openModal, setOpenModal] = useState({
    userGuide: false,
    archive: false,
  });
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [device] = useDevice();
  const [showMore, setShowMore] = useState(more);
  const buttonWidth = 30;
  const gap = 4;

  const handleModalToggle = (type) => {
    setOpenModal((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    const measureWidth = () => {
      if (labelRef.current && spanRef.current) {
        const labelWidth = labelRef.current.offsetWidth;
        const textWidth = spanRef.current.offsetWidth;

        // Check if text exceeds available width
        if (
          textWidth + (device == "desktop" ? 100 : 40) >
          labelWidth - (buttonWidth + gap)
        ) {
          let newText = label;
          let words = newText.split(" ");
          let truncated = "";
          for (let word of words) {
            spanRef.current.innerText = truncated + word + " ";
            if (
              spanRef.current.offsetWidth >
              labelWidth - (buttonWidth + gap)
            ) {
              break;
            }
            truncated += word + " ";
          }

          setTruncatedText(truncated.trim() + "");
          setShowMore(true);
        } else {
          setTruncatedText(label);
          setShowMore(false);
        }
      }
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);

    return () => window.removeEventListener("resize", measureWidth);
  }, [label]);

  return (
    <Fragment>
      {openMoreBox ? (
        <div
          onClick={() => setOpenMoreBox(false)}
          className="fixed top-0 left-0 h-full w-full z-[999]"
        ></div>
      ) : null}
      <label
        className={classNames(
          className,
          styles.label,
          "flex items-center font-700 text-black text-3xs md:text-2xs lg:text-xs xl:text-sm overflow-hidden",
          en
            ? styles.enLabel +
                " " +
                "relative flex items-center text-3xs text-black md:text-2xs lg:text-xs xl:text-sm"
            : styles.label,
          showMore ? "w-full z-[1000]" : "relative",
          "select-none"
        )}
        dir={en ? "ltr" : ""}
        ref={labelRef}
      >
        {showMore ? (
          <Fragment>
            <span
              ref={spanRef}
              className={
                en
                  ? styles.truncatedTextEn +
                    " " +
                    "text-3xs text-black md:text-2xs lg:text-xs xl:text-sm"
                  : "font-700 text-black text-3xs md:text-2xs lg:text-xs xl:text-sm"
              }
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              {truncatedText}
            </span>
            <MdOutlineMoreHoriz
              onClick={() => {
                setOpenMoreBox(true);
              }}
              className="text-lg lg:text-xl hover:cursor-pointer"
              style={{
                width: `${buttonWidth}px`,
                marginRight: `${gap}px`,
                cursor: "pointer",
              }}
            />
          </Fragment>
        ) : (
          label
        )}
        {required && (
          <span
            className={
              styles.required +
              " " +
              (en
                ? "ml-1 md:text-sm lg:text-lg !leading-none"
                : "mr-1 md:text-sm lg:text-lg")
            }
          >
            *
          </span>
        )}
        {userGuide && (
          <img
            src={GuideIcon}
            alt="راهنما"
            onClick={() => handleModalToggle("userGuide")}
            className={`w-[20px] md:w-[30px] cursor-pointer`}
          />
        )}
        {archive && (
          <img
            src={ArchiveIcon}
            alt="آرشیو"
            onClick={() => handleModalToggle("archive")}
            className={`w-[15px] md:w-[17px] cursor-pointer`}
          />
        )}

        {educationalContent?.show && (
          <img
            src={
              educationalContent?.type == "danger" ? DangerIcon : WarningIcon
            }
            alt="محتوای آموزشی"
            onClick={() => educationalContent.action()}
            className={`${styles.eduIcon} absolute top-1/2 -translate-y-1/2 w-[15px] md:w-[17px] cursor-pointer ${educationalContent.className}`}
          />
        )}

        <Modal
          isOpen={openModal.userGuide || openModal.archive}
          onClose={() => setOpenModal({ userGuide: false, archive: false })}
          containerClassName={styles.modalContainer}
        >
          {openModal.userGuide ? userGuide : null}
          {openModal.archive ? <ArchiveTable options={archive} /> : null}
        </Modal>
        {openMoreBox ? (
          <div
            className={classNames(
              "animate-flipBottom border-x-[12px] border-y-4 border-opacity-40 backdrop-blur-md border-formItem2 rounded-md bg-white flex flex-col gap-0.5 absolute left-0 top-0 w-full min-h-full max-h-full overflow-y-auto xs:!leading-4 lg:!leading-5 lg:!text-[11px] xl:!text-sm text-justify p-1",
              en
                ? styles.truncatedTextEn +
                    " " +
                    "text-3xs text-black md:text-2xs lg:text-xs xl:text-sm"
                : '"font-700 text-black text-3xs md:text-2xs lg:text-xs xl:text-sm"'
            )}
          >
            {label}
            <div
              className={
                "mr-auto flex items-center md:text-3xs lg:text-2xs xl:text-xs cursor-pointer mt-auto"
              }
              onClick={() => setOpenMoreBox(false)}
            >
              بازگشت{" "}
              <MdChevronLeft className="text-2xs lg:text-sm xl:text-lg" />
            </div>
          </div>
        ) : null}
      </label>
    </Fragment>
  );
};
