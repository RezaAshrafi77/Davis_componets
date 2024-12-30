/* eslint-disable react/prop-types */
import Button from "../../../../components/Button"
import TextField from "../../../../components/TextField"
import DateInput from "../../../../components/DateInput"
import FieldSet from "../../../../components/FieldSet"
import styles from "./styles.module.css"
import { MdOutlinePersonSearch } from "react-icons/md"
import NationalCodeSVG from "../../../../assets/icons/nationalCode.svg"

const Header = ({
    loading = false,
    title = "مشخصات کاربر",
    register,
    watch,
    control,
    onSubmit,
    setPage,
}) => {
    return (
        <FieldSet title={title} className={"lg:!px-3 !pb-0"}>
            <form
                className={"flex itesm-center"}
                onSubmit={(e) => {
                    e.preventDefault()
                    setPage(1)
                    onSubmit()
                }}
            >
                <div className="grid md:grid-cols-2 lg:flex items-center w-full flex-wrap gap-x-4 lg:gap-x-3 xl:gap-x-5 gap-y-4">
                    <DateInput
                        containerClassName={
                            "!flex-row !flex-1 lg:!w-auto !gap-3"
                        }
                        className={"flex-1"}
                        label={"از تاریخ :"}
                        id="from_date"
                        control={control}
                        watch={watch}
                    />
                    <DateInput
                        containerClassName={
                            "!flex-row !flex-1 lg:!w-auto !gap-3"
                        }
                        className={"flex-1"}
                        label={"تا تاریخ :"}
                        id="end_date"
                        control={control}
                        watch={watch}
                    />
                    <TextField
                        containerClassName={
                            "!flex-row !flex-1 lg:!w-auto !gap-3"
                        }
                        className={"flex-1"}
                        questionKey={"6620"}
                        watch={watch}
                        register={register}
                        placeholder={"در این قسمت وارد کنید"}
                        label={"کد ملی :"}
                        icon={<img src={NationalCodeSVG} />}
                    />
                    <div className="lg:hidden"></div>
                    <div className="md:block col-span-full lg:hidden md:mt-2">
                        <Button
                            variant="outlined"
                            title={"جستجو"}
                            type="submit"
                            loading={loading}
                            className={styles.searchButton + " " + "!mx-auto"}
                            icon={
                                <MdOutlinePersonSearch className="text-xs md:text-base lg:text-xl" />
                            }
                        />
                    </div>
                    <Button
                        variant="outlined"
                        title={"جستجو"}
                        type="submit"
                        loading={loading}
                        className={
                            styles.searchButton + " " + "!hidden lg:!flex"
                        }
                        icon={
                            <MdOutlinePersonSearch className="text-sm lg:text-xl" />
                        }
                    />
                </div>
            </form>
        </FieldSet>
    )
}

export default Header
