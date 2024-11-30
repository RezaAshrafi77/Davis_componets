import { useEffect, useState } from "react"

export default function useDevice() {
    const [device, setDevice] = useState("mobile")
    const checkDevice = () => {
        const width = window.innerWidth
        if (width < 744) {
            setDevice("mobile")
        } else if (width >= 744 && width <= 1024) {
            setDevice("tablet")
        } else {
            setDevice("desktop")
        }
    }
    useEffect(() => {
        checkDevice()
        window.addEventListener("resize", () => {
            checkDevice()
        })
    }, [])
    return [device]
}
