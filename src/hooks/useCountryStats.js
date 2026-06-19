import { useEffect, useState } from "react"

const BASE_URL = "https://api.worldbank.org/v2/country"

const fetchIndicator = async (countryCode, indicator, year) => {
  const res = await fetch(
    `${BASE_URL}/${countryCode}/indicator/${indicator}?date=${year - 2}:${year}&format=json`
  )
  const data = await res.json()
  if (!data[1] || data[1].length === 0) return null

  // Find the closest year with actual data (not null)
  const validEntries = data[1].filter((entry) => entry.value !== null)
  if (validEntries.length === 0) return null

  // Sort by closest year to requested year
  validEntries.sort((a, b) =>
    Math.abs(a.date - year) - Math.abs(b.date - year)
  )

  return validEntries[0].value
}

const formatPop = (value) => {
    if (!value) return null
    if(value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
    if(value >= 1_000_000) return `${(value/1_000_000).toFixed(0)}M`
    return value.toString()
}

const formatLife = (value) => {
    if(!value) return null
    return `${Math.round(value)} yrs`
}

const useCountryStats = (year, countryCode) => {
    const [stats, setStats] = useState({pop:null, life:null, loading:false})

    useEffect(() => {
        // only fetch when user pauses on a year for 600ms
        const timer = setTimeout(async () => {
            setStats((prev) => ({...prev, loading: true}))
            try {
                const [popRaw, lifeRaw] = await Promise.all([
                    fetchIndicator(countryCode, "SP.POP.TOTL", year),
                    fetchIndicator(countryCode, "SP.DYN.LE00.IN", year),
                ])
                setStats({
                    pop: formatPop(popRaw),
                    life: formatLife(lifeRaw),
                    loading: false,
                })
            } catch (error) {
                console.error("World Bank API error:", error)
                setStats((prev) => ({...prev,loading:false}))
            }
        }, 600)

        return () => clearTimeout(timer)
    }, [year, countryCode])

    return stats
}

export default useCountryStats