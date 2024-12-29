/* eslint-disable react/prop-types */
import classNames from "classnames"
import { IoPrintOutline } from "react-icons/io5"
import Button from "../Button"
import styles from "./styles.module.css"
import Dropdown from "../Dropdown"
import { tableSizeList } from "./data"

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
    colFilter,
    colors,
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
                                <th
                                    key={index}
                                    scope="col"
                                    className={styles.th}
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
                                        className={styles.td}
                                        style={{
                                            backgroundColor: colors?.length
                                                ? colors.find(
                                                      (color) =>
                                                          color.value ==
                                                          row[colFilter]
                                                  )?.color
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
                    <div className={classNames("hidden md:flex flex-1")}>
                        {children}
                    </div>
                    <div
                        className={classNames(
                            styles["default-options"],
                            " flex-1 md:max-w-fit flex-wrap md:flex-nowrap"
                        )}
                    >
                        <div
                            className={classNames(
                                "flex md:hidden flex-1 min-w-fit"
                            )}
                        >
                            {children}
                        </div>
                        <Button
                            variant="icon"
                            className={styles.next}
                            onClick={() => window.print()}
                            icon={
                                <IoPrintOutline className="text-xs  md:text-base cursor-pointer bg-white lg:!text-xl" />
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
                                disabled={
                                    Math.floor(rows?.length / tableSize) == 0
                                }
                                variant={
                                    Math.floor(rows?.length / tableSize) == 0
                                        ? "disabled"
                                        : ""
                                }
                                onClick={() => setPage(page + 1)}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    ) : null
}

export default Table
