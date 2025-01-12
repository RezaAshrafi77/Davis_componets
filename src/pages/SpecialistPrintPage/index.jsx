/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../../components/Button";
import { FieldSet } from "../../components/FieldSet";
import { TextField } from "../../components/TextField";
import { Table } from "../../components/Table";
import { useForm } from "react-hook-form";
import useDevice from "../../hooks/useDevice";
import { Columns } from "./data";
import moment from "jalali-moment";
import { tableSizeList } from "../../components/Table/data";
import { MdOutlinePersonSearch } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import styles from "./styles.module.css";
import NationalCodeSVG from "../../assets/icons/nationalCode.svg";

export function SpecialistPrintPage({
  request = () => {},
  contextData = {},
  toast = () => {},
  services,
  parse,
  background,
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
  });
  const [device] = useDevice();
  const [currentPage, setPage] = useState(1);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [activePaziresh, setActivePaziresh] = useState(null);
  const [tableSize, setTableSize] = useState(tableSizeList[0].value);
  const { ogrid, setOgrid, setPazireshList, pazireshList } = contextData;

  const submit = () => {
    request({
      jobId: 172,
      dataInfo: {
        6620: watch("6620"),
        limit: tableSize,
        offset: tableSize * (currentPage - 1),
        app_services_id: services.map((service) => service.id).join(","),
      },
    })
      .then((res) => {
        if (!res.error) {
          setPazireshList(res.data);
          if (res.data.length == 0) {
            toast.error("هیچ پذیرشی برای این کاربر ثبت نشده است.");
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const entekhabPaziresh = (row, index) => {
    setServiceLoading(true);
    setActivePaziresh(index);
    request({
      jobId: 173,
      dataInfo: { 1545718677214: row[1545718677214] },
    })
      .then((res) => {
        const realResponse = parse(res);
        setOgrid(realResponse.data[0].ogrid);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setServiceLoading(false));
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <FieldSet>
        <div className="flex flex-col">
          <strong className="font-700 text-xs lg:text-sm">
            {"کاربر گرامی"}
          </strong>
          <p className="font-600 mt-2 text-3xs md:text-xs lg:text-xs">
            {
              "با کلیک بر روی هر انتخاب پایش می توانید گزارش های مربوط به آن پذیرش را دریافت نمایید."
            }
          </p>
          <form
            className={
              "flex flex-col md:flex-row gap-4 mt-8 justify-between items-center md:!mx-auto lg:w-[450px] mb-4 lg:mb-6"
            }
            onSubmit={handleSubmit(submit)}
          >
            <TextField
              label={"کد ملی" + " :"}
              questionKey="6620"
              containerClassName={
                "!flex-row rounded md:!w-[328px] !gap-5 group"
              }
              className="flex-1"
              icon={<img src={NationalCodeSVG} />}
              watch={watch}
              errors={errors}
              register={register}
            />
            <Button
              title={"جستجو"}
              className="!gap-2 !shadow-sm !bg-[#f7f7f7] !text-black !border-success hover:!bg-success hover:!text-white transition-all !w-[94px] md:h-[28px] xl:h-[34px]"
              type="submit"
              icon={<MdOutlinePersonSearch className="text-sm lg:text-xl" />}
              loading={isSubmitting}
            />
          </form>
          {pazireshList?.length ? (
            <Table
              selectable
              className={styles.table}
              columns={Columns}
              rows={pazireshList?.map((row, index) => [
                (currentPage - 1) * tableSize + index + 1,
                row["fn"],
                moment(row["tarikh_paziresh"])
                  .locale("fa")
                  .format("YYYY/MM/DD"),
                row["list_khadamat"],
                <Button
                  onClick={() => entekhabPaziresh(row, index)}
                  variant="text"
                  title={"انتخاب"}
                  key={"entekhab" + index}
                  className="!w-full !bg-white !m-auto !py-1.5 group-hover:!bg-success group-hover:!text-white"
                  loading={serviceLoading && index == activePaziresh}
                />,
              ])}
              onSelect={(i) => entekhabPaziresh(pazireshList[i], i)}
              pagination
              setPage={setPage}
              tableSize={tableSize}
              tableSizes={tableSizeList}
              setTableSize={setTableSize}
              page={currentPage}
            />
          ) : null}
        </div>
      </FieldSet>
      <FieldSet title={"خدمات دریافتی"} className={" h-[35vh] relative"}>
        {background ? (
          <img
            src={background.src}
            className={
              "absolute right-0 h-full top-0 z-10" + " " + background.className
            }
            alt=""
          />
        ) : null}
        {ogrid ? (
          <div className="flex flex-col gap-7 md:gap-2 lg:gap-4 z-20">
            <p className="font-400 text-xs lg:text-sm">
              برای چاپ گزارش مورد نظر ، لطفا روی گزارش مربوطه کلیک کنید .
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full z-20">
              {services?.map((service) =>
                check_print_condition(
                  ogrid[1576563125067],
                  service.id.split(",")
                ) ? (
                  <div
                    key={service.id}
                    className="flex h-10 w-full items-center gap-3 self-start lg:h-14 cursor-pointer"
                    onClick={() =>
                      service.print(ogrid, pazireshList[activePaziresh])
                    }
                    style={{
                      background: service.color,
                    }}
                  >
                    <span className="h-10 w-10 p-2 shadow-inner lg:h-14 lg:w-14">
                      <PiPrinterLight
                        size={device == "desktop" ? 32 : 20}
                        color="#5E5E5E"
                      />
                    </span>
                    <span className="font-700 text-xs lg:text-sm">
                      {service.title}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full justify-center self-end overflow-auto">
            <strong className="font-800 text-xs lg:text-sm xl:text-base">
              {"هیچ موردی برای نمایش وجود ندارد."}
            </strong>
            <p className="font-500 mt-4 text-3xs md:text-xs lg:text-xs xl:text-sm">
              {
                "یکی از رکوردها را برای نمایش پس از وارد کردن کد ملی انتخاب کنید"
              }
            </p>
          </div>
        )}
      </FieldSet>
    </div>
  );
}

const check_print_condition = (services, keys) => {
  let rs = false;
  for (let i in services)
    if (keys.includes(services[i][20336].id)) {
      rs = true;
      break;
    }
  return rs;
};
