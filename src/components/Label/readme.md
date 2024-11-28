# Label Component

A customizable React component for displaying form labels with optional icons and modals for additional content like user guides and archives.

## Features

-   **Label Text:** Displays label text with optional required asterisk.
-   **Icons:** Supports user guide (`FaRegQuestionCircle`), archive (`LiaArchiveSolid`), and educational content (`IoIosInformationCircle`).
-   **Modals:** Opens modals for user guides or archived content.
-   **Fully Customizable:** Customize with Tailwind CSS.

## Props

| Prop                 | Type     | Description                                                                                          |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `label`              | `string` | The label text to display.                                                                           |
| `required`           | `bool`   | Whether the label is required (displays `*`).                                                        |
| `className`          | `string` | Additional custom class names.                                                                       |
| `userGuide`          | `node`   | Content for the user guide modal (optional).                                                         |
| `archive`            | `string` | Archive key for fetching archived content (optional).                                                |
| `educationalContent` | `object` | Contains `show` (boolean) to display the content icon and `action` (function) to trigger the action. |

## Example

```jsx
<Label
    label="نام"
    required={true}
    userGuide={<div>راهنمای سوال</div>}
    educationalContent={{
        show: true,
        action: () => alert("Educational Content"),
    }}
/>
```
