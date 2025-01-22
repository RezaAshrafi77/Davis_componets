/* eslint-disable react/prop-types */
import { ProgressChart } from "../../components/Charts/Progress";
import { DateInput } from "../../components/DateInput";
import { RadioOptions } from "../../components/RadioOptions";
import { TextField } from "../../components/TextField";
import { CheckBoxGroup } from "../../components/CheckBoxGroup";
import { Select } from "../../components/Select";
import { FileField } from "../../components/FileField";

export const FormFields = ({ BC, useFormContext, request, ...props }) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  if (props.component === "RadioOptions") {
    return (
      <RadioOptions
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        key={props.questionKey}
        register={register}
        divider={props.divider || "center"}
        optionsContainer={props.optionsContainer}
        radioClassName={props.radioClassName}
        labelClassName="!text-center"
        active={watch(props.questionKey)}
        errors={errors}
        label={props.label}
        questionKey={props.questionKey}
        options={props.options}
        userGuide={props.userGuide}
        required={props.required}
        labelMore={props.labelMore}
        disabled={props.disabled}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) =>
                  props.options.find((o) => o.value == val)?.label,
              }
            : null
        }
      />
    );
  }
  if (props.component == "TextField") {
    return (
      <TextField
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        labelClassName={props.labelClassName}
        key={props.questionKey}
        divider={props.rows ? "" : "center"}
        errors={errors}
        watch={watch}
        register={register}
        required={props.required}
        label={props.label}
        questionKey={props.questionKey}
        rows={props.rows}
        userGuide={props.userGuide}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        disabled={props.disabled}
        placeholder={props.placeholder}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) => val,
              }
            : null
        }
      />
    );
  }
  if (props.component == "progress-chart") {
    return (
      <ProgressChart
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        educationalContent={props.educationalContent}
        key={props.questionKey}
        divider={props.rows ? "" : "center"}
        required={props.required}
        value={watch(props.questionKey)}
        label={props.label}
        questionKey={props.questionKey}
        userGuide={props.userGuide}
        ranges={props.ranges}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
              }
            : null
        }
      />
    );
  }
  if (props.component == "Select") {
    return (
      <Select
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        label={props.label}
        questionKey={props.questionKey}
        options={props.options}
        control={control}
        errors={errors}
        search={props.search}
        required={props.required}
        divider={props.divider || "center"}
        userGuide={props.userGuide}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        en={props.en}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) => val,
              }
            : null
        }
      />
    );
  }
  if (props.component == "CheckBoxGroup") {
    return (
      <CheckBoxGroup
        questionKey={props.questionKey}
        watch={watch}
        options={props.options}
        setValue={setValue}
        errors={errors}
        label={props.label}
        divider={props.divider || "center"}
        required={props.required}
        userGuide={props.userGuide}
        educationalContent={props.educationalContent}
        en={props.en}
        labelMore={props.labelMore}
        disabled={props.disabled}
        checkBoxClassName={props.checkBoxClassName}
        optionsContainer={props.optionsContainer}
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) =>
                  val
                    ? val
                        .map(
                          (sO) =>
                            props.options.find((o) => sO == o.value)?.label
                        )
                        ?.join(",")
                    : "",
              }
            : null
        }
      />
    );
  }
  if (props.component == "DateInput") {
    return (
      <DateInput
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        control={control}
        watch={watch}
        id={props.id}
        errors={errors}
        label={props.label}
        divider={props.divider || "center"}
        required={props.required}
        userGuide={props.userGuide}
        educationalContent={props.educationalContent}
        en={props.en}
        labelMore={props.labelMore}
        disabled={props.disabled}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
              }
            : null
        }
      />
    );
  }
  if (props.component == "FileField") {
    return (
      <FileField
        containerClassName={props.containerClassName + " " + "max-h-fit"}
        value={props.value}
        label={props.label}
        questionKey={props.questionKey}
        watch={watch}
        setValue={setValue}
        errors={errors}
        required={props.required}
        userGuide={props.userGuide}
        educationalContent={props.educationalContent}
        labelClassName={props.labelClassName}
        labelMore={props.labelMore}
        accept={props.accept}
        disabled={props.disabled}
        divider={props.divider || "center"}
        en={props.en}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
              }
            : null
        }
      />
    );
  }

  return null;
};
