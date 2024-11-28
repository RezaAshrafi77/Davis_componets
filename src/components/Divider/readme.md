# Divider Component

A simple and reusable `Divider` component for React projects.

## Features

-   **Lightweight:** Minimal structure with no dependencies on external libraries other than `classnames`.
-   **Flexible:** Accepts custom `className` props for styling.
-   **Scoped Styles:** Uses CSS Modules to prevent class name conflicts.

## Usage

```jsx
function App() {
    return (
        <div>
            <h1>Title</h1>
            <Divider />
            <p>Some content below the divider.</p>
        </div>
    )
}
```

## Props

| Prop      | Type   | Description                          | Default   |
| --------- | ------ | ------------------------------------ | --------- |
| className | string | Optional additional CSS class names. | undefined |
