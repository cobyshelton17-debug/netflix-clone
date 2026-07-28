import './Movie.css'
import Cards from './Cards.jsx'

function Movie({movie, onSelect, onHome}){
  return (
    <div className="movie-page">
      <button className="back-btn" onClick={onHome}>Back</button>
      <div className="movie-hero" style={{backgroundImage: `url(${movie.background})`}}>
        <div className="movie-hero-overlay">
          {movie.logo ? (
            <img className="movie-logo" src={movie.logo} alt={movie.title} />
          ) : (
            <h1 className="movie-title-text">{movie.title}</h1>
          )}
          <div className="movie-meta">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-rating">{movie.rating}</span>
            <span className="movie-genre">{movie.genre}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-cast">
            <strong>Starring: </strong>{movie.cast.join(", ")}
          </div>
          <div className="movie-hero-buttons">
            <button className="play-btn">Play</button>
            <button className="more-info-btn">More Info</button>
          </div>
        </div>
      </div>

      <div className="movie-trailers">
        <h2>Trailers</h2>
        <div className="trailer-card">
          <img src={movie.background} alt="Trailer thumbnail" />
          <p>Trailer: {movie.title}</p>
        </div>
      </div>

      <div className="movie-details">
        <h2>More Details</h2>
        <div className="details-grid">
          <div className="detail-section">
            <h4>Genres</h4>
            <p>{movie.genres.join(", ")}</p>
          </div>
          <div className="detail-section">
            <h4>Audio</h4>
            <p>{movie.audio.join(", ")}</p>
          </div>
          <div className="detail-section">
            <h4>Subtitles</h4>
            <p>{movie.subtitles.join(", ")}</p>
          </div>
        </div>
      </div>

      <Cards movies={movie.youMightAlsoLike} title="You Might Also Like" onSelect={onSelect} />

      <div className="movie-plans">
        <h2>A Plan To Suit Your Needs</h2>
        <div className="plans-grid">
          <div className="plan-card">
            <h3>Standard with ads</h3>
            <p className="plan-quality">1080p</p>
            <p className="plan-desc">Good video quality. Less ads than you might think.</p>
            <p className="plan-price">$8.99 /mo</p>
          </div>
          <div className="plan-card">
            <h3>Standard</h3>
            <p className="plan-quality">1080p</p>
            <p className="plan-desc">Good video quality. No ads.</p>
            <p className="plan-price">$19.99 /mo</p>
          </div>
          <div className="plan-card">
            <h3>Premium</h3>
            <p className="plan-quality">4K + HDR</p>
            <p className="plan-desc">Best video quality. Immersive sound. No ads.</p>
            <p className="plan-price">$26.99 /mo</p>
          </div>
        </div>
      </div>

      <footer className="movie-footer">
        <p>Questions? Call 1-844-569-7700</p>
        <div className="footer-links">
          <span>FAQ</span>
          <span>Help Center</span>
          <span>Account</span>
          <span>Media Center</span>
          <span>Investor Relations</span>
          <span>Jobs</span>
          <span>Ways to Watch</span>
          <span>Terms of Use</span>
          <span>Privacy</span>
          <span>Cookie Preferences</span>
          <span>Corporate Information</span>
          <span>Contact Us</span>
        </div>
      </footer>
    </div>
  )
}

export default Movie