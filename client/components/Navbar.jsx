import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

    const { logout } = props

    return (
        <div id="navbar">
            <Link to="/about"><button>About</button></Link>
            <Link to="/profile"><button>Profile</button></Link>
            <Link to="/public"><button>Public</button></Link>
            <Link to="/"><button onClick={logout}>Logout</button></Link>
        </div>
    )
}