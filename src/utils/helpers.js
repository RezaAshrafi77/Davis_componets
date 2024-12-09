export const parse = (res) => {
    var n = {}
    if (typeof res == "string")
        try {
            res = res.replace(/X@X@/g, "\\n")
            n = JSON.parse(res)
        } catch (E) {
            try {
                n = eval("(" + res + ")")
            } catch (E) {
                try {
                    res = res.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
                    n = JSON.parse(res)
                } catch (E) {
                    n = eval("(" + res + ")")
                }
            }
        }
    else n = res
    return n
}
