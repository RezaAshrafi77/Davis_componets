# Table

A responsive, customizable table component built with React and Tailwind CSS. This component supports pagination, dynamic table sizes, selectable rows, striped rows, and more.

## Features

Dynamic Columns and Rows: Easily render table data by passing arrays.
Pagination: Supports navigation between pages with Next and Previous buttons.
Customizable Table Sizes: Adjust the number of rows per page dynamically using a dropdown.
Selectable Rows: Highlight rows on hover.
Striped Rows: Alternate row background colors for better readability.
Print Table: Integrated print button to print the current table view.
Responsive Design: Optimized for mobile and desktop views.

## Usage

Here’s an example of how to use the Table component:

```jsx
import React, { useState } from "react";
import Table from "./Table";

const App = () => {
  const columns = ["Name", "Age", "Email"];
  const rows = [
    ["John Doe", 28, "john@example.com"],
    ["Jane Smith", 34, "jane@example.com"],
    ["Bob Johnson", 45, "bob@example.com"],
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState(10);

  return (
    <Table
      columns={columns}
      rows={rows}
      pagination={true}
      page={currentPage}
      setPage={setCurrentPage}
      tableSize={tableSize}
      setTableSize={setTableSize}
      selectable={true}
      stripe={true}
    />
  );
};

export default App;
```

## Props

| Prop         | Type              | Default         | Description                                                          |
| ------------ | ----------------- | --------------- | -------------------------------------------------------------------- |
| columns      | Array<string>     | []              | Array of column titles.                                              |
| rows         | Array<Array<any>> | []              | Array of rows, where each row is an array of cell data.              |
| pagination   | boolean           | false           | Enables pagination if true.                                          |
| currentPage  | number            | 1               | Current page index for pagination.                                   |
| setPage      | function          | undefined       | Function to update the current page index.                           |
| tableSize    | number            | 10              | Number of rows displayed per page.                                   |
| setTableSize | function          | undefined       | Function to update the table size.                                   |
| tableSizes   | Array<number>     | [5, 10, 15, 20] | List of table size options for the dropdown.                         |
| selectable   | boolean           | false           | Highlights rows on hover when true.                                  |
| stripe       | boolean           | false           | Adds striped background for alternate rows when true.                |
| children     | ReactNode         | null            | Custom elements or components to be rendered in the pagination area. |
| onSelect     | function          | () => {}        | select a row                                                         |
| `colors`     | Array<object>     | undefined       | select a custom table row for specific value                         |
| `colFilter`  | number            | undefiend       | Target column for Filter and check value with it for `colors` prop   |
