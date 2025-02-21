export const printThis = (style, content) => {
    var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    )
    const html = `<html>
      <head>${style}</head>
      <body>${content}</body>
    </html>`
    WinPrint.document.write(html)
    WinPrint.document.close()
    WinPrint.focus()
    WinPrint.addEventListener("load", () => {
        WinPrint.print()
        WinPrint.close()
    })
}
