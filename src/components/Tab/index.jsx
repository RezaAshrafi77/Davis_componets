/* eslint-disable react/prop-types */
import { forwardRef, Fragment, useState } from "react";
import classNames from "classnames";
import { Button } from "../Button";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

export const Tab = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ active, tabs, onChange, containerClassName, en = false }, ref) => {
    const [selectedTabs, setSelectedTabs] = useState([]);
    return (
      <div className={classNames("flex w-full", containerClassName)}>
        <Button
          onClick={() =>
            ref.current.scrollTo({
              left: (ref.current.scrollLeft += window.innerWidth * 0.4),
              behavior: "smooth",
            })
          }
          className={classNames(styles.arrow, "!rounded-l-none")}
          icon={
            <GoChevronLeft
              color="black"
              className="rotate-180 mx-auto lg:text-xl"
            />
          }
        />
        <div
          className={classNames(styles.list, en ? "flex-row-reverse" : "")}
          ref={ref}
        >
          <RenderList
            tabs={tabs}
            active={active}
            deep={0}
            setSelectedTabs={setSelectedTabs}
            selectedTabs={selectedTabs}
            en={en}
            onChange={onChange}
          />
        </div>
        <Button
          onClick={() =>
            ref.current.scrollTo({
              left: (ref.current.scrollLeft -= window.innerWidth * 0.4),
              behavior: "smooth",
            })
          }
          icon={<GoChevronLeft color="black" className="mx-auto lg:text-xl" />}
          className={classNames(styles.arrow, "!rounded-r-none")}
        />
      </div>
    );
  }
);

const RenderList = ({
  tabs,
  active,
  deep,
  onChange,
  en,
  setSelectedTabs,
  selectedTabs,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleDropdownClick = (e, item) => {
    e.stopPropagation();

    if (activeDropdown === item.title) {
      setActiveDropdown(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setActiveDropdown(item.title);
    }
  };

  return tabs.map((item) =>
    item.tabs ? (
      <div
        className={classNames(
          "flex gap-1 h-full",
          en ? "flex-row-reverse" : ""
        )}
        key={item.title}
      >
        <div
          className={classNames(
            styles.dropdown,
            activeDropdown == item.title
              ? "!bg-success"
              : item.tabs.some((sItem) => selectedTabs.includes(sItem.title))
              ? styles["dropdown-gradient"]
              : styles["dropdown-default"],
            "flex justify-between items-center px-2 rounded cursor-pointer",
            en ? "flex-row-reverse" : "flex-row",
            deep > 0 ? "!py-1 !my-auto" : "py-2"
          )}
          onClick={(e) => handleDropdownClick(e, item)}
        >
          <span
            className={classNames(
              activeDropdown == item.title ? "!text-white" : "",
              "text-2xs lg:text-xs xl:text-sm font-600 select-none"
            )}
          >
            {item.title}
          </span>
          <GoChevronDown
            color={activeDropdown == item.title ? "white" : "black"}
            className={classNames(
              "transition-transform duration-300",
              activeDropdown == item.title ? "rotate-180" : "rotate-0"
            )}
          />
          {activeDropdown == item.title ? (
            <Fragment>
              {createPortal(
                <div
                  className="absolute min-w-[28vw] md:min-w-[20vw] lg:min-w-[15vw] xl:min-w-[12vw] z-[1000]"
                  style={{
                    top: dropdownPosition.top + 4,
                    left: dropdownPosition.left,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.tabs.map((subItem) => (
                    <Button
                      key={subItem.title}
                      className={classNames(
                        "px-4 py-2 w-full text-left select-none",
                        styles.innertab
                      )}
                      onClick={() => {
                        setActiveDropdown(null);
                        if (deep != 0) {
                          const sTabs = selectedTabs;
                          selectedTabs[deep] = subItem.title;
                          setSelectedTabs(sTabs);
                        } else {
                          setSelectedTabs([subItem.title]);
                        }
                        onChange(subItem);
                      }}
                      title={subItem.title}
                    />
                  ))}
                </div>,
                document.body
              )}
              {createPortal(
                <div
                  onClick={() => setActiveDropdown(false)}
                  className="fixed top-0 left-0 h-full w-full z-[999]"
                ></div>,
                document.body
              )}
            </Fragment>
          ) : null}
        </div>
        {item.tabs.some((sItem) => selectedTabs.includes(sItem.title)) ? (
          <RenderList
            tabs={[
              item.tabs.find((sItem) => selectedTabs.includes(sItem.title)),
            ]}
            active={active}
            onChange={onChange}
            setSelectedTabs={setSelectedTabs}
            selectedTabs={selectedTabs}
            deep={deep + 1}
            en={en}
          />
        ) : null}
      </div>
    ) : (
      <Button
        key={item.title}
        className={classNames(
          "!select-none",
          deep > 0 ? "!my-auto" : "!py-2",
          active?.title == item.title
            ? styles["tab-active"]
            : styles["tab-inactive"]
        )}
        onClick={() => {
          if (deep != 0) {
            const sTabs = selectedTabs;
            selectedTabs[deep - 1] = item.title;
            setSelectedTabs(sTabs);
          } else {
            setSelectedTabs([item.title]);
          }
          onChange(item);
        }}
        title={item.title}
      />
    )
  );
};

Tab.displayName = "Tab";
