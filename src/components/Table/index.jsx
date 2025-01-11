/* eslint-disable react/prop-types */
import classNames from "classnames";
import { IoPrintOutline } from "react-icons/io5";
import { Button } from "../Button";
import styles from "./styles.module.css";
import { Dropdown } from "../Dropdown";
import { excelOptions, tableSizeList } from "./data";
import { exportTableToExcel } from "../../utils/helpers";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";

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
}) => {
  const [downloadMode, setDownloadMode] = useState("excel");
  const tableId = Math.floor(Math.random() * 10) + 1;

  const handleDownload = () => {
    console.log("hi");
    if (downloadMode == "csv") {
      return;
    } else {
      exportTableToExcel("table" + tableId);
    }
  };

  return rows?.length ? (
    <div className={classNames(styles.container, containerClassName)}>
      <div className="w-full overflow-x-auto">
        <table
          className={classNames(
            styles.table,
            className,
            selectable ? styles.selectable : "",
            stripe ? styles.stripe : ""
          )}
          id={"table" + tableId}
        >
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              {columns.map((colTitle, index) => (
                <th key={index} scope="col" className={styles.th}>
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
                    className={styles.td}
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
        <div className={styles.pagination}>
          <div className={classNames("hidden md:flex")}>{children}</div>
          <div
            className={classNames(
              styles["default-options"],
              " flex-1 md:max-w-fit flex-wrap md:flex-nowrap"
            )}
          >
            <div className={classNames("flex md:hidden min-w-fit md:mr-auto")}>
              {children}
            </div>
            <Button
              variant="icon"
              className={styles.next}
              onClick={() => window.print()}
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
                className={styles.next + " " + "!rounded-r-none"}
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
              className={styles.next}
              title={"ابتدا"}
              variant=""
              onClick={() => setPage(1)}
            />
            <div className="flex gap-1">
              <Button
                className={styles.next}
                disabled={page == 1}
                variant={page == 1 ? "disabled" : ""}
                title={"قبلی"}
                onClick={() => setPage(Math.max(page - 1, 1))}
              />
              <div className={styles["current-page"]}>{page}</div>
              <Button
                className={styles.next}
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
