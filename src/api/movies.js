const BASE = "https://api.themoviedb.org/3"
const KEY = import.meta.env.VITE_TMDB_API_KEY
const IMAGE = "https://image.tmdb.org/t/p"

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
  return res.json()
}

const toSummary = (m) => ({
  id: m.id,
  title: m.title,
  genreIds: m.genre_ids || [],
  year: m.release_date ? m.release_date.slice(0, 4) : null,
  rating: m.vote_average || 0,
  popularity: m.popularity || 0,
  image: `${IMAGE}/w342${m.poster_path}`,
})

async function fetchPages(endpoint, pages) {
  const requests = Array.from({ length: pages }, (_, i) =>
    fetchJson(`${BASE}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${KEY}&page=${i + 1}`)
  )
  const responses = await Promise.all(requests)
  const seen = new Set()
  return responses.flatMap((data) =>
    data.results
      .filter((m) => m.poster_path && !seen.has(m.id) && seen.add(m.id))
      .map(toSummary)
  )
}

export async function fetchMoviesList(pages = 3) {
  return fetchPages("/trending/movie/day", pages)
}

export async function fetchGenres() {
  const data = await fetchJson(`${BASE}/genre/movie/list?api_key=${KEY}`)
  return Object.fromEntries(data.genres.map((g) => [g.id, g.name]))
}

export async function fetchMovieDetails(id) {
  const [movie, credits, recs] = await Promise.all([
    fetchJson(`${BASE}/movie/${id}?api_key=${KEY}`),
    fetchJson(`${BASE}/movie/${id}/credits?api_key=${KEY}`),
    fetchJson(`${BASE}/movie/${id}/recommendations?api_key=${KEY}`),
  ])
  return {
    id: movie.id,
    title: movie.title,
    image: `${IMAGE}/w342${movie.poster_path}`,
    year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    rating: movie.adult ? "R" : "PG-13",
    genre: movie.genres?.[0]?.name || "N/A",
    description: movie.overview || "",
    runtime: movie.runtime ? `${movie.runtime} min` : "N/A",
    cast: (credits.cast || []).slice(0, 8).map((c) => c.name),
    background: movie.backdrop_path
      ? `${IMAGE}/w1280${movie.backdrop_path}`
      : `${IMAGE}/w1280${movie.poster_path}`,
    genres: (movie.genres || []).map((g) => g.name),
    youMightAlsoLike: (recs.results || [])
      .filter((m) => m.poster_path)
      .slice(0, 8)
      .map((m) => ({ id: m.id, title: m.title, image: `${IMAGE}/w342${m.poster_path}` })),
  }
}
