/* eslint-disable react/prop-types */
import classNames from "classnames";
import { IoPrintOutline } from "react-icons/io5";
import Button from "../Button";
import styles from "./styles.module.css";
import Dropdown from "../Dropdown";
import { tableSizeList } from "./data";

const Table = ({
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
}) => {
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
                  <td key={"table-td" + j} className={styles.td}>
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
          <div className={styles["dynamic-options"]}>{children}</div>
          <div className={styles["default-options"]}>
            <Button
              variant="icon"
              className={styles.next}
              onClick={() => window.print()}
              icon={
                <IoPrintOutline className="cursor-pointer bg-white !text-xl" />
              }
            />
            {tableSizes?.length ? (
              <Dropdown
                label={"نمایش به صورت :"}
                value={tableSize}
                options={tableSizes}
                onChange={(val) => setTableSize(val)}
              />
            ) : null}
            <Button
              className={styles.next}
              variant={page == 1 ? "disabled" : ""}
              title={"قبلی"}
              onClick={() => setPage(Math.max(page - 1, 1))}
            />
            <div className={styles["current-page"]}>{page}</div>
            <Button
              className={styles.next}
              title={"بعدی"}
              variant={
                Math.floor(rows?.length / tableSize) == 0 ? "disabled" : ""
              }
              onClick={() => setPage(page + 1)}
            />
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Table;
