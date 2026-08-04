import { useState, useEffect, useRef } from 'react'
import './Nav.css'

function Nav({onHome}){
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
                <button className="navButton" onClick={() => setShowMenu(s => !s)}>
                   <i className="fa-solid fa-bars"></i>
                </button>
                {showMenu && (
                    <div className="navPopup">
                        <button className="languageBtn">English</button>
                        <button className="btn">Sign In</button>
                    </div>
                )}
                <div className="navButtons">
                    <button className="languageBtn">English</button>
                    <button className="btn">Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Nav