import { useEffect, useState } from "react"

const LASTFM_KEY = import.meta.env.VITE_LASTFM_API_KEY

// Moved to top so it's defined before useEraMusic uses it
const getCountryName = (code) => {
  const map = {
    US: "united+states",
    GB: "united+kingdom",
    IN: "india",
    FR: "france",
    DE: "germany",
    JP: "japan",
    CN: "china",
    BR: "brazil",
    RU: "russia",
    AU: "australia",
    CA: "canada",
    ZA: "south+africa",
    MX: "mexico",
    KR: "republic+of+korea",
    IT: "italy",
    ES: "spain",
    NG: "nigeria",
    AR: "argentina",
    EG: "egypt",
  }
  return map[code] || "united+states"
}

const useEraMusic = (year, countryCode) => {
  const [music, setMusic] = useState({ song: null, artist: null, loading: false })

  useEffect(() => {
    const timer = setTimeout(async () => {
      setMusic((prev) => ({ ...prev, loading: true }))
      try {
        let url = ""

        if (year >= 2005) {
          if (countryCode !== "WLD") {
            const countryName = getCountryName(countryCode)
            url = `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${countryName}&api_key=${LASTFM_KEY}&format=json&limit=1`
          } else {
            url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_KEY}&format=json&limit=1`
          }

          const res = await fetch(url)
          const data = await res.json()

          const tracks = data?.tracks?.track || data?.toptracks?.track || []
          const top = Array.isArray(tracks) ? tracks[0] : tracks
          console.log("Last.fm top track:", top)

          if (top) {
            setMusic({
              song: top.name,
              artist: top.artist?.name || top.artist,
              loading: false,
            })
            return
          }
        }

        setMusic({ song: null, artist: null, loading: false })
      } catch (err) {
        console.error("Last.fm API error:", err)
        setMusic({ song: null, artist: null, loading: false })
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [year, countryCode])

  return music
}

export default useEraMusic