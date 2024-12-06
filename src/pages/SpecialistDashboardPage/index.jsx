/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Page from "../../components/Page"
import Table from "../../components/Table"
import Header from "./layouts/Header"
import { tableSizeList } from "../../components/Table/data"
import { Table_Columns } from "./layouts/Header/data"
import { useForm } from "react-hook-form"

export default function SpecialistDashboardPage({
    tableColumns = Table_Columns,
    getUsers = () => {},
    title,
    rows,
    loading,
}) {
    const { register, watch, control, handleSubmit } = useForm({
        mode: "all",
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [tableSize, setTableSize] = useState(tableSizeList[0].value)

    useEffect(() => {
        onSubmit()
    }, [tableSize, currentPage])

    const onSubmit = () => {
        const formData = {
            6620: watch("6620") || null,
            from_date: watch("from_date") || null,
            end_date: watch("end_date") || null,
            limit: tableSize,
            offset: Number(tableSize * (Number(currentPage) - 1)),
        }
        getUsers({ formData })
    }
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
                        rows={rows}
                        page={currentPage}
                        setPage={setCurrentPage}
                        setTableSize={setTableSize}
                        tableSize={tableSize}
                        pagination
                        selectable
                        containerClassName={loading ? "blur-sm" : ""}
                    />
                ) : null}
            </div>
        </Page>
    )
}
