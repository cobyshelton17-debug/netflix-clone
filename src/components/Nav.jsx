import { useState, useEffect, useRef } from 'react'
import './Nav.css'
import FilterBar from './FilterBar.jsx'
import FilterSelects from './FilterSelects.jsx'

function Nav({onHome, filters, onFilters}){
    const { search, genre, year, sort, genres, years } = filters
    const { onSearch, onGenre, onYear, onSort } = onFilters
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return(
        <div>
            <div className="navWrapper" ref={menuRef}>
                <div className="navImage" onClick={onHome}></div>
                <input
                    type="text"
                    placeholder="Search titles..."
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    className="navSearch-mobile"
                />
                <button className="navButton" onClick={() => setShowMenu(s => !s)} aria-label="Menu">
                   <i className="fa-solid fa-bars"></i>
                </button>
                        <button className="languageBtn">English</button>
                        <button className="btn">Sign In</button>
                <div className="navButtons">
                    <button className="languageBtn">English</button>
                    <button className="btn">Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Nav
