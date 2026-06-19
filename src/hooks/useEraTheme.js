import { useEffect, useState } from "react"
import { getTheme } from "../utils/themes"

const useEraTheme = (year) => {
    const [theme,setTheme] = useState(() => getTheme(year))

    useEffect(() => {
        const newTheme = getTheme(year)
        setTheme(newTheme)

        const root = document.documentElement
        root.style.setProperty("--color-bg", newTheme.bg)
        root.style.setProperty("--color-surface", newTheme.surface)
        root.style.setProperty("--color-text", newTheme.text)
        root.style.setProperty("--color-accent", newTheme.accent)
        root.style.setProperty("--color-tint", newTheme.tint)
        root.style.setProperty("--font-era", newTheme.font)
    },[year])

    return theme
}

export default useEraTheme
