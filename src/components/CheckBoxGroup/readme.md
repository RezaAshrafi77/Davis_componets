# CheckBoxGroup Component

The `CheckBoxGroup` component is a reusable group of checkboxes, designed for managing multiple boolean selections within a form. It integrates seamlessly with forms, offering error handling, validation, and support for responsiveness.

It utilizes the `CheckBox` component for individual checkboxes and allows for flexible layouts depending on screen size.

## Features

-   `Error Handling`: Displays error messages when required fields are not selected.
-   `Responsiveness`: Adjusts layout based on the screen size (e.g., mobile vs desktop).
-   `Customizable`: Allows customization of labels, error messages, and error icons.
-   `Divider Support`: Optionally includes a divider between the label and options.
-   `Archive Integration`: Optional integration with archive data for form submission.

## Usage

### Import the component:

```jsx
import { CheckBoxGroup } from "react-elements-davis"

function App() {
    return (
        <CheckBoxGroup
            containerClassName="custom-class"
            optionsContainer="flex flex-wrap"
            checkBoxClassName="custom-checkbox"
            options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
            ]}
            label="Choose Options"
            required={true}
            questionKey="myOptions"
            setValue={setValue} // from react-hook-form
            watch={watch} // from react-hook-form
            errors={errors} // from react-hook-form
            errorMessage="This field is required"
            userGuide="Select one or more options"
            divider={true}
        />
    )
}
```

---

## Props

| Prop               | Type        | Description                                                                                 | Default Value        |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------- | -------------------- |
| containerClassName | string      | Additional custom class name for the outer container.                                       | ""                   |
| optionsContainer   | string      | Custom class name for the options container.                                                | ""                   |
| checkBoxClassName  | string      | Customclass name for individual checkboxes.                                                 | ""                   |
| options            | array       | Array of options for the checkboxes. Each option should have a label and a value.           | []                   |
| label              | string      | The label to display above the checkboxes.                                                  | ""                   |
| wrap               | boolean     | Whether to wrap checkboxes on smaller screens (mobile first).                               | false                |
| divider            | boolean     | Whether to display a divider between the label and the options.                             | false                |
| labelClassName     | string      | Custom class name for the label.                                                            | ""                   |
| userGuide          | string      | User guide text displayed below the label (optional).                                       | ""                   |
| errors             | object      | The errors object from react-hook-form used to show validation errors.                      | {}                   |
| questionKey        | string      | A unique key for identifying this group of checkboxes (used for form validation).           | ""                   |
| required           | boolean     | Whether the checkboxes are required for form validation.                                    | false                |
| setValue           | function    | A function from react-hook-form to set the value of the checkbox group.                     | () => {}             |
| errorMessage       | string      | Custom error message to display if the field is not selected.                               | این سوال اجباری است. |
| watch              | function    | A function from react-hook-form to watch the current value of the checkbox group.           | () => {}             |
| errorIcon          | JSX.Element | A custom icon to display alongside the error message.                                       | <BiError />          |
| archive            | object      | Optional integration for archiving related data (e.g., sending the question to an archive). | null                 |
| dividerClassName   | string      | Custom class for the divider.                                                               | ""                   |
