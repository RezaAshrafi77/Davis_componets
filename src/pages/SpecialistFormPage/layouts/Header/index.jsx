/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState, useCallback, useMemo } from "react"
import Table from "../../../../components/Table"
import Modal from "../../../../components/Modal"
import Button from "../../../../components/Button"
import Radio from "../../../../components/Radio"
import TextField from "../../../../components/TextField"
import FieldSet from "../../../../components/FieldSet"
import useDevice from "../../../../hooks/useDevice"
import styles from "./styles.module.css"
import { Form_Inputs, Service_Status, Table_Columns } from "./data"
import { tableSizeList } from "../../../../components/Table/data"
import Label from "../../../../components/Label"
import classNames from "classnames"
import { toast } from "react-toastify"

const Header = ({
    title = "مشخصات فردی",
    rows = [],
    tableColumns = Table_Columns,
    request = () => {},
    vip = true,
    user,
    setUser,
    users,
    setUsers,
    setUserID,
    JID,
}) => {
    const [formData, setFormData] = useState({
        6365: null, // RF Id
        4942: null, // Full name
        6620: null, // National Code
        1585472454126: null,
    })
    const [device] = useDevice()
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [tableSize, setTableSize] = useState(tableSizeList[0].value)
    const [initialRequestControl, setIRC] = useState(0)
    const [searchLoading, setSearchLoading] = useState(false)
    const [userInfoLoading, setUserInfoLoading] = useState(false)

    const offset = useMemo(() => {
        return tableSize * (currentPage - 1)
    }, [tableSize, currentPage])

    // const _services = [...new Set(users.map((user) => user[1585472454126]))]

    useEffect(() => {
        setShowModal(false)
    }, [user])

    useEffect(() => {
        if (rows.length) setShowModal(true)
        else setShowModal(false)
    }, [rows])

    const onSubmit = (e) => {
        e.preventDefault()
        setIRC(initialRequestControl + 1)
        _getUsers()
    }

    const handleOnChange = useCallback(
        (value, qKey) => {
            if (qKey == "6365") {
                setFormData({ ...formData, 6365: value ? value : null })
                return
            } else if (qKey == "6620") {
                setFormData({ ...formData, 6620: value ? value : null })
                return
            } else if (qKey == "4942") {
                setFormData({ ...formData, 4942: value ? value : null })
            } else {
                setFormData({ ...formData, 1585472454126: value })
            }
        },
        [formData, setFormData]
    )

    const _getUsers = async () => {
        const options = {
            dataInfo: formData,
        }
        if (options.dataInfo["6365"]) {
            options.dataInfo["1558737412305"] = options.dataInfo("6365")
            options.jobId = JID.RFID
        } else if (options.dataInfo["6620"]) {
            options.dataInfo["6620"] = options.dataInfo("6620")
            options.jobId = JID.NID
        } else {
            options.jobId = JID.NID
        }
        options.dataInfo.offset = offset
        options.dataInfo.limit = tableSize
        setSearchLoading(true)
        await request(options)
            .then((res) => {
                if (res.data.length == 0) {
                    toast.error("هیچ کاربری یافت نشد.")
                }
                setUsers(res.data)
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setSearchLoading(false))
    }

    const _getUser = async (i) => {
        setUserID(users[i]["6483"])
        const formData = {
            6483: users[i]["6483"],
        }
        setUserInfoLoading(true)
        await request({
            jobId: JID.ID,
            dataInfo: formData,
        })
            .then((res) => setUser(res.data))
            .catch((err) => toast.error(err.message))
            .finally(() => setUserInfoLoading(false))
    }

    return (
        <Fragment>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setIRC(0)
                    setShowModal(false)
                    setCurrentPage(1)
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
                />
            </Modal>
            <section
                className={classNames(
                    styles.container,
                    vip ? styles.vipContainer : styles.normalContainer
                )}
            >
                <FieldSet
                    title={title}
                    className={styles.fieldset}
                    type="header"
                >
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div className="flex lg:flex items-end w-full flex-wrap gap-x-2 gap-y-4">
                            {Form_Inputs.map((item) => (
                                <TextField
                                    containerClassName={
                                        "flex flex-1 min-w-[48%] md:min-w-[150px] "
                                    }
                                    className={styles.textField}
                                    key={item.label}
                                    name={item.qKey}
                                    placeholder={item.placeholder}
                                    label={item.label}
                                    icon={
                                        <div className="absolute left-1 md:left-1.5 top-1/2 -translate-y-1/2">
                                            <item.icon
                                                size={14}
                                                color="green"
                                            />
                                        </div>
                                    }
                                    value={formData[item.qKey]}
                                    onChange={(e) =>
                                        handleOnChange(
                                            e.target.value,
                                            item.qKey
                                        )
                                    }
                                    disabled={
                                        (device != "desktop" &&
                                            item.label === "RF Id") ||
                                        item.disabled
                                    }
                                />
                            ))}
                            <div
                                className={
                                    "flex flex-col gap-0.5 flex-1 md:min-w-[180px] max-w-[200px]"
                                }
                            >
                                <Label label={"وضعیت خدمت"} />
                                <div
                                    className={
                                        "flex justify-between gap-2 px-1 py-1 border-[0.5px] border-solid bg-gray-f7 rounded border-black"
                                    }
                                >
                                    {Service_Status.map((o) => (
                                        <Radio
                                            key={o.value}
                                            label={o.label}
                                            className={styles.radio}
                                            name={1585472454126}
                                            value={o.value}
                                            checked={
                                                o.value ==
                                                formData[1585472454126]
                                            }
                                            onChange={() =>
                                                handleOnChange(
                                                    o.value,
                                                    1585472454126
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:block lg:hidden"></div>
                            <Button
                                variant="outlined"
                                title={"جستجو"}
                                type="submit"
                                loading={searchLoading}
                                className={styles.searchButton}
                            />
                        </div>
                    </form>
                </FieldSet>
            </section>
        </Fragment>
    )
}

export default Header
