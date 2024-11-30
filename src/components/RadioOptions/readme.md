# RadioOptions Component

The `RadioOptions` component is a flexible and accessible group of radio buttons designed for integration with forms. It supports dynamic layouts, error handling, and enhanced accessibility.

---

## Features

-   **Customizable Layout**: Adapts to different screen sizes and layouts (flexible or wrapped).
-   **Error Handling**: Displays error messages with customizable icons.
-   **Dynamic Options**: Easily render a list of options with labels and values.
-   **Form Integration**: Works seamlessly with form libraries like React Hook Form.
-   **Accessibility**: Includes ARIA attributes and supports user guidance.

---

## Props

| Prop                 | Type        | Default                  | Description                                                       |
| -------------------- | ----------- | ------------------------ | ----------------------------------------------------------------- |
| `containerClassName` | `string`    | `""`                     | Additional classes for the main container.                        |
| `register`           | `function`  | `() => {}`               | Function to register fields (e.g., React Hook Form).              |
| `options`            | `Array`     | `[]`                     | Array of options, each with `label` and `value` properties.       |
| `active`             | `string`    | `""`                     | The currently selected value.                                     |
| `divider`            | `boolean`   | `false`                  | Displays a divider between the label and options.                 |
| `label`              | `string`    | `""`                     | The main label for the radio group.                               |
| `onClick`            | `function`  | `null`                   | Callback function triggered when an option is clicked.            |
| `userGuide`          | `string`    | `null`                   | Additional user guidance displayed with the label.                |
| `questionKey`        | `string`    | `""`                     | Unique key for the question (used for form handling and errors).  |
| `wrap`               | `boolean`   | `false`                  | Controls whether options wrap or are laid out in a single row.    |
| `labelClassName`     | `string`    | `""`                     | Additional classes for the label.                                 |
| `optionsContainer`   | `string`    | `""`                     | Additional classes for the options container.                     |
| `radioClassName`     | `string`    | `""`                     | Additional classes for each radio button.                         |
| `required`           | `boolean`   | `false`                  | Specifies if the field is required.                               |
| `educationalContent` | `ReactNode` | `null`                   | Additional educational content to display near the label.         |
| `errors`             | `object`    | `{}`                     | Error object for form validation.                                 |
| `errorIcon`          | `ReactNode` | `<BiError />`            | Icon displayed alongside the error message.                       |
| `errorMessage`       | `string`    | `"این سوال اجباری است."` | Message displayed when there is an error.                         |
| `archive`            | `object`    | `null`                   | Additional metadata to include in the label (e.g., question key). |

---

## Usage

### Basic Example

```jsx
import { RadioOptions } from "react-elements-davis"
import { useForm } from "react-hook-form"

function FormExample() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ]

    const onSubmit = (data) => {
        console.log("Form Data:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <RadioOptions
                label="Choose an option"
                questionKey="exampleQuestion"
                options={options}
                register={register}
                required
                errors={errors}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

## With Error Handling

```jsx
import { RadioOptions } from "react-elements-davis"

function ErrorExample() {
    const errors = { question1: true }

    return (
        <RadioOptions
            label="Choose an option"
            questionKey="question1"
            options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
            ]}
            errors={errors}
            errorMessage="You must select an option."
        />
    )
}
```
