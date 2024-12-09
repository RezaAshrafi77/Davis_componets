# FileField Component

The `FileField` component is a React-based file upload solution designed to handle file selection, preview, deletion, and integration with form validation (via `react-hook-form`). This component provides a clean user interface with file upload actions, a confirmation modal for file deletion, and easy customization.

## Features

- **File Upload**: Allows users to select files from their device.
- **File Preview**: Displays the file name and provides a button to open the file in a new tab.
- **File Deletion**: Allows users to delete the selected file with a confirmation modal.
- **Error Handling**: Displays validation error messages for required fields.
- **Supports React Hook Form**: Easily integrates with `react-hook-form` for form validation.
- **Customizable**: Offers customization through props like custom CSS classes and labels.

## Usage

Here’s a basic usage example integrating the `FileField` component into a form using `react-hook-form`.

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { FileField } from "react-elements-davis";

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileField
        label="Upload Document"
        questionKey="document"
        required={true}
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        baseURL="http://your-api-base-url.com"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

## Props

| Prop               | Type     | Description                                                                                                                          | Default |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| label              | string   | The label for the file upload field.                                                                                                 | -       |
| questionKey        | string   | The unique key used to identify the field value when interacting with react-hook-form or state.                                      | -       |
| required           | boolean  | Marks the field as required for validation.                                                                                          | false   |
| setValue           | function | Function to set the value when using react-hook-form.                                                                                | -       |
| onChange           | function | A callback function triggered when the file is changed.                                                                              | -       |
| register           | function | The register function from react-hook-form to register the field for validation.                                                     | -       |
| errors             | object   | The errors object from react-hook-form, used to display validation errors.                                                           | -       |
| watch              | function | The watch function from react-hook-form, used to observe the value of the field.                                                     | -       |
| divider            | boolean  | Whether to show a divider below the label.                                                                                           | true    |
| dividerClassName   | string   | Custom CSS class for the divider.                                                                                                    | -       |
| buttonClassName    | string   | Custom CSS class for the upload button.                                                                                              | -       |
| containerClassName | string   | Custom CSS class for the container element.                                                                                          | -       |
| archive            | object   | (optional) Archive options for viewing the uploaded file, including the file link and a custom render function for the archive cell. | false   |
| labelClassName     | string   | Custom CSS class for the label.                                                                                                      | -       |
| className          | string   | Custom CSS class for the input field.                                                                                                | -       |
| baseURL            | string   | The base URL for generating the file link.                                                                                           | -       |
