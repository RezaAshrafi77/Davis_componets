/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import Page from "../../components/Page";
import Table from "../../components/Table";
import Header from "./layouts/Header";
import { tableSizeList } from "../../components/Table/data";
import { Table_Columns } from "./layouts/Header/data";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Radio from "../../components/Radio";

export default function SpecialistDashboardPage({
  tableColumns = Table_Columns,
  getUsers = () => {},
  title,
  rows,
  loading,
  colFilter,
  colors,
}) {
  const { register, watch, control, handleSubmit } = useForm({
    mode: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState(tableSizeList[0].value);
  const [activeFilterOption, setAFO] = useState(null);

  useEffect(() => {
    onSubmit();
  }, [tableSize, currentPage]);

  const onSubmit = () => {
    const formData = {
      6620: watch("6620") || null,
      from_date: watch("from_date") || null,
      end_date: watch("end_date") || null,
      limit: tableSize,
      offset: Number(tableSize * (Number(currentPage) - 1)),
    };
    getUsers({ formData });
  };

  const filterOptions = useMemo(
    () =>
      colFilter ? [...new Set(rows.map((row) => row[colFilter - 1]))] : null,
    [colFilter, rows]
  );

  const _rows = useMemo(() => {
    if (activeFilterOption) {
      return rows.filter((row) => row[colFilter - 1] == activeFilterOption);
    } else return rows;
  }, [activeFilterOption, rows]);

  return (
    <Page back={true}>
      <div className="flex flex-col flex-1 gap-4">
        <Header
          loading={loading}
          watch={watch}
          register={register}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          title={title}
        />
        {rows?.length ? (
          <Table
            columns={tableColumns}
            rows={_rows}
            page={currentPage}
            className={styles.table}
            setPage={setCurrentPage}
            setTableSize={setTableSize}
            colFilter={colFilter ? colFilter - 1 : null}
            colors={colors}
            tableSize={tableSize}
            pagination
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
                      className={styles.filterRadio}
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
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </Table>
        ) : null}
      </div>
    </Page>
  );
}
