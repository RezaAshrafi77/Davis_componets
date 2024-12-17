/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import FieldSet from "../../components/FieldSet"
import Select from "../../components/Select"
import Table from "../../components/Table"
import TextField from "../../components/TextField"
import { Drugs_List } from "./data"
import Button from "../../components/Button"
import { useMemo, useState } from "react"
import { tableSizeList } from "../../components/Table/data"
import { LuFileX2 } from "react-icons/lu"

export default function Prescription({ onChange = () => {}, drugsList }) {
    const {
        watch,
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: {},
    })
    const [tableSize, setTableSize] = useState(tableSizeList[0].value)
    const [page, setPage] = useState(1)

    const offset = useMemo(() => {
        return tableSize * (page - 1)
    }, [tableSize, page])

    const submit = (data) => {
        if (drugsList?.length) {
            onChange([...drugsList, data])
        } else {
            onChange([data])
        }
        reset()
    }

    const deleteRow = (rowIndex) => {
        const drugs = drugsList
        drugsList.splice(rowIndex, 1)
        onChange(drugs)
    }

    return (
        <FieldSet title="نسخه دارویی">
            <form
                onSubmit={handleSubmit(submit)}
                className={"flex flex-col gap-6"}
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-[5vw] gap-y-4 lg:gap-y-6">
                    <Select
                        search
                        errors={errors}
                        questionKey={"10520"}
                        label="نام داروی مصرفی"
                        divider={"center"}
                        options={Drugs_List}
                        onChange={(val) => setValue("10520", val)}
                        required
                        register={register}
                        value={watch("10520")}
                    />
                    <TextField
                        questionKey={"1730098894463"}
                        watch={watch}
                        register={register}
                        errors={errors}
                        label="تعداد"
                        divider={"center"}
                        required
                        pattern={{
                            value: /^[0-9\u06F0-\u06F9]+$/,
                            message: "پاسخ میبایست عدد باشد.",
                        }}
                        // type="number"
                        inputMode="numeric"
                    />
                    <TextField
                        questionKey={"1730098956926"}
                        watch={watch}
                        register={register}
                        errors={errors}
                        label="دستور مصرف"
                        divider={"center"}
                        required
                    />
                </div>
                <Table
                    columns={[
                        "ردیف",
                        "نام دارو",
                        "فاصله زمانی",
                        "نحوه مصرف",
                        "عملیات",
                    ]}
                    rows={
                        drugsList?.length
                            ? drugsList
                                  ?.slice(offset, offset + tableSize)
                                  ?.map((row, index) => [
                                      offset + index + 1,
                                      row[10520],
                                      row[1730098894463],
                                      row[1730098956926],
                                      <LuFileX2
                                          key={index}
                                          className="cursor-pointer place-items-center font-600 !text-base text-error mx-auto"
                                          onClick={() => deleteRow(index)}
                                      />,
                                  ])
                            : [[]]
                    }
                    pagination
                    page={page}
                    setTableSize={setTableSize}
                    tableSize={tableSize}
                    setPage={setPage}
                >
                    <div className="flex-1 flex justify-end py-1 pr-2">
                        <Button
                            title="افزودن"
                            variant="variant"
                            className={
                                "w-20 !border-opacity-30 !py-1.5 !bg-white hover:!bg-success hover:!text-white !text-black"
                            }
                            type="submit"
                        />
                    </div>
                </Table>
            </form>
        </FieldSet>
    )
}
