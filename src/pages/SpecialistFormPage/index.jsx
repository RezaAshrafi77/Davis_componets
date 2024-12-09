import React, { useState } from "react";
import Page from "../../components/Page";
import { useForm } from "react-hook-form";
import FileField from "../../components/FileField";

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
  });

  const [file, setFile] = useState(
    "/resource/files/ecxhccvpbiublkhpseqaiskuphgdfjqe1733721474328.png"
  );

  return (
    <Page>
      <FileField
        label="یک فایل را انتخاب کنید."
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        questionKey={"3423"}
        archive={{}}
        userGuide={<div>reza</div>}
        educationalContent={{
          show: true,
          type: "danger",
        }}
      />
    </Page>
  );
}
