import './Cards.css'

function Cards({movies, title, onSelect}){
    return (
        <div className="cards-row">
            <h2 className="cards-title">{title}</h2>
            <div className="cards-scroll">
                {movies.map((movie, i) => (
                    <div className="card" key={i} onClick={() => onSelect?.(movie)}>
                        <img src={movie.image} alt={movie.title} />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards