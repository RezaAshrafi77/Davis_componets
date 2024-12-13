/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState } from "react"
import Button from "../../components/Button"
import Divider from "../../components/Divider"
import FieldSet from "../../components/FieldSet"
import TextField from "../../components/TextField"
import Table from "../../components/Table"
import { useForm } from "react-hook-form"
import useDevice from "../../hooks/useDevice"
import { Columns } from "./data"
import moment from "jalali-moment"
import { tableSizeList } from "../../components/Table/data"
import { BiSolidUserDetail } from "react-icons/bi"
import { MdOutlinePersonSearch } from "react-icons/md"
import { PiPrinterLight } from "react-icons/pi"
import styles from "./styles.module.css"

export default function SpecialistPrintPage({
    request = () => {},
    contextData = {},
    toast = () => {},
    services,
    parse,
}) {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
    })
    const [device] = useDevice()
    const [currentPage, setPage] = useState(1)
    const [pazireshLoading, setPazireshLoading] = useState(false)
    const [serviceLoading, setServiceLoading] = useState(false)
    const [tableSize, setTableSize] = useState(tableSizeList[0].value)
    const { ogrid, setOgrid, setPazireshList, pazireshList } = contextData

    const submit = () => {
        setPazireshLoading(true)
        request({
            jobId: 172,
            dataInfo: {
                6620: watch("6620"),
                limit: tableSize,
                offset: tableSize * (currentPage - 1),
                app_services_id: services
                    .map((service) => service.id)
                    .join(","),
            },
        })
            .then((res) => {
                if (res.data.length == 0) {
                    toast.error("هیچ پذیرشی برای این کاربر ثبت نشده است.")
                }
                setPazireshList(res.data)
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setPazireshLoading(false))
    }

    const entekhabPaziresh = (row) => {
        setServiceLoading(true)
        request({
            jobId: 173,
            dataInfo: { 1545718677214: row[1545718677214] },
        })
            .then((res) => {
                const realResponse = parse(res)
                setOgrid(realResponse.data[0].ogrid)
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setServiceLoading(false))
    }

    return (
        <div className="mt-4 flex h-full max-h-full flex-col justify-between">
            <div className={styles["form-container"]}>
                <div className="flex flex-col p-4">
                    <strong className="font-700 text-xs lg:text-base">
                        {"کاربر گرامی"}
                    </strong>
                    <p className="font-600 mt-2 text-3xs md:text-xs lg:text-sm">
                        {
                            "با کلیک بر روی هر انتخاب پایش می توانید گزارش های مربوط به آن پذیرش را دریافت نمایید."
                        }
                    </p>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(submit)}
                    >
                        <TextField
                            label={"کد ملی" + " :"}
                            questionKey="6620"
                            containerClassName={
                                "!flex-row items-center !justify-between rounded !px-2 !py-2 !shadow-primary !bg-formItem md:!w-[328px] !w-full !gap-5 "
                            }
                            className="items-center rounded border md:max-w-[248px] w-full"
                            icon={
                                <BiSolidUserDetail
                                    className="lg:w-[20px] lg:h-[20px] group-hover:text-green"
                                    color="#858585"
                                />
                            }
                            labelClassName={"text-nowrap"}
                            watch={watch}
                            errors={errors}
                            register={register}
                        />
                        <Button
                            title={"جستجو"}
                            className="!bg-gray-f7 hover:!bg-green hover:!border-green hover:!text-white !border-green !w-[91px]"
                            type="submit"
                            variant="outlined"
                            icon={<MdOutlinePersonSearch size={20} />}
                            loading={pazireshLoading}
                        />
                    </form>
                    <Divider className="!my-5" />
                    {pazireshList?.length ? (
                        <Table
                            selectable
                            columns={Columns}
                            rows={pazireshList?.map((row, index) => [
                                (currentPage - 1) * tableSize + index + 1,
                                row["fn"],
                                moment(row["tarikh_paziresh"])
                                    .locale("fa")
                                    .format("YYYY/MM/DD"),
                                row["list_khadamat"],
                                <Button
                                    onClick={() => entekhabPaziresh(row)}
                                    variant="text"
                                    title={"انتخاب"}
                                    key={"entekhab" + index}
                                    className="!max-w-fit !bg-white !m-auto group-hover:!text-green"
                                    loading={serviceLoading}
                                />,
                            ])}
                            pagination
                            setPage={setPage}
                            tableSize={tableSize}
                            tableSizes={tableSizeList}
                            setTableSize={setTableSize}
                            page={currentPage}
                        />
                    ) : null}
                </div>
            </div>
            <FieldSet title={"خدمات دریافتی"} imgBack>
                {ogrid ? (
                    <div className="flex h-[30vh] flex-col gap-7 md:gap-2 lg:gap-4">
                        <p className="font-400 text-xs lg:text-sm">
                            برای چاپ گزارش مورد نظر ، لطفا روی گزارش مربوطه کلیک
                            کنید .
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
                                        onClick={() => service.print(ogrid)}
                                        style={{
                                            background: service.color,
                                        }}
                                    >
                                        <span className="h-10 w-10 p-2 shadow-inner lg:h-14 lg:w-14">
                                            <PiPrinterLight
                                                size={
                                                    device == "desktop"
                                                        ? 32
                                                        : 20
                                                }
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
                    <div className="flex flex-col items-center justify-center py-[101px]">
                        <strong className="font-800 text-xs lg:text-base">
                            {"هیچ موردی برای نمایش وجود ندارد."}
                        </strong>
                        <p className="font-700 mt-4 text-3xs md:text-xs lg:text-sm">
                            {
                                "یکی از رکوردها را برای نمایش پس از وارد کردن کد ملی انتخاب کنید"
                            }
                        </p>
                    </div>
                )}
            </FieldSet>
        </div>
    )
}

const check_print_condition = (services, keys) => {
    let rs = false
    for (let i in services)
        if (keys.includes(services[i][20336].id)) {
            rs = true
            break
        }
    return rs
}
