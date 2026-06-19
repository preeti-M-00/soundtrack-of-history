// ─── Moon Phase ───────────────────────────────────────────────────────────────
export const getMoonPhase = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Known new moon reference date: January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6)
  const lunarCycle = 29.53058867

  const diffMs = date - knownNewMoon
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  const phase = ((diffDays % lunarCycle) + lunarCycle) % lunarCycle

  if (phase < 1.85) return { name: "New Moon", emoji: "🌑", description: "A new beginning — the moon is dark tonight" }
  if (phase < 7.38) return { name: "Waxing Crescent", emoji: "🌒", description: "A sliver of light growing in the sky" }
  if (phase < 9.22) return { name: "First Quarter", emoji: "🌓", description: "Half the moon glows tonight" }
  if (phase < 14.77) return { name: "Waxing Gibbous", emoji: "🌔", description: "The moon grows fuller each night" }
  if (phase < 16.61) return { name: "Full Moon", emoji: "🌕", description: "The moon shines in full glory tonight" }
  if (phase < 22.15) return { name: "Waning Gibbous", emoji: "🌖", description: "The moon begins its slow retreat" }
  if (phase < 23.99) return { name: "Last Quarter", emoji: "🌗", description: "Half the moon fades into darkness" }
  if (phase < 29.53) return { name: "Waning Crescent", emoji: "🌘", description: "The moon whispers its farewell" }
  return { name: "New Moon", emoji: "🌑", description: "A new beginning — the moon is dark tonight" }
}

// ─── Zodiac Sign ──────────────────────────────────────────────────────────────
export const getZodiac = (date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return { sign: "Aries", emoji: "♈", constellation: "The Ram", element: "Fire", dates: "Mar 21 – Apr 19" }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return { sign: "Taurus", emoji: "♉", constellation: "The Bull", element: "Earth", dates: "Apr 20 – May 20" }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return { sign: "Gemini", emoji: "♊", constellation: "The Twins", element: "Air", dates: "May 21 – Jun 20" }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return { sign: "Cancer", emoji: "♋", constellation: "The Crab", element: "Water", dates: "Jun 21 – Jul 22" }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return { sign: "Leo", emoji: "♌", constellation: "The Lion", element: "Fire", dates: "Jul 23 – Aug 22" }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return { sign: "Virgo", emoji: "♍", constellation: "The Maiden", element: "Earth", dates: "Aug 23 – Sep 22" }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return { sign: "Libra", emoji: "♎", constellation: "The Scales", element: "Air", dates: "Sep 23 – Oct 22" }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return { sign: "Scorpio", emoji: "♏", constellation: "The Scorpion", element: "Water", dates: "Oct 23 – Nov 21" }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return { sign: "Sagittarius", emoji: "♐", constellation: "The Archer", element: "Fire", dates: "Nov 22 – Dec 21" }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return { sign: "Capricorn", emoji: "♑", constellation: "The Sea Goat", element: "Earth", dates: "Dec 22 – Jan 19" }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return { sign: "Aquarius", emoji: "♒", constellation: "The Water Bearer", element: "Air", dates: "Jan 20 – Feb 18" }
  return { sign: "Pisces", emoji: "♓", constellation: "The Fish", element: "Water", dates: "Feb 19 – Mar 20" }
}

// ─── Day of Week ──────────────────────────────────────────────────────────────
export const getDayOfWeek = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const facts = [
    "Born on a Sunday — the day of rest and new beginnings",
    "Born on a Monday — the moon's day, full of intuition",
    "Born on a Tuesday — Mars's day, a warrior's spirit",
    "Born on a Wednesday — Mercury's day, a mind for communication",
    "Born on a Thursday — Jupiter's day, luck follows you",
    "Born on a Friday — Venus's day, born for love and beauty",
    "Born on a Saturday — Saturn's day, disciplined and wise",
  ]
  const idx = date.getDay()
  return { day: days[idx], fact: facts[idx] }
}

// ─── Season ───────────────────────────────────────────────────────────────────
export const getSeason = (date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21))
    return { season: "Spring", emoji: "🌸", description: "The world was blooming when you arrived" }
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23))
    return { season: "Summer", emoji: "☀️", description: "The sun was at its peak the day you were born" }
  if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day < 21))
    return { season: "Autumn", emoji: "🍂", description: "The leaves were turning gold when you arrived" }
  return { season: "Winter", emoji: "❄️", description: "The world was cold and still the night you were born" }
}

// ─── World Population at Birth ─────────────────────────────────────────────────
export const estimatePopulation = (year) => {
  // Linear interpolation between known data points
  const data = [
    [1920, 1860000000], [1930, 2070000000], [1940, 2300000000],
    [1950, 2500000000], [1960, 3000000000], [1970, 3700000000],
    [1980, 4400000000], [1990, 5300000000], [2000, 6100000000],
    [2010, 6900000000], [2020, 7800000000], [2024, 8100000000],
  ]

  for (let i = 0; i < data.length - 1; i++) {
    const [y1, p1] = data[i]
    const [y2, p2] = data[i + 1]
    if (year >= y1 && year <= y2) {
      const t = (year - y1) / (y2 - y1)
      const pop = Math.round(p1 + t * (p2 - p1))
      return (pop / 1_000_000_000).toFixed(2) + "B"
    }
  }
  return "8.0B"
}

// ─── Era Song ─────────────────────────────────────────────────────────────────
export const getEraSong = (year) => {
  if (year < 1930) return { song: "Rhapsody in Blue", artist: "George Gershwin" }
  if (year < 1940) return { song: "Over the Rainbow", artist: "Judy Garland" }
  if (year < 1950) return { song: "Boogie Woogie Bugle Boy", artist: "Andrews Sisters" }
  if (year < 1960) return { song: "Rock Around the Clock", artist: "Bill Haley & His Comets" }
  if (year < 1970) return { song: "Hey Jude", artist: "The Beatles" }
  if (year < 1980) return { song: "Stayin' Alive", artist: "Bee Gees" }
  if (year < 1990) return { song: "When Doves Cry", artist: "Prince" }
  if (year < 2000) return { song: "Smells Like Teen Spirit", artist: "Nirvana" }
  if (year < 2010) return { song: "Crazy in Love", artist: "Beyoncé" }
  if (year < 2020) return { song: "Shape of You", artist: "Ed Sheeran" }
  return { song: "Blinding Lights", artist: "The Weeknd" }
}