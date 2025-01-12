/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Header } from "./layouts/Header";
import { tableSizeList } from "../../components/Table/data";
import { Table_Columns } from "./layouts/Header/data";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { Radio } from "../../components/Radio";
import moment from "jalali-moment";
import { Divider } from "../../components/Divider";
import emptySVG from "../../assets/images/empty.svg";
import classNames from "classnames";

export function SpecialistDashboardPage({
  tableColumns = Table_Columns,
  getUsers = () => {},
  title,
  users,
  colFilter,
  colors,
  loading,
}) {
  const { register, watch, control, setValue } = useForm({
    mode: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState(tableSizeList[0].value);
  const [activeFilterOption, setAFO] = useState(null);

  const filteredRows = activeFilterOption
    ? users
        ?.map((row, index) => [
          (currentPage - 1) * tableSize + index + 1,
          row["fn"],
          row["6620"],
          row["4946"],
          moment(row["date_paziresh"])
            .locale("fa")
            .format("HH:MM - YYYY/MM/DD"),
          row["vazeiat"],
          row["doctor_fn"],
        ])
        .filter((row) => row[colFilter - 1] == activeFilterOption)
    : [[]];

  const rows = users?.map((row, index) => [
    (currentPage - 1) * tableSize + index + 1,
    row["fn"],
    row["6620"],
    row["4946"],
    moment(row["date_paziresh"]).locale("fa").format("HH:MM - YYYY/MM/DD"),
    row["vazeiat"],
    row["doctor_fn"],
  ]);

  useEffect(() => {
    setValue("from_date", moment().locale("fa").format("YYYY/MM/DD"));
    setValue("end_date", moment().locale("fa").format("YYYY/MM/DD"));
  }, []);

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const formData = {
      6620: watch("6620") || null,
      from_date: watch("from_date") || null,
      end_date: watch("end_date") || null,
      limit: tableSize,
      offset: Number(tableSize * (Number(currentPage) - 1)),
    };
    getUsers({ formData });
  };

  useEffect(() => {
    onSubmit();
  }, [tableSize, currentPage]);

  const filterOptions =
    colFilter && users?.length
      ? [...new Set(rows?.map((row) => row[colFilter - 1]))]
      : [];

  return (
    <div className="flex flex-col flex-1 gap-4">
      <Header
        loading={loading}
        watch={watch}
        register={register}
        setPage={setCurrentPage}
        control={control}
        onSubmit={onSubmit}
        title={title}
      />
      <Divider position="center" className={"!mt-0"} />
      {rows?.length ? (
        <Table
          columns={tableColumns}
          rows={activeFilterOption ? filteredRows : rows}
          page={currentPage}
          setPage={setCurrentPage}
          setTableSize={setTableSize}
          colFilter={colFilter ? colFilter - 1 : null}
          colors={colors}
          tableSize={tableSize}
          pagination
          selectable
          containerClassName={loading ? "blur-sm" : ""}
        >
          {colFilter && filterOptions?.length > 1 ? (
            <div className="flex items-center h-full pr-2 gap-4">
              <span className="text-2xs lg:text-xs font-700">
                نمایش بر اساس :
              </span>
              <div className="flex items-center gap-4">
                {filterOptions.map((o) => (
                  <Radio
                    key={o}
                    label={o}
                    className={classNames(
                      styles.filterRadio,
                      "!bg-transparent !border-none !gap-[1px] lg:!gap-1 !py-0 !px-0"
                    )}
                    name={"filter"}
                    value={o}
                    checked={o == activeFilterOption}
                    onClick={() => {
                      if (activeFilterOption == o) {
                        setAFO(null);
                      } else {
                        setAFO(o);
                      }
                    }}
                    onChange={(e) => e}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Table>
      ) : (
        <img src={emptySVG} alt="" className="h-2/3 m-auto" loading="lazy" />
      )}
    </div>
  );
}
