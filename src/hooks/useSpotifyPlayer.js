import { useEffect, useState } from "react"

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

// getting spotify access token using client credentials flow
const getSpotifyToken = async () => {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: "grant_type=client_credentials",
    })
    const data = await res.json()
    return data.access_token
}

// search spotify for a track and return its ID
const searchTrack = async (song,artist,token) => {
    const query = encodeURIComponent(`track:${song} artist:${artist}`)
    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        {headers: {Authorization: `Bearer ${token}`}}
    )
    const data = await res.json()
    const track = data?.tracks?.items?.[0]
    return track?.id || null
}

const useSpotifyPlayer = (song,artist) => {
    const [trackId, setTrackId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!song || !artist) return

        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const token = await getSpotifyToken()
                const id = await searchTrack(song, artist, token)
                setTrackId(id)
            } catch (error) {
                console.error("Spotify error:",error)
                setTrackId(null)
            }
            finally{
                setLoading(false)
            }
        },800)
        return () => clearTimeout(timer)
    },[song,artist])
    return {trackId, loading}
}

export default useSpotifyPlayer