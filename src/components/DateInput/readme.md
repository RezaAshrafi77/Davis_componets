# DateInput Component

The `DateInput component` is a reusable, customizable date picker field built using `react-multi-date-picker`. It integrates with `react-hook-form` for form validation and state management and supports the Persian calendar by default.

---

## Features

-   `Persian Calendar Support`: Uses the Persian calendar (`react-date-object`) for localized date selection.
-   `React-Hook-Form Integration`: Easily manages form state and validation.
-   `Customizable Placeholder`: Change the placeholder text for the input field.
-   `Error Handling`: Displays error messages dynamically.
-   `Customizable Icon`: Allows the use of custom icons for the calendar button.
-   `Theming`: Fully customizable using CSS classes or utility-first frameworks like Tailwind CSS.

---

## Props

| Prop Name          | Type        | Default              | Description                                                               |
| ------------------ | ----------- | -------------------- | ------------------------------------------------------------------------- |
| label              | string      | ""                   | The label text displayed above the input field.                           |
| id                 | string      | ""                   | A unique identifier for the input field.                                  |
| control            | object      | null                 | The react-hook-form control object for managing form state.               |
| containerClassName | string      | ""                   | Additional CSS classes for the outermost container.                       |
| className          | string      | ""                   | Additional CSS classes for the input field container.                     |
| required           | boolean     | false                | Marks the field as required.                                              |
| errors             | object      | {}                   | The error object from react-hook-form for displaying validation messages. |
| watch              | function    | null                 | The react-hook-form watch function to track the field's value.            |
| labelClassName     | string      | ""                   | Additional CSS classes for the label.                                     |
| placeholder        | string      | "روز/ ماه/ سال"      | Placeholder text displayed in the input field.                            |
| format             | string      | "YYYY/MM/DD"         | Format of the displayed date (e.g., YYYY-MM-DD).                          |
| calendar           | object      | persian              | The calendar type for the date picker.                                    |
| locale             | object      | persian_fa           | The localization settings for the calendar.                               |
| icon               | ReactNode   | <BsCalendar2Event /> | Customizable calendar icon.                                               |
| archive            | object      | null                 | Additional metadata to include in the label (e.g., question key).         |
| errorIcon          | JSX.Element | <BiError />          | Icon to display alongside error messages.                                 |

---

## Usage

### Basic Example

```jsx
import { useForm } from "react-hook-form"
import DateInput from "./DateInput"

function App() {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DateInput
                label="تاریخ تولد"
                id="birthDate"
                control={control}
                required
                errors={errors}
                watch={watch}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

---

## Advanced Example with Custom Styles and Icon

```jsx
import { useForm } from "react-hook-form"
import DateInput from "./DateInput"
import { FaRegCalendarAlt } from "react-icons/fa"

function App() {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DateInput
                label="تاریخ شروع"
                id="startDate"
                control={control}
                errors={errors}
                watch={watch}
                placeholder="انتخاب تاریخ"
                format="DD-MM-YYYY"
                icon={<FaRegCalendarAlt />}
                containerClassName="custom-container"
                className="custom-input"
                labelClassName="custom-label"
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```
