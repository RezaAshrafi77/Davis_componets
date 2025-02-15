/* eslint-disable react/prop-types */
import { FieldSet } from "../../components/FieldSet"
import { Select } from "../../components/Select"
import { Table } from "../../components/Table"
import { TextField } from "../../components/TextField"
import { Drugs_List } from "./data"
import { Button } from "../../components/Button"
import { useMemo, useState } from "react"
import { tableSizeList } from "../../components/Table/data"
import { LuFileX2 } from "react-icons/lu"
import { IoAddCircleOutline } from "react-icons/io5"
import classNames from "classnames"

export function Prescription({
    onChange = () => {},
    drugsList,
    containerClassName,
}) {
    const [formData, setFormData] = useState({
        10520: null,
        1730098894463: null,
        1730098956926: null,
    })
    const [errors, setErrors] = useState({
        10520: null,
        1730098894463: null,
        1730098956926: null,
    })
    const [submitted, setSubmitted] = useState(false)

    const [tableSize, setTableSize] = useState(tableSizeList[0].value)
    const [page, setPage] = useState(1)

    const offset = useMemo(() => {
        return tableSize * (page - 1)
    }, [tableSize, page])

    const submit = () => {
        setSubmitted(true)
        if (Object.values(formData).every((val) => val)) {
            if (drugsList?.length) {
                onChange([...drugsList, formData])
            } else {
                onChange([formData])
            }
            setFormData({
                10520: null,
                1730098894463: null,
                1730098956926: null,
            })
            return
        } else {
            setErrors({
                10520: !formData[10520]
                    ? {
                          message: "پر کردن این قسمت الزامیست.",
                      }
                    : null,
                1730098894463: !formData[1730098894463]
                    ? {
                          message: "پر کردن این قسمت الزامیست.",
                      }
                    : null,
                1730098956926: !formData[1730098956926]
                    ? {
                          message: "پر کردن این قسمت الزامیست.",
                      }
                    : null,
            })
        }
    }

    const handleFormData = (key, value) => {
        if (key == 10520) {
            setFormData({
                ...formData,
                10520: value,
            })
            if (submitted) {
                setErrors({
                    ...errors,
                    10520: !value
                        ? {
                              message: "پر کردن این قسمت الزامیست.",
                          }
                        : null,
                })
            }
            return
        }
        if (key == 1730098894463) {
            setFormData({
                ...formData,
                1730098894463: value,
            })
            if (submitted) {
                setErrors({
                    ...errors,
                    1730098894463: !value
                        ? {
                              message: "پر کردن این قسمت الزامیست.",
                          }
                        : null,
                })
            }
            return
        }
        if (key == 1730098956926) {
            setFormData({
                ...formData,
                1730098956926: value,
            })
            if (submitted) {
                setErrors({
                    ...errors,
                    1730098956926: !value
                        ? {
                              message: "پر کردن این قسمت الزامیست.",
                          }
                        : null,
                })
            }
            return
        }
    }

    const deleteRow = (rowIndex) => {
        const drugs = drugsList
        drugsList.splice(rowIndex, 1)
        onChange(drugs)
    }

    return (
        <FieldSet title="نسخه دارویی" containerClassName={"!min-w-0"}>
            <div
                className={classNames(
                    containerClassName,
                    "grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-[5vw] gap-y-4 lg:gap-y-6"
                )}
            >
                <Select
                    search
                    errors={errors}
                    questionKey={"10520"}
                    label="نام داروی مصرفی"
                    divider={"center"}
                    options={Drugs_List}
                    onChange={(val) => handleFormData("10520", val)}
                    value={formData[10520]}
                />
                <TextField
                    questionKey={"1730098894463"}
                    errors={errors}
                    label="تعداد"
                    divider={"center"}
                    type="number"
                    inputMode="numeric"
                    value={formData["1730098894463"]}
                    onChange={(e) =>
                        handleFormData("1730098894463", e.target.value)
                    }
                />
                <TextField
                    questionKey={"1730098956926"}
                    errors={errors}
                    label="دستور مصرف"
                    divider={"center"}
                    value={formData["1730098956926"]}
                    onChange={(e) =>
                        handleFormData("1730098956926", e.target.value)
                    }
                />
                <Table
                    containerClassName={"col-span-full min-w-0"}
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
                                      Drugs_List.find(
                                          (o) => o.value == row[10520]
                                      )?.label,
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
                    <div className="flex xs:w-[88vw] md:w-auto">
                        <Button
                            title="افزودن"
                            variant="variant"
                            className={
                                "xs:w-full md:w-24 !border-opacity-30 xs:!py-1.5 md:!py-1 lg:!py-1.5 !bg-white hover:!bg-success hover:!text-white !text-black lg:!text-xs !gap-1"
                            }
                            onClick={() => submit()}
                            icon={
                                <IoAddCircleOutline className="xs:text-2xs md:text-xs lg:text-base font-800" />
                            }
                        />
                    </div>
                </Table>
            </div>
        </FieldSet>
    )
}
