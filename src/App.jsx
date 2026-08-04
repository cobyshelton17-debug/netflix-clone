import { useState, useEffect, useRef } from 'react'
import './App.css';
import Nav from './components/Nav.jsx'
import Cards from './components/Cards.jsx'
import Movie from './components/Movie.jsx'
import FilterBar from './components/FilterBar.jsx'
import Footer from './components/Footer.jsx'
import { fetchMoviesList, fetchGenres, fetchMovieDetails } from './api/movies.js'

function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState(null)

  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")
  const [year, setYear] = useState("")
  const [sort, setSort] = useState("popular")

  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(null)
  const detailCache = useRef(new Map())

  useEffect(() => {
    Promise.all([fetchMoviesList(3), fetchGenres()])
      .then(([list, genreMap]) => {
        setMovies(list)
        setGenres(Object.entries(genreMap).map(([id, name]) => ({ id: Number(id), name })))
      })
      .catch((e) => setListError(e.message))
      .finally(() => setListLoading(false))
  }, [])

  useEffect(() => {
    if (selectedId == null || detailCache.current.has(selectedId)) return
    let cancelled = false
    fetchMovieDetails(selectedId)
      .then((m) => {
        if (cancelled) return
        detailCache.current.set(selectedId, m)
        setDetail(m)
        setDetailLoading(false)
      })
      .catch((e) => {
        if (cancelled) return
        setDetailError(e.message)
        setDetailLoading(false)
      })
    return () => { cancelled = true }
  }, [selectedId])

  const openDetail = (item) => {
    const id = typeof item === 'number' ? item : item.id
    const cached = detailCache.current.get(id)
    setSelectedId(id)
    setDetailError(null)
    if (cached) {
      setDetail(cached)
      setDetailLoading(false)
    } else {
      setDetail(null)
      setDetailLoading(true)
    }
  }

  const goHome = () => {
    setSelectedId(null)
    setDetail(null)
  }

  const categories = [
    { title: "Trending Now", movies },
    { title: "Action", movies: movies.filter((m) => m.genreIds.includes(28)) },
    { title: "Thriller", movies: movies.filter((m) => m.genreIds.includes(53)) },
    { title: "Science Fiction", movies: movies.filter((m) => m.genreIds.includes(878)) },
    { title: "Horror", movies: movies.filter((m) => m.genreIds.includes(27)) },
  ]

  const hasFilters = search !== "" || genre !== "" || year !== "" || sort !== "popular"

  const visibleMovies = movies.filter((m) => {
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false
    if (genre && !m.genreIds.includes(Number(genre))) return false
    if (year && String(m.year) !== year) return false
    return true
  })

  const sortedMovies = [...visibleMovies].sort((a, b) => {
    switch (sort) {
      case "rating": return b.rating - a.rating
      case "title": return a.title.localeCompare(b.title)
      default: return b.popularity - a.popularity
    }
  })

  const years = [...new Set(movies.map((m) => m.year).filter(Boolean))].sort((a, b) => b - a)

  return (
    <>
      {selectedId != null ? (
        detailLoading ? (
          <div className="movie-page"><p className="status-msg">Loading...</p></div>
        ) : detailError ? (
          <div className="movie-page">
            <p className="status-msg">Couldn't load this title: {detailError}</p>
            <button className="back-btn" onClick={goHome}>Back</button>
          </div>
        ) : detail ? (
          <Movie movie={detail} onSelect={openDetail} onHome={goHome} />
        ) : null
      ) : (
        <>
          <Nav
            onHome={goHome}
            filters={{ search, genre, year, sort, genres, years }}
            onFilters={{ onSearch: setSearch, onGenre: setGenre, onYear: setYear, onSort: setSort }}
          />
          <div className="home">
            <div className="filter-bar-mobile">
              <FilterBar
                search={search}
                onSearch={setSearch}
                genre={genre}
                onGenre={setGenre}
                genres={genres}
                year={year}
                onYear={setYear}
                years={years}
                sort={sort}
                onSort={setSort}
              />
            </div>
            {listLoading && <p className="status-msg">Loading titles...</p>}
            {listError && <p className="status-msg">Couldn't load titles: {listError}</p>}
            {!listLoading && !listError && (
              hasFilters ? (
                sortedMovies.length > 0 ? (
                  <Cards title={`Results (${sortedMovies.length})`} movies={sortedMovies} onSelect={openDetail} />
                ) : (
                  <p className="status-msg">No titles match your filters.</p>
                )
              ) : (
                categories
                  .filter((cat) => cat.movies.length > 0)
                  .map((cat, i) => (
                    <Cards key={i} title={cat.title} movies={cat.movies} onSelect={openDetail} />
                  ))
              )
            )}
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App
