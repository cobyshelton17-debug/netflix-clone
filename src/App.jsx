import { useState, useEffect, useRef } from 'react'
import './App.css';
import Nav from './components/Nav.jsx'
import Cards from './components/Cards.jsx'
import Movie from './components/Movie.jsx'
import { fetchMoviesList, fetchMovieDetails } from './api/movies.js'

function App() {
  const [movies, setMovies] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState(null)

  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(null)
  const detailCache = useRef(new Map())

  useEffect(() => {
    fetchMoviesList(3)
      .then(setMovies)
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

  const openDetail = (id) => {
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
          <Nav onHome={goHome} />
          <div className="home">
            {listLoading && <p className="status-msg">Loading titles...</p>}
            {listError && <p className="status-msg">Couldn't load titles: {listError}</p>}
            {!listLoading && !listError && (
              categories
                .filter((cat) => cat.movies.length > 0)
                .map((cat, i) => (
                  <Cards key={i} title={cat.title} movies={cat.movies} onSelect={openDetail} />
                ))
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App
