/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Archvie_Table_Columns } from "./data";
import Table from "../../components/Table/index";
import { VscLoading } from "react-icons/vsc";
import moment from "jalali-moment";
import styles from "./styles.module.css";

export default function ArchiveTable({ options }) {
  const {
    jobID,
    BC,
    userID,
    questionKey,
    request,
    renderCell = (val) => Number(val)?.toFixed(2),
  } = options;
  const [currentPage, setPage] = useState(1);
  const [tableSize, setTableSize] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArchive = async () => {
    const formData = {
      jobId: jobID,
      dataInfo: {
        qbc: BC,
        oi: questionKey,
        6483: userID || localStorage.getItem("userData")?.["6483"],
        limit: tableSize,
        offset: 0,
      },
    };
    setLoading(true);

    await request(formData)
      .then((res) => setTableData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getArchive();
  }, []);

  const renderTable = () => (
    <Table
      containerClassName={styles.tableContainer}
      rows={tableData.map((item, i) => [
        currentPage * (i + 1),
        moment(item.time).locale("fa").format("YYYY/MM/DD"),
        renderCell(item.score),
      ])}
      stripe
      columns={Archvie_Table_Columns}
      pagination={false}
      page={currentPage}
      setPage={setPage}
      tableSize={tableSize}
      setTableSize={setTableSize}
    />
  );

  const renderLoadingState = () => (
    <div className={styles.loadingContainer}>
      <VscLoading className={styles.loadingSpinner} />
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyStateContainer}>
      <p className={styles.emptyStateText}>آرشیو خالی است.</p>
    </div>
  );

  return (
    <div>
      {loading
        ? renderLoadingState()
        : tableData?.length
        ? renderTable()
        : renderEmptyState()}
    </div>
  );
}
