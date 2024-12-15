/* eslint-disable react/prop-types */
import { Fragment } from "react"
import Button from "../../../../components/Button"
import TextField from "../../../../components/TextField"
import DateInput from "../../../../components/DateInput"
import FieldSet from "../../../../components/FieldSet"
import styles from "./styles.module.css"
import { HiMiniIdentification } from "react-icons/hi2"

const Header = ({
    loading = false,
    title = "مشخصات فردی",
    register,
    watch,
    control,
    handleSubmit,
    onSubmit,
}) => {
    return (
        <Fragment>
            <section className={styles.container}>
                <FieldSet
                    title={title}
                    className={styles.fieldset}
                    type="header"
                >
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex lg:flex items-end w-full flex-wrap gap-x-2 gap-y-2 md:gap-y-4">
                            <DateInput
                                containerClassName={
                                    "flex flex-1 min-w-[48%] md:min-w-[112px] md:max-w-[160px] lg:max-w-[260px] xl:max-w-[280px] md:ml-auto !gap-0.5 !p-0 !bg-transparent !shadow-none"
                                }
                                className={styles.textField}
                                label={"از تاریخ"}
                                id="from_date"
                                control={control}
                                watch={watch}
                                labelClassName={"!text-[9px] lg:!text-xs"}
                            />
                            <DateInput
                                containerClassName={
                                    "flex flex-1 min-w-[48%] md:min-w-[112px] md:max-w-[160px] lg:max-w-[260px] xl:max-w-[280px] md:ml-auto !gap-0.5 !p-0 !bg-transparent !shadow-none"
                                }
                                className={styles.textField}
                                label={"تا تاریخ"}
                                id="end_date"
                                control={control}
                                watch={watch}
                                labelClassName={"!text-[9px] lg:!text-xs"}
                            />
                            <TextField
                                containerClassName={
                                    "flex flex-1 min-w-[48%] max-w-[48%] md:min-w-[112px] md:max-w-[160px] lg:max-w-[260px] xl:max-w-[280px] md:ml-auto !gap-0.5 !p-0 !bg-transparent !shadow-none"
                                }
                                className={styles.textField}
                                questionKey={"6620"}
                                watch={watch}
                                register={register}
                                placeholder={"در این قسمت وارد کنید"}
                                label={"کد ملی"}
                                icon={
                                    <HiMiniIdentification
                                        size={14}
                                        color="green"
                                    />
                                }
                                labelClassName={"!text-[9px] lg:!text-xs"}
                            />
                            <div className="hidden md:block lg:hidden"></div>
                            <Button
                                variant="outlined"
                                title={"جستجو"}
                                type="submit"
                                loading={loading}
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
