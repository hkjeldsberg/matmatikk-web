import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import {Header} from "./component/Header/Header";
import {Footer} from "./component/Footer/Footer";
import {HomePage} from "./component/HomePage/HomePage";
import './App.scss'

const App: React.FC = () =>
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
        <Footer/>
    </Router>


export default App;
