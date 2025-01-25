/* eslint-disable react/prop-types */
import { useEffect } from "react";
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

  const commonProps = {
    containerClassName: `${props.containerClassName} max-h-fit`,
    label: props.label,
    questionKey: props.questionKey,
    required: props.required,
    userGuide: props.userGuide,
    disabled: props.disabled,
    archive: props.archive
      ? {
          userID: watch("6483"),
          BC,
          jobID: 164,
          request,
          renderCell: props.renderCell,
        }
      : null,
  };

  const componentMap = {
    RadioOptions: (
      <RadioOptions
        {...commonProps}
        register={register}
        divider={props.divider || "center"}
        optionsContainer={props.optionsContainer}
        radioClassName={props.radioClassName}
        labelClassName="!text-center"
        active={watch(props.questionKey)}
        errors={errors}
        options={props.options}
        labelMore={props.labelMore}
      />
    ),
    TextField: (
      <TextField
        {...commonProps}
        labelClassName={props.labelClassName}
        divider={props.rows ? "" : "center"}
        errors={errors}
        watch={watch}
        register={register}
        rows={props.rows}
        placeholder={props.placeholder}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
      />
    ),
    "progress-chart": (
      <ProgressChart
        {...commonProps}
        divider={props.rows ? "" : "center"}
        value={watch(props.questionKey)}
        ranges={props.ranges}
        educationalContent={props.educationalContent}
      />
    ),
    Select: (
      <Select
        {...commonProps}
        options={props.options}
        control={control}
        errors={errors}
        search={props.search}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        value={props.value}
        onChange={props.onChange}
        en={props.en}
      />
    ),
    CheckBoxGroup: (
      <CheckBoxGroup
        {...commonProps}
        watch={watch}
        options={props.options}
        setValue={setValue}
        errors={errors}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        en={props.en}
        labelMore={props.labelMore}
        checkBoxClassName={props.checkBoxClassName}
        optionsContainer={props.optionsContainer}
      />
    ),
    DateInput: (
      <DateInput
        {...commonProps}
        control={control}
        watch={watch}
        id={props.id}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        en={props.en}
        labelMore={props.labelMore}
      />
    ),
    FileField: (
      <FileField
        {...commonProps}
        value={props.value}
        watch={watch}
        setValue={setValue}
        errors={errors}
        labelClassName={props.labelClassName}
        accept={props.accept}
        divider={props.divider || "center"}
        en={props.en}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
      />
    ),
  };

  return componentMap[props.component] || null;
};
