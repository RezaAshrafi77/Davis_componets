# Page Component

The `Page` component serves as a flexible wrapper for pages in your React application. It provides a consistent layout structure, optional routing features, and customizable content display.

---

## Features

-   **Project Name Display:** Optionally display the project name with a back navigation button.
-   **Routing Support:** Dynamically render a list of routes when the `router` prop is enabled.
-   **Flexible Layout:** Supports custom children when routing is not required.
-   **Responsive Design:** Includes responsive styles for various screen sizes using Tailwind CSS.

## Usage

### Basic Example

```jsx
import Page from "./path/to/Page"

function App() {
    return (
        <Page name="My Project">
            <p>Welcome to the project page!</p>
        </Page>
    )
}
```

```jsx
import { Page } from "react-elements-davis"

const routes = [
    {
        title: "گزارشات ترند سلامت فرد",
        image: "",
        link: "/trend",
    },
    {
        title: "چاپ بر اساس پذیرش",
        image: "",
        link: "/print",
    },
    {
        title: "گزارشات تجمعی",
        image: "",
        link: "/aggregate",
    },
]

function App() {
    return <Page name="My Project" router={true} routes={routes} />
}
```

## Props

| Prop     | Type    | Default | Description                                                                           |
| -------- | ------- | ------- | ------------------------------------------------------------------------------------- |
| children | node    | null    | Content to render when routing is not enabled.                                        |
| name     | string  | ""      | The name of the project to display.                                                   |
| back     | boolean | false   | If true, renders back arrows for go to previus page.                                  |
| router   | boolean | false   | If true, renders routes instead of children.                                          |
| routes   | array   | []      | List of route objects to display. Each object should include link and title and image |
