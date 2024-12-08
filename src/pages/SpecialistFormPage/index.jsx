import React from "react";
import Page from "../../components/Page";
import Header from "./layouts/Header";
import { useForm } from "react-hook-form";
import TextField from "../../components/TextField";

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
      <TextField label="reza" divider={true} />
    </Page>
  );
}
