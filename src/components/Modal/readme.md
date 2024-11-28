# Modal

A flexible React modal component for displaying content in an overlay with smooth animations, customizable with Tailwind CSS utilities.

## Props

| Prop                 | Type       | Description                                              |
| -------------------- | ---------- | -------------------------------------------------------- |
| `isOpen`             | `boolean`  | Controls whether the modal is visible.                   |
| `onClose`            | `function` | Function to close the modal when called.                 |
| `children`           | `node`     | The content to be displayed inside the modal.            |
| `containerClassName` | `string`   | Optional class name for customizing the modal container. |

## Usage

```jsx
import { useState } from "react"
import Modal from "./Modal"
import Button from "./Button"

export default function App() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => setIsOpen(!isOpen)

    return (
        <div>
            <Button onClick={toggleModal}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={toggleModal}>
                <h2>Modal Title</h2>
                <p>This is a customizable modal component.</p>
                <Button onClick={toggleModal}>Close</Button>
            </Modal>
        </div>
    )
}
```

```html
<!DOCTYPE html>
<html lang="fa">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>title</title>
    </head>
    <body dir="rtl">
        <div id="root"></div>
        <div id="modal"></div>
        <script type="module" src="/src/main.jsx"></script>
    </body>
</html>
```
