# Dropdown

A lightweight, customizable dropdown component built with React and CSS Modules. It is ideal for forms, filters, or any UI that requires a dropdown menu.

## Features

`Customizable Label and Options`: Display custom labels and dropdown items.
`Dynamic Value Updates`: Easily capture the selected value with an onChange handler.
`Responsive Design`: Adapts seamlessly to different screen sizes.
`Smooth Transitions`: Includes animations for menu toggling.
`Hover Effects`: Enhances user interaction with hover styles.

## Usage

```jsx
import React, { useState } from "react"
import Dropdown from "./Dropdown"

const App = () => {
    const options = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ]

    const [selectedValue, setSelectedValue] = useState(options[0].value)

    return (
        <Dropdown
            label="Select an option:"
            value={selectedValue}
            options={options}
            onChange={(value) => setSelectedValue(value)}
        />
    )
}

export default App
```

## Props

| Prop     | Type                  | Default   | Description                                              |
| -------- | --------------------- | --------- | -------------------------------------------------------- |
| label    | string                | ""        | Label displayed alongside the dropdown value             |
| value    | string                | ""        | The currently selected value in the dropdown             |
| options  | Array<{label, value}> | []        | List of options, each with a label and value             |
| onChange | function              | undefined | Callback function triggered when a new value is selected |
