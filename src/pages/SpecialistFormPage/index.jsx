import React from "react";
import Page from "../../components/Page";
import Header from "./layouts/Header";
import { useForm } from "react-hook-form";

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
  return (
    <Page>
      <Header
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
        rows={[
          [1, 2, 3, 4, 5, "reza", 7, 8],
          [1, 2, 3, 4, 5, "akbar", 7, 8],
        ]}
        colFilter={6}
      />
    </Page>
  );
}
