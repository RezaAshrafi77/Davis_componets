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
                                    "flex flex-1 min-w-[48%] max-w-[48%] md:max-w-auto md:min-w-[150px] "
                                }
                                className={styles.textField}
                                label={"از تاریخ"}
                                id="from_date"
                                control={control}
                                watch={watch}
                            />
                            <DateInput
                                containerClassName={
                                    "flex flex-1 min-w-[48%] max-w-[48%] md:max-w-auto md:min-w-[150px] "
                                }
                                className={styles.textField}
                                label={"تا تاریخ"}
                                id="end_date"
                                control={control}
                                watch={watch}
                            />
                            <TextField
                                containerClassName={
                                    "flex flex-1 min-w-[48%] max-w-[48%] md:max-w-auto md:min-w-[150px] "
                                }
                                className={styles.textField}
                                questionKey={"6620"}
                                watch={watch}
                                register={register}
                                placeholder={"در این قسمت وارد کنید"}
                                label={"کد ملی"}
                                icon={
                                    <div className="absolute left-1 md:left-1.5 top-1/2 -translate-y-1/2">
                                        <HiMiniIdentification
                                            size={14}
                                            color="green"
                                        />
                                    </div>
                                }
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
