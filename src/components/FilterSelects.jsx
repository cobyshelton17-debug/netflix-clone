function FilterSelects({ genre, onGenre, genres, year, onYear, years, sort, onSort }) {
  return (
    <>
      <select value={genre} onChange={(e) => onGenre(e.target.value)} className="filter-select">
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <select value={year} onChange={(e) => onYear(e.target.value)} className="filter-select">
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select value={sort} onChange={(e) => onSort(e.target.value)} className="filter-select">
        <option value="popular">Most Popular</option>
        <option value="rating">Top Rated</option>
        <option value="title">Title A-Z</option>
      </select>
    </>
  )
}

export default FilterSelects
