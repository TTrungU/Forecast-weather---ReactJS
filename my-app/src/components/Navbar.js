import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../pictures/logo.png'
import { FiSun, FiMoon } from "react-icons/fi"

export default function Navbar() {

    const [theme, setTheme] = useState("")
    const toggleTheme = () => {
        if (theme === "") {
            setTheme("light-theme")
        } else {

            setTheme("")
        }
        console.log("check")
    }
    useEffect(() => {
        document.documentElement.className = theme
    }, [theme])
    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">

                    <img src={logo} alt="Sky" className="logo" />


                    <div className="toggle">
                        <input type="checkbox" className="checkbox" onClick={toggleTheme} />
                        <label for="checkbox" className="label">
                            <FiSun className="sun" />
                            <FiMoon className="moon" />
                            <div className="ball">
                            </div>
                        </label>
                    </div>

                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}