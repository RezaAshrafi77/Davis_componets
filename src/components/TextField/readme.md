# TextField Component

A versatile and customizable `TextField` component for React applications. It integrates seamlessly with React Hook Form for validation and supports various features like labels, icons, error handling, and user guidance.

## Features

-   **React Hook Form Support**: Compatible with `register` and `watch` for form management.
-   **Error Handling**: Displays error messages and styles when validation fails.
-   **Customizable Icons**: Add custom icons for the input field.
-   **Flexible Input Types**: Supports both `input` and `textarea` elements.
-   **Dynamic Styling**: Includes hover, focus, and disabled styles using `classNames`.

---

## Usage

### Using React Hook Form

```jsx
;<TextField
    label="Name"
    questionKey="name"
    register={register}
    watch={watch}
    errors={errors}
    required
/>
```

### Using Custom `onChange` and `value`:

```jsx
<TextField
    label="Custom Input"
    questionKey="custom"
    value={customValue}
    onChange={(e) => setCustomValue(e.target.value)}
    errors={{ custom: { message: "Custom error message" } }}
/>
```

### Make Required Without React Hook Form

```jsx
import React from "react"
import { useForm } from "react-hook-form"
import { TextField } from "react-elements-davis"

const App = () => {
    const [inputValue, setInputValue] = React.useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    React.useEffect(() => {
        register("username", {
            required: true,
        })
    }, [])

    const onSubmit = (data) => {
        console.log("Form Data:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Username"
                questionKey="username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                errors={errors}
            />
        </form>
    )
}

export default App
```

---

## Props

| Key                | Type           | Default            | Description                                                        |
| ------------------ | -------------- | ------------------ | ------------------------------------------------------------------ |
| containerClassName | string         | ""                 | Custom class for the outer container.                              |
| className          | string         | ""                 | Custom class for the input container.                              |
| label              | string         | ""                 | The label text for the input field.                                |
| icon               | JSX.Element    | <BsPencilSquare /> | Custom icon for the input field.                                   |
| userGuide          | string         | ""                 | Additional helper text displayed with the label.                   |
| archive            | object         | false              | An object with additional properties for archive handling.         |
| labelClassName     | string         | ""                 | Custom class for the label.                                        |
| questionKey        | string         | ""                 | Unique key for identifying the input field.                        |
| required           | boolean/string | false              | Mark the field as required with a validation message if necessary. |
| register           | function       | null               | React Hook Form's register function for validation.                |
| watch              | function       | null               | React Hook Form's watch function for tracking input values.        |
| onChange           | function       | null               | Custom onChange handler.                                           |
| value              | string         | ""                 | Custom value for the input field.                                  |
| errors             | object         | null               | Object containing validation errors.                               |
| pattern            | object         | null               | Regex pattern for input validation.                                |
| disabled           | boolean        | false              | Disables the input field.                                          |
| errorIcon          | JSX.Element    | <BiError />        | Icon to display alongside error messages.                          |
