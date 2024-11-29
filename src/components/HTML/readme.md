# HTML Component

A React component that conditionally renders HTML content or a fallback message.

## Features

-   Renders valid HTML strings using `dangerouslySetInnerHTML`.
-   Provides a fallback message when no valid HTML is available.
-   Supports default properties for ease of use.
-   (Optional) Easily integrates sanitization for security.

---

## Usage

### Basic Example

```jsx
import HTML from "react-elements-davis"

function App() {
    const htmlContent = "<p>This is <strong>HTML</strong> content.</p>"

    return (
        <div>
            <h1>HTML Rendering Example</h1>
            <HTML data={htmlContent} />
        </div>
    )
}
```

## Props

| Prop | Type   | Default | Description                                                          |
| ---- | ------ | ------- | -------------------------------------------------------------------- |
| data | string | ""      | The HTML string to render. Fallback content is displayed if invalid. |

## Security Warning

If the data prop contains HTML from an untrusted source, sanitize it to prevent XSS attacks. Use a library like DOMPurify:

```jsx
import DOMPurify from "dompurify"
;<HTMLElement
    dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data),
    }}
/>
```
