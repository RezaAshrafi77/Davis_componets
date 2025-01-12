/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import classNames from "classnames";

export const Dropdown = ({ label, options, onChange, containerClassName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 h-full w-full z-[999]"
        ></div>
      ) : null}
      <div
        className={classNames(
          containerClassName,
          " flex items-center gap-2 select-none relative bg-white rounded px-1 lg:px-2 py-1.5 md:py-1 min-w-fit cursor-pointer",
          isOpen ? "z-[1000]" : ""
        )}
        onClick={toggleDropdown}
      >
        <div className={"flex items-center lg:gap-1 lg:py-1"}>
          <span className={"text-3xs md:text-2xs lg:text-xs"}>{label}</span>
        </div>
        <IoChevronDownOutline
          className={`transition-all text-2xs lg:text-sm ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <ul
          className={`md:-left-1 absolute -bottom-1 translate-y-full md:translate-y-0 md:bottom-0 md:-translate-x-full transition-all md:mr-2 divide-y divide-gray-200 bg-white rounded overflow-hidden z-50 min-w-full md:min-w-fit ${
            isOpen ? "py-2" : "h-0"
          }`}
        >
          {options.map((item) => (
            <li
              key={item.label}
              className={
                " py-1.5 md:py-2 px-2 text-3xs md:text-2xs lg:text-xs hover:bg-formItemInput lg:px-3 !min-w-fit"
              }
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
