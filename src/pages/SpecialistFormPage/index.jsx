import React, { useState } from "react"
import Page from "../../components/Page"
import { useForm } from "react-hook-form"
import FileField from "../../components/FileField"

export default function SFP() {
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        mode: "all",
        defaultValues: {},
    })
    const [selectOption, setSelectOption] = useState(false)

    return (
        <Page>
            <FileField
                label="یک فایل را انتخاب کنید."
                watch={watch}
                questionKey={"2323"}
                register={register}
                setValue={setValue}
                errors={errors}
                selectOption={selectOption}
                setSelectOption={setSelectOption}
            />
        </Page>
    )
}
