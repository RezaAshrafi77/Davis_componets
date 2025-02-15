/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState, useMemo } from "react";
import { Button } from "../../../../components/Button";
import { Radio } from "../../../../components/Radio";
import { TextField } from "../../../../components/TextField";
import { Table } from "../../../../components/Table";
import { Modal } from "../../../../components/Modal";
import { HTML } from "../../../../components/HTML";
import { FieldSet } from "../../../../components/FieldSet";
import useDevice from "../../../../hooks/useDevice";
import styles from "./styles.module.css";
import { Form_Inputs, Service_Status, Table_Columns } from "./data";
import { tableSizeList } from "../../../../components/Table/data";
import { Label } from "../../../../components/Label";
import classNames from "classnames";
import { GrRefresh } from "react-icons/gr";
import VIPIcon from "../../../../assets/images/vip.svg";
import moment from "jalali-moment";

export const Header = ({
  title = "مشخصات فردی",
  tableColumns = Table_Columns,
  request = () => {},
  vip,
  user,
  setUser,
  users = [],
  setUsers,
  JID,
  toast = () => {},
  colFilter = 6,
}) => {
  const [formData, setFormData] = useState({
    6365: null, // RF Id
    4942: null, // Full name
    6620: null, // National Code
    1585472454126: null, // daryaft shode & daryaft nashode
  });
  const [device] = useDevice();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState(tableSizeList[0].value);
  const [initialRequestControl, setIRC] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [activeFilterOption, setAFO] = useState(null);

  const offset = useMemo(() => {
    return tableSize * (currentPage - 1);
  }, [tableSize, currentPage]);

  const rows = useMemo(
    () =>
      users.map((_, i) => {
        return [
          (currentPage - 1) * tableSize + i + 1,
          _["nf"],
          _["6620"],
          _["4946"],
          _["4944"],
          <HTML data={_["services"]} key={"html" + i} />,
          _["1585472454126"],
          _["date"] ? moment(_["date"]).locale("fa").format("YYYY/MM/DD") : "",
          _["packagename"],
        ];
      }),
    [users, currentPage, tableSize]
  );

  const _filteredRows = useMemo(
    () =>
      activeFilterOption
        ? users
            .map((_, i) => [
              (currentPage - 1) * tableSize + i + 1,
              _["nf"],
              _["6620"],
              _["4946"],
              _["4944"],
              <HTML data={_["services"]} key={"html" + i} />,
              _["1585472454126"],
              _["date"]
                ? moment(_["date"]).locale("fa").format("YYYY/MM/DD")
                : "",
              _["packagename"],
            ])
            .filter((row) => row[colFilter] == activeFilterOption)
        : [[]],
    [users, colFilter, activeFilterOption, currentPage, tableSize]
  );

  useEffect(() => {
    if (initialRequestControl) {
      _getUsers();
    }
  }, [tableSize, currentPage]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIRC(initialRequestControl + 1);
    _getUsers();
  };

  const handleOnChange = (value, qKey) => {
    if (qKey == "6365") {
      setFormData((prevData) => {
        return { ...prevData, 6365: value ? value : null };
      });
      return;
    } else if (qKey == "6620") {
      setFormData((prevData) => {
        return { ...prevData, 6620: value ? value : null };
      });
      return;
    } else if (qKey == "4942") {
      setFormData((prevData) => {
        return { ...prevData, 4942: value ? value : null };
      });
    } else {
      setFormData((prevData) => {
        if (prevData[1585472454126] == value) {
          return { ...prevData, 1585472454126: null };
        } else {
          return { ...prevData, 1585472454126: value };
        }
      });
    }
  };

  const _getUsers = async () => {
    const options = {
      dataInfo: formData,
    };
    if (options.dataInfo["6365"]) {
      options.dataInfo["1558737412305"] = options.dataInfo["6365"];
      options.jobId = JID.RFID;
    } else {
      options.jobId = JID.NID;
    }
    options.dataInfo.offset = offset;
    options.dataInfo.limit = tableSize;
    setSearchLoading(true);
    await request(options)
      .then((res) => {
        if (res.error) {
          toast.error("خطای دریافت اطلاعات" + "-" + res.error_code);
        } else {
          if (res.data.length == 0) {
            toast.error("هیچ کاربری یافت نشد.");
            setShowModal(false);
            setUser(null);
          } else {
            setUsers(res.data);
            setShowModal(true);
          }
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setSearchLoading(false));
  };

  const _getUser = async (i) => {
    handleOnChange(users[i]["6620"], "6620");
    const formData = {
      6483: users[i]["6483"],
    };
    setUserInfoLoading(true);
    await request({
      jobId: JID.ID,
      dataInfo: formData,
    })
      .then((res) => {
        if (!res.error) {
          const userInfo = res?.data;
          setUser({
            ...userInfo,
            6483: users[i]["6483"], // afzoodane id user user info
            tarikh_paziresh: users[i].date, // afzoodane tarikhe paziresh be user info
          });
          if (userInfo) {
            handleOnChange(userInfo?.["4942"] || "", "4942"); // set kardan input code meli dar header
          } else {
            handleOnChange("", "4942");
          }
          setShowModal(false);
        } else {
          toast.error("خطای دریافت اطلاعات" + "-" + res.error_code);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setUserInfoLoading(false));
  };

  const refreshActive =
    (formData[6365] ||
      formData[6620] ||
      formData[4942] ||
      formData[1585472454126]) &&
    user;

  const filterOptions = rows?.length
    ? [...new Set(rows?.map((row) => row[colFilter]))]
    : [];

  return (
    <Fragment>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setIRC(0);
          setCurrentPage(1);
          setShowModal(false);
        }}
        containerClassName={classNames(
          styles.modal,
          userInfoLoading ? "backdrop-blur-sm" : ""
        )}
      >
        <Table
          columns={tableColumns}
          rows={activeFilterOption ? _filteredRows : rows}
          colors={[
            {
              color: "#f7f7f7",
              value: "انجام نشده",
            },
            {
              color: "#fff",
              value: "انجام شده",
            },
          ]}
          colFilter={colFilter}
          page={currentPage}
          setPage={setCurrentPage}
          setTableSize={setTableSize}
          tableSize={tableSize}
          onSelect={(i) => _getUser(i)}
          pagination
          selectable
          containerClassName={searchLoading ? "blur-sm" : ""}
          className={styles.table}
        >
          {filterOptions?.length > 1 ? (
            <div className="flex items-center h-full pr-2 gap-4">
              <span className="text-2xs lg:text-xs font-700">
                نمایش بر اساس :
              </span>
              <div className="flex items-center gap-4">
                {filterOptions.map((o) => (
                  <Radio
                    key={o}
                    label={o}
                    className={
                      "!bg-transparent !border-none !gap-[1px] lg:!gap-1 !py-0 !px-0"
                    }
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
      </Modal>
      <section
        className={classNames(
          "rounded-md bg-white px-1.5 pb-3 md:pb-4 md:pt-1 shadow-md md:px-4",
          vip ? styles.vipContainer : styles.normalContainer
        )}
      >
        <FieldSet
          title={title}
          className={classNames(
            styles.fieldset,
            "px-2 md:px-4 !pt-4 !pb-2 md:!pb-5 relative !border-none"
          )}
          gradientBorder={false}
          titleClassName={
            "!bg-transparent !translate-y-[35%] lg:!translate-y-[30%]"
          }
        >
          <form
            className={"flex w-full items-end bg-background"}
            onSubmit={onSubmit}
          >
            <div className="flex w-full flex-wrap items-end gap-x-2 md:gap-x-[1vw] lg:gap-x-2 xs:gap-x-[1.3vw] gap-y-3 md:gap-y-4 lg:flex">
              {vip ? (
                <img
                  src={VIPIcon}
                  loading="lazy"
                  className="absolute left-2 top-0 md:left-4"
                />
              ) : null}

              {Form_Inputs.map((item) => (
                <TextField
                  containerClassName={
                    "flex flex-1 min-w-[46%] !rounded-[3px] md:min-w-[102px] md:max-w-[160px] lg:max-w-[232px] xl:max-w-[236px] md:ml-auto !p-0 !bg-transparent !gap-0.5 !shadow-none"
                  }
                  className={
                    "!border-[0.25px] !rounded-[3px] lg:!rounded w-full bg-[#f7f7f7]"
                  }
                  inputClassName={
                    "md:text-3xs md:placeholder:text-3xs lg:placeholder:text-xs lg:text-xs"
                  }
                  key={item.label}
                  name={item.qKey}
                  placeholder={item.placeholder}
                  label={item.label}
                  showLockIcon={false}
                  icon={<item.icon size={14} color="green" />}
                  value={formData[item.qKey]}
                  onChange={(e) => handleOnChange(e.target.value, item.qKey)}
                  disabled={
                    (device != "desktop" && item.label === "RF Id") ||
                    item.disabled
                  }
                  labelClassName={"!text-[9px] lg:!text-xs"}
                />
              ))}
              <div
                className={
                  "flex flex-col gap-0.5 flex-1 min-w-[46%] md:!min-w-[135px]  md:max-w-[160px] lg:max-w-[215px] xl:max-w-[239px] md:ml-auto"
                }
              >
                <Label
                  label={"وضعیت خدمت"}
                  className={"!text-[9px] lg:!text-xs"}
                />
                <div
                  className={classNames(
                    "flex justify-between gap-1.5 md:gap-2 px-1 lg:px-2 xs:py-[3px] border-[0.25px] border-solid bg-[#f7f7f7] hover:bg-white xs:!rounded-[4px] md:!rounded border-black",
                    formData[1585472454126] ? "bg-white" : ""
                  )}
                >
                  {Service_Status.map((o) => (
                    <Radio
                      key={o.value}
                      label={o.label}
                      className={classNames(
                        styles.radio,
                        "!bg-transparent !border-none !gap-0 md:!gap-[1px] lg:!gap-1 !py-0 !px-0"
                      )}
                      name={1585472454126}
                      value={o.value}
                      checked={o.value == formData[1585472454126]}
                      onClick={() => handleOnChange(o.value, 1585472454126)}
                      onChange={(e) => e}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:block lg:hidden"></div>
              <div
                className={
                  "flex border-success w-[96px] lg:w-[115px] ml-auto md:ml-0 mt-2 md:mt-0 mr-auto md:mr-0 bg-[#f7f7f7] !rounded-[2px]"
                }
              >
                {refreshActive ? (
                  <Button
                    variant="icon"
                    icon={
                      <GrRefresh
                        color="black"
                        className="xs:text-xs md:text-sm lg:text-xl"
                      />
                    }
                    className={
                      "xs:!rounded-l-none xs:!rounded-r-[2px] md:!rounded-r xs:h-[22px] md:h-[21.6px] lg:h-[25.6px] w-[28px]  !bg-transparent !border-[0.5px] border-success"
                    }
                    onClick={() =>
                      setFormData({
                        6365: null, // RF Id
                        4942: null, // Full name
                        6620: null, // National Code
                        1585472454126: null,
                      })
                    }
                  />
                ) : null}
                <Button
                  variant="outlined"
                  title={"جستجو"}
                  type="submit"
                  loading={searchLoading}
                  className={classNames(
                    refreshActive
                      ? "!bg-success xs:!rounded-r-none xs:!rounded-l-[2px] md:!rounded-l !text-white"
                      : "!bg-transparent xs:!rounded-[2px] md:!rounded",
                    "xs:h-[22px] md:h-[21.6px] lg:h-[25.6px] w-full  !border-success  !text-[9px] lg:!text-xs hover:!bg-success hover:text-white"
                  )}
                />
              </div>
            </div>
          </form>
        </FieldSet>
      </section>
    </Fragment>
  );
};
