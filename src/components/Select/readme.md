# `Select` Component

## Usage

### With `react-hook-form`

```jsx
<Select
    Controller={Controller}
    control={control}
    label="Choose an option"
    questionKey="selectKey"
    options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
    ]}
    errors={errors}
    required
/>
```

### Without `react-hook-form`

```jsx
<Select
    label="Choose an option"
    value={selectedValue}
    onChange={(value) => setSelectedValue(value)}
    options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
    ]}
/>
```

---

## Props

| Prop Name          | Type              | Default                | Description                                                                               |
| ------------------ | ----------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| Controller         | React Component   | undefined              | The Controller component from react-hook-form for integrating form control logic.         |
| control            | object            | undefined              | The control object from react-hook-form to manage form state.                             |
| label              | string            | ""                     | The label text displayed above the Select dropdown.                                       |
| inputClassName     | string            | ""                     | Additional classes for customizing the <select> element's styling.                        |
| optionClassName    | string            | ""                     | Additional classes for customizing individual <option> elements.                          |
| containerClassName | string            | ""                     | Additional classes for styling the outer container of the Select component.               |
| options            | array             | []                     | An array of option objects, where each object contains label and value keys.              |
| required           | boolean           | false                  | Whether the field is required for form validation.                                        |
| divider            | boolean           | false                  | If true, a divider is displayed below the label.                                          |
| dividerClassName   | string            | ""                     | Additional classes for customizing the divider element's styling.                         |
| userGuide          | ReactNode         | ""                     | Tooltip or helper text displayed near the label for guidance.                             |
| questionKey        | string            | ""                     | A unique identifier for the field, used in conjunction with react-hook-form.              |
| watch              | function          | undefined              | The watch function from react-hook-form, used to monitor the current value of the field.  |
| errors             | object            | undefined              | The errors object from react-hook-form, containing validation errors for the form fields. |
| errorMessage       | string            | "این سوال اجباری است." | Custom error message displayed when validation fails.                                     |
| errorIcon          | ReactNode         | <BiError />            | Custom error icon displayed alongside the error message.                                  |
| onChange           | function          | undefined              | Callback function triggered when the dropdown value changes.                              |
| value              | string or number  | undefined              | The current value of the dropdown in uncontrolled mode (without react-hook-form).         |
| archive            | object or boolean | false                  | Optional metadata or archival information associated with the field.                      |
