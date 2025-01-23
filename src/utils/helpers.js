import { style } from "./style";

export const exportTableToExcel = (id) => {
  // Get the table HTML
  const table = document.getElementById(id);
  if (!table) return;

  const tableHTML = table.outerHTML.replace(/ /g, "%20");

  // Specify the data type
  const dataType = "application/vnd.ms-excel";

  // Define the file name
  const fileName = "table.xls";

  // Create a download link element
  const downloadLink = document.createElement("a");

  // Browser check to support Microsoft Excel file download
  if (navigator.msSaveOrOpenBlob) {
    const blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // Create a link to the file
    downloadLink.href = `data:${dataType}, ${tableHTML}`;

    // Setting the file name
    downloadLink.download = fileName;

    // Triggering the function
    downloadLink.click();
  }
};

export const printPartOfPage = (id) => {
  const content = document.getElementById(id);
  const WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );
  const html = `<html>
      <head>${style}</head>
      <body dir="rtl">${content.outerHTML}</body>
    </html>`;
  WinPrint.document.write(html);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.addEventListener("load", () => {
    WinPrint.print();
    WinPrint.close();
  });
};
