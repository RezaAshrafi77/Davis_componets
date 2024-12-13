# FieldSet Component

The `FieldSet` component is a styled, reusable fieldset element with support for customizable legends and children. It enhances the visual appeal and accessibility of form groupings or content sections.

---

## Features

-   **Customizable Styles**: Easily customize fieldset and legend styles using props.
-   **Accessibility**: Includes ARIA roles and attributes for improved accessibility.
-   **Flexible Content**: Accepts any child elements, making it versatile for various use cases.
-   **Responsive Design**: Styled with responsive classes for seamless integration across devices.

---

## Props

| Prop             | Type        | Default | Description                                        |
| ---------------- | ----------- | ------- | -------------------------------------------------- |
| `title`          | `string`    | `null`  | The title or legend of the fieldset.               |
| `children`       | `ReactNode` | `null`  | The content to be wrapped inside the fieldset.     |
| `className`      | `string`    | `""`    | Additional CSS classes for the fieldset container. |
| `titleClassName` | `string`    | `""`    | Additional CSS classes for the legend (title).     |

---

## Usage

### Basic Example

```jsx
import { FieldSet } from "react-elements-davis"

function Example() {
    return (
        <FieldSet title="Personal Details">
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" />
            </div>
        </FieldSet>
    )
}

export default Example
```

---

### Advanced Example with Custom Classes

```jsx
import { FieldSet } from "react-elements-davis"

function StyledExample() {
    return (
        <FieldSet
            title="Account Information"
            className="border-success-500"
            titleClassName="text-success"
            childrenClassName="space-y-4"
        >
            <div>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" />
            </div>
        </FieldSet>
    )
}

export default StyledExample
```
