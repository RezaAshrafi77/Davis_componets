# ArchiveTable

The `ArchiveTable` component is used for displaying archived data in a table format. It supports pagination, dynamic table resizing, loading states, and displays an empty state when there is no data available.

## Features

-   **Dynamic Data**: Fetches and displays archived data based on configurable options.
-   **Pagination**: Supports navigating through pages of data.
-   **Loading Spinner**: Displays a loading spinner while data is being fetched.
-   **Empty State**: Shows a message when there is no data to display.
-   **Customization**: Allows passing various options to customize the data fetch and table behavior.

## Usage

```jsx
import ArchiveTable from "@/components/ArchiveTable"
;<ArchiveTable
    options={{
        jobID: "12345",
        BC: "category1",
        userID: "67890", // Optional, will fallback to localStorage if not provided
        questionKey: "q1234",
    }}
/>
```

## Props

| Prop          | Type     | Description                                                             |
| ------------- | -------- | ----------------------------------------------------------------------- |
| `options`     | `object` | Configuration object containing `jobID`, `BC`, `userID`, `questionKey`. |
| `jobID`       | `string` | Job ID for fetching archived data.                                      |
| `BC`          | `string` | Unique Base Code for Form.                                              |
| `userID`      | `string` | User Identifier                                                         |
| `questionKey` | `string` | A key representing the related question for archived data.              |
