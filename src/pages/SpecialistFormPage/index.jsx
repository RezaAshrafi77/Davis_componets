import React from "react";
import Page from "../../components/Page";
import Header from "../SpecialistDashboardPage/layouts/Header/index";
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
      <Header control={control} handleSubmit={handleSubmit} watch={watch} />
    </Page>
  );
}
