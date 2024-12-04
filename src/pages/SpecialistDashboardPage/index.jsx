/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react"
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

    const offset = useMemo(() => {
        return tableSize * (currentPage - 1)
    }, [tableSize, currentPage])

    useEffect(() => {
        onSubmit()
    }, [tableSize, currentPage])

    const onSubmit = (data) => {
        const formData = {
            6620: watch("6620"),
            from_date: watch("from_date"),
            end_date: watch("end_date"),
        }
        getUsers({ formData, offset, limit: tableSize })
    }
    return (
        <Page back={true}>
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
                />
            ) : null}
        </Page>
    )
}
