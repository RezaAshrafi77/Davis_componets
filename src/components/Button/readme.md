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
<Button title="Click Me" variant="variant" onClick={() => alert("Clicked!")} />

<Button title="Save" icon={<SaveIcon />} variant="outlined" />

<Button title="Loading..." loading={true} variant="variant" loadingColor="red" />

<Button icon={<SomeIcon />} variant="text" onClick={() => console.log("Icon Clicked!")} />

```

---

### Props

```markdown
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
```

## Styling

The component uses Tailwind CSS classes managed through a CSS module file (`index.module.css`). You can customize these styles as needed.

### Base Styles

```css
.button {
    @apply flex items-center justify-center gap-4 font-semibold px-2 py-0.5 rounded text-xs lg:text-base shadow-sm;
}

.variant {
    @apply bg-green border border-green text-white;
}

.text {
    @apply p-0 shadow-none text-black;
}

.outlined {
    @apply text-black bg-white border border-black;
}

.disabled {
    @apply bg-gray-200 text-gray-500 border-gray-300;
}

.icon {
    @apply p-0.5;
}
```

---
