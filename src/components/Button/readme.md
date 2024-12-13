# Button Component

A versatile and reusable React Button component built with Tailwind CSS and CSS Modules. It supports multiple styles (variants), loading states, and icon integration for flexible usage.

## Features

-   **Customizable Variants**: Easily switch between styles like `variant`, `text`, `outlined`, and more.
-   **Loading State**: Shows a spinner when the button is in a loading state.
-   **Icon Support**: Add icons alongside text or as icon-only buttons.
-   **Disabled State**: Automatically styles and disables the button when required.
-   **Responsive and Accessible**: Follows accessibility standards with dynamic styling for responsiveness.

## Usage

### Basic Button

```jsx
<Button title="ارسال" variant="variant" onClick={() => alert("Clicked!")} />

<Button title="دخیره اطلاعات" icon={<SaveIcon />} variant="outlined" />

<Button loading={true} variant="variant" loadingColor="red" />

<Button icon={<SomeIcon />} variant="text" onClick={() => console.log("Icon Clicked!")} />

```

## Props

| Prop Name      | Type        | Default          | Description                                                 |
| -------------- | ----------- | ---------------- | ----------------------------------------------------------- |
| `title`        | `string`    | `undefined`      | Text displayed inside the button.                           |
| `variant`      | `string`    | `"variant"`      | Button style variant (`variant`, `text`, `outlined`, etc.). |
| `type`         | `string`    | `"button"`       | HTML `type` of the button (`button`, `submit`, or `reset`). |
| `loading`      | `bool`      | `false`          | Shows a loading spinner when true.                          |
| `disabled`     | `bool`      | `false`          | Disables the button when true.                              |
| `className`    | `string`    | `undefined`      | Additional classes for customization.                       |
| `icon`         | `ReactNode` | `null`           | Icon to display inside the button.                          |
| `loadingColor` | `string`    | `"currentColor"` | Color of the spinner in the loading state.                  |
