# Radio Component

A customizable and accessible Radio button component built with React, Tailwind CSS, and CSS modules. The `Radio` component supports dynamic styles, form integration, and accessibility features.

## Features

-   🖌 **Customizable**: Easily style using Tailwind CSS and custom `className` props.
-   🔗 **Form-friendly**: Integrates seamlessly with forms using `name` and `value` attributes.
-   ♿ **Accessible**: Includes ARIA attributes for screen readers.
-   🌟 **Responsive Design**: Adapts to various screen sizes with responsive classes.

---

## Usage

### Basic Example

```jsx
import { Radio } from "react-elements-davis"

function App() {
    return (
        <form>
            <Radio name="example" label="Option 1" value="1" />
            <Radio name="example" label="Option 2" value="2" />
        </form>
    )
}

export default App
```

### Controlled Component

```jsx
import { useState } from "react"
import Radio from "./Radio"

function ControlledExample() {
    const [selected, setSelected] = useState("1")

    return (
        <form>
            <Radio
                name="controlled"
                label="Option 1"
                value="1"
                checked={selected === "1"}
                onChange={() => setSelected("1")}
            />
            <Radio
                name="controlled"
                label="Option 2"
                value="2"
                checked={selected === "2"}
                onChange={() => setSelected("2")}
            />
        </form>
    )
}

export default ControlledExample
```

---

## Props

| Key       | Type     | Default | Description                                               |
| --------- | -------- | ------- | --------------------------------------------------------- |
| label     | string   | ""      | The label text displayed alongside the radio button.      |
| className | string   | ""      | Additional classes to style the container.                |
| checked   | boolean  | false   | Specifies if the radio button is selected.                |
| disabled  | boolean  | false   | Disables the radio button, making it non-interactive.     |
| name      | string   | ""      | The name of the radio input (for form grouping).          |
| value     | string   | ""      | The value of the radio input, submitted with the form.    |
| onChange  | function | null    | Callback triggered when the radio button's state changes. |
