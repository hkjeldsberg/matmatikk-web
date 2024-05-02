import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
    return (
        <header>
            <Link to="/" className="header-title">MatMatikk</Link>
            <nav>
                <Link to="/add">Legg til oppskrift</Link>
                <Link to="/search">Søk</Link>
                <Link to="/chat">Chat</Link>
                <Link to="/login">Logg inn</Link>
            </nav>
        </header>
    );
};

