import './FilterBar.css'
import FilterSelects from './FilterSelects.jsx'

function FilterBar({ className = "filter-bar", search, onSearch, genre, onGenre, genres, year, onYear, years, sort, onSort }) {
  return (
    <div className={className}>
      <input
        type="text"
        placeholder="Search titles..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="filter-search"
      />
      <FilterSelects
        genre={genre}
        onGenre={onGenre}
        genres={genres}
        year={year}
        onYear={onYear}
        years={years}
        sort={sort}
        onSort={onSort}
      />
    </div>
  )
}

export default FilterBar
