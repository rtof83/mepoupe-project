import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to={'/'}>
                        <div className="navbar-brand">MePoupe App</div>
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><Link to={'/media'}>Média</Link></li>
                        <li><Link to={'/cep'}>CEP</Link></li>
                        <li><Link to={'/logMedia'}>Log Média</Link></li>
                        <li><Link to={'/logCEP'}>Log CEP</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;
