# ProjectName Component

The `ProjectName` component is a simple yet customizable header component that displays a project or page title with optional navigation support. It can include a back button (`"بازگشت"`) to return to the previous page if the `back` prop is provided, and the layout is fully responsive for different screen sizes.

---

## Features

-   **Dynamic Project Title:** Displays a customizable title for the project or page.
-   **Back Button:** Optional back navigation button that allows users to return to the previous page.
-   **Responsive Design:** Fully responsive to ensure it looks great on all screen sizes.
-   **Clean Layout:** Uses separators on both sides of the title for a minimalistic, structured design.
-   **Customizable Styling:** Supports additional customization via CSS modules and the `className` prop.

---

## Usage

### Basic Example

```jsx
import { ProjectName } from "react-elements-davis"

function App() {
    return (
        <div>
            <ProjectName name="My Project" />
        </div>
    )
}
```

### Example with Back Button

```jsx
import { ProjectName } from "react-elements-davis"

function App() {
    return (
        <div>
            <ProjectName name="My Project" back={true} />
        </div>
    )
}
```

---

## Props

| Key  | Type    | Default | Description                                                                  |
| ---- | ------- | ------- | ---------------------------------------------------------------------------- |
| name | string  | ""      | The name of the project or page to display as the title                      |
| back | boolean | false   | If true, a back button is rendered, enabling navigation to the previous page |

## Notes:

-   The name prop is required to display the project title.
-   The back prop is optional and controls the display of the back button. If not provided, the back button is not displayed.
