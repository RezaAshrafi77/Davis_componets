/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import Table from "../../../../components/Table";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import Radio from "../../../../components/Radio";
import TextField from "../../../../components/TextField";
import FieldSet from "../../../../components/FieldSet";
import useDevice from "../../../../hooks/useDevice";
import styles from "./styles.module.css";
import { Form_Inputs, Service_Status, Table_Columns } from "./data";
import { tableSizeList } from "../../../../components/Table/data";
import Label from "../../../../components/Label";
import classNames from "classnames";
import { toast } from "react-toastify";
import { GrRefresh } from "react-icons/gr";
import VIPIcon from "../../../../assets/images/vip.svg";

const Header = ({
  title = "مشخصات فردی",
  rows = [],
  tableColumns = Table_Columns,
  request = () => {},
  vip = true,
  user,
  setUser,
  users = [],
  setUsers,
  setUserID,
  JID,
}) => {
  const [formData, setFormData] = useState({
    6365: null, // RF Id
    4942: null, // Full name
    6620: null, // National Code
    1585472454126: null,
  });
  const [device] = useDevice();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState(tableSizeList[0].value);
  const [initialRequestControl, setIRC] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);

  const offset = useMemo(() => {
    return tableSize * (currentPage - 1);
  }, [tableSize, currentPage]);

  // const _services = [...new Set(users.map((user) => user[1585472454126]))]

  useEffect(() => {
    if (user) {
      setShowModal(false);
      setFormData({
        4942: user[4942] || null, // Full name
        6620: user[6620] || null, // National Code
        ...formData,
      });
    }
  }, [user]);

  useEffect(() => {
    if (initialRequestControl) {
      _getUsers();
    }
  }, [tableSize, currentPage]);

  useEffect(() => {
    if (users.length) setShowModal(true);
    else setShowModal(false);
  }, [users]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIRC(initialRequestControl + 1);
    _getUsers();
  };

  const handleOnChange = useCallback(
    (value, qKey) => {
      if (qKey == "6365") {
        setFormData({ ...formData, 6365: value ? value : null });
        return;
      } else if (qKey == "6620") {
        setFormData({ ...formData, 6620: value ? value : null });
        return;
      } else if (qKey == "4942") {
        setFormData({ ...formData, 4942: value ? value : null });
      } else {
        setFormData({ ...formData, 1585472454126: value });
      }
    },
    [formData, setFormData]
  );

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
        if (res.data.length == 0) {
          toast.error("هیچ کاربری یافت نشد.");
        }
        setUsers(res.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setSearchLoading(false));
  };

  const _getUser = async (i) => {
    setUserID(users[i]["6483"]);
    const formData = {
      6483: users[i]["6483"],
    };
    setUserInfoLoading(true);
    await request({
      jobId: JID.ID,
      dataInfo: formData,
    })
      .then((res) => setUser(res.data))
      .catch((err) => toast.error(err.message))
      .finally(() => setUserInfoLoading(false));
  };

  const refreshActive =
    (formData[6365] || formData[6620] || formData[1585472454126]) && user;

  console.log(formData);
  return (
    <Fragment>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setIRC(0);
          setShowModal(false);
          setCurrentPage(1);
        }}
        containerClassName={userInfoLoading ? "backdrop-blur-sm" : ""}
      >
        <Table
          columns={tableColumns}
          rows={rows.map((row, i) => [
            (currentPage - 1) * tableSize + i + 1,
            ...row,
          ])}
          page={currentPage}
          setPage={setCurrentPage}
          setTableSize={setTableSize}
          tableSize={tableSize}
          onSelect={(i) => _getUser(i)}
          pagination
          selectable
          containerClassName={searchLoading ? "blur-sm" : ""}
        />
      </Modal>
      <section
        className={classNames(
          styles.container,
          vip ? styles.vipContainer : styles.normalContainer
        )}
      >
        <FieldSet title={title} className={styles.fieldset} type="header">
          <form className={styles.form} onSubmit={onSubmit}>
            <div className="flex w-full flex-wrap items-end gap-x-2 gap-y-3 md:gap-y-4 lg:flex">
              {vip ? (
                <img
                  src={VIPIcon}
                  className="absolute left-2 top-0 md:left-4"
                />
              ) : null}

              {Form_Inputs.map((item) => (
                <TextField
                  containerClassName={
                    "flex flex-1 min-w-[48%] md:min-w-[112px] md:max-w-[160px] lg:max-w-[232px] xl:max-w-[236px] md:ml-auto"
                  }
                  className={styles.textField}
                  key={item.label}
                  name={item.qKey}
                  placeholder={item.placeholder}
                  label={item.label}
                  icon={
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 md:left-1.5">
                      <item.icon size={14} color="green" />
                    </div>
                  }
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
                  "flex flex-col gap-0.5 flex-1 md:min-w-[136px] md:max-w-[160px] lg:max-w-[215px] xl:max-w-[239px] md:ml-auto"
                }
              >
                <Label
                  label={"وضعیت خدمت"}
                  className={"!text-[9px] lg:!text-xs"}
                />
                <div
                  className={
                    "flex justify-between gap-1.5 md:gap-2 px-1 lg:px-2 py-1 border-[0.25px] border-solid bg-gray-f7 !rounded-[2px] lg:!rounded border-black"
                  }
                >
                  {Service_Status.map((o) => (
                    <Radio
                      key={o.value}
                      label={o.label}
                      className={styles.radio}
                      name={1585472454126}
                      value={o.value}
                      checked={o.value == formData[1585472454126]}
                      onChange={() => handleOnChange(o.value, 1585472454126)}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:block lg:hidden"></div>
              <div className={styles.searchButton}>
                {refreshActive ? (
                  <Button
                    variant="icon"
                    icon={<GrRefresh color="black" size={16} />}
                    className={
                      "!rounded-bl-none !rounded-tl-none !rounded-[2px] lg:!rounded h-[22px] lg:h-[26px] w-[28px]  !bg-transparent border border-green"
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
                      ? "!bg-green !rounded-br-none !rounded-tr-none !rounded-[2px] lg:!rounded !text-white"
                      : "!bg-transparent !rounded-[2px] lg:!rounded",
                    "h-[22px] lg:h-[26px] w-full  !border-green  !text-[9px] lg:!text-xs"
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

export default Header;
