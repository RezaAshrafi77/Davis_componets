/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react"
import { Archvie_Table_Columns } from "./data"
import Table from "../../components/Table/index"
import { VscLoading } from "react-icons/vsc"
import { toast } from "react-toastify"
import moment from "jalali-moment"
import styles from "./styles.module.css"

export default function ArchiveTable({ options }) {
    const { jobID, BC, userID, questionKey, request } = options
    const [currentPage, setPage] = useState(1)
    const [tableSize, setTableSize] = useState(null)
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    const getArchive = useCallback(async () => {
        const formData = {
            jobId: jobID,
            dataInfo: {
                qbc: BC,
                oi: questionKey,
                6483: userID || localStorage.getItem("userData")?.["6483"],
            },
            limit: tableSize,
            offset: tableSize * (currentPage - 1),
        }

        setLoading(true)

        try {
            const res = await request(formData)
            setTableData(res.data)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }, [jobID, BC, userID, questionKey, request, tableSize, currentPage])

    useEffect(() => {
        if (tableSize && currentPage) {
            getArchive()
        }
    }, [getArchive, tableSize, currentPage])

    const renderTable = () => (
        <Table
            containerClassName={styles.tableContainer}
            rows={tableData.map((item, i) => [
                currentPage * (i + 1),
                moment(item.time).locale("fa").format("YYYY/MM/DD"),
                Number(item.score)?.toFixed(2),
            ])}
            stripe
            columns={Archvie_Table_Columns}
            pagination
            currentPage={currentPage}
            setPage={setPage}
            tableSize={tableSize}
            setTableSize={setTableSize}
        />
    )

    const renderLoadingState = () => (
        <div className={styles.loadingContainer}>
            <VscLoading className={styles.loadingSpinner} />
        </div>
    )

    const renderEmptyState = () => (
        <div className={styles.emptyStateContainer}>
            <p className={styles.emptyStateText}>آرشیو خالی است.</p>
        </div>
    )

    return (
        <div>
            {loading
                ? renderLoadingState()
                : tableData?.length
                ? renderTable()
                : renderEmptyState()}
        </div>
    )
}
