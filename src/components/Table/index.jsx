/* eslint-disable react/prop-types */
import classNames from "classnames";
import { IoPrintOutline } from "react-icons/io5";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { excelOptions, tableSizeList } from "./data";
import { exportTableToExcel, printPartOfPage } from "../../utils/helpers";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import styles from "./styles.module.css";

export const Table = ({
  className,
  containerClassName,
  columns,
  rows,
  pagination,
  page,
  setPage,
  tableSize = tableSizeList[0].value,
  setTableSize,
  tableSizes = tableSizeList,
  selectable,
  stripe,
  children,
  onSelect = () => {},
  colFilter,
  colors,
  en,
}) => {
  const [downloadMode, setDownloadMode] = useState("excel");
  const tableId = Math.floor(Math.random() * 10) + 1;

  const handleDownload = () => {
    if (downloadMode == "csv") {
      return;
    } else {
      exportTableToExcel("table" + tableId);
    }
  };

  return rows?.length ? (
    <div className={classNames("flex flex-col w-full", containerClassName)}>
      <div className="w-full overflow-x-auto">
        <table
          className={classNames(
            "border-separate whitespace-nowrap overflow-x-auto border-spacing-[2px] w-full",
            className,
            selectable ? styles.selectable : "",
            stripe ? styles.stripe : ""
          )}
          id={"table" + tableId}
          dir={en ? "ltr" : "rtl"}
        >
          <thead className={styles.thead}>
            <tr className={styles.tr + " " + "shadow-sm"}>
              {columns.map((colTitle, index) => (
                <th
                  key={index}
                  scope="col"
                  className={
                    "bg-formItem shadow-md font-600 text-2xs lg:text-xs xl:text-sm text-center rounded-md px-4 py-2.5"
                  }
                >
                  {colTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {rows?.map((row, i) => (
              <tr
                className={classNames(styles.tr, "group")}
                key={"table-row" + i}
                onClick={() => onSelect(i)}
              >
                {row?.map((_, j) => (
                  <td
                    key={"table-td" + j}
                    className={
                      styles.td +
                      " " +
                      "transition-all rounded-md border-[0.5px] shadow-md text-2xs lg:text-xs xl:text-[13px] font-400 bg-white text-center p-2 lg:whitespace-pre-wrap"
                    }
                    style={{
                      backgroundColor: colors?.length
                        ? colors.find((color) => color.value == row[colFilter])
                            ?.color
                        : "",
                    }}
                  >
                    {_}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <div
          className={
            "w-full flex justify-between rounded-b-md shadow-md mt-0.5 py-1 bg-[#f1f1f1] px-1.5"
          }
        >
          <div className={classNames("hidden md:flex")}>{children}</div>
          <div
            className={classNames(
              "flex !gap-1 items-center",
              " flex-1 md:max-w-fit flex-wrap md:flex-nowrap"
            )}
          >
            <div className={classNames("flex md:hidden min-w-fit md:mr-auto")}>
              {children}
            </div>
            <Button
              variant="icon"
              className={
                "text-2xs lg:text-xs border-none min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 text-center rounded shadow-sm hover:scale-110 transition-all bg-white"
              }
              onClick={() => printPartOfPage("table" + tableId)}
              icon={
                <IoPrintOutline className="text-xs md:text-base cursor-pointer lg:!text-xl" />
              }
            />
            <div className="flex items-center">
              <Dropdown
                label={excelOptions.find((o) => o.value == downloadMode)?.label}
                options={excelOptions}
                onChange={(val) => setDownloadMode(val)}
                containerClassName={"!rounded-l-none"}
              />
              <Button
                variant="icon"
                className={
                  "text-2xs lg:text-xs border-none min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 text-center rounded shadow-sm hover:scale-110 transition-all bg-white" +
                  " " +
                  "!rounded-r-none"
                }
                onClick={() => handleDownload()}
                icon={
                  <FiDownload className="text-xs md:text-base cursor-pointer lg:!text-xl" />
                }
              />
            </div>
            {tableSizes?.length ? (
              <Dropdown
                label={tableSizeList.find((o) => o.value == tableSize)?.label}
                options={tableSizes}
                onChange={(val) => setTableSize(val)}
              />
            ) : null}
            <Button
              className={
                "!text-2xs lg:!text-xs border-none min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 text-center rounded shadow-sm hover:scale-110 transition-all bg-white"
              }
              title={"ابتدا"}
              variant=""
              onClick={() => setPage(1)}
            />
            <div className="flex gap-1">
              <Button
                className={
                  "!text-2xs lg:!text-xs border-none min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 text-center rounded shadow-sm hover:scale-110 transition-all bg-white"
                }
                disabled={page == 1}
                variant={page == 1 ? "disabled" : ""}
                title={"قبلی"}
                onClick={() => setPage(Math.max(page - 1, 1))}
              />
              <div
                className={
                  "!text-2xs lg:!text-xs min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 flex justify-center items-center rounded bg-white text-black"
                }
              >
                {page}
              </div>
              <Button
                className={
                  "!text-2xs lg:!text-xs border-none min-w-6 min-h-6 max-h-6 max-w-6 lg:min-w-8 lg:min-h-8 text-center rounded shadow-sm hover:scale-110 transition-all bg-white"
                }
                title={"بعدی"}
                disabled={Math.floor(rows?.length / tableSize) == 0}
                variant={
                  Math.floor(rows?.length / tableSize) == 0 ? "disabled" : ""
                }
                onClick={() => setPage(page + 1)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
