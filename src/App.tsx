import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import {Header} from "./component/Header/Header";
import {Footer} from "./component/Footer/Footer";
import {HomePage} from "./component/HomePage/HomePage";
import {AddRecipePage} from "./component/AddRecipePage/AddRecipePage";
import {SignUpPage} from "./component/SignUpPage/SignUpPage";
import {LoginPage} from "./component/LoginPage/LoginPage";
import './App.scss'
import {AuthProvider} from "./component/AuthProvider/AuthProvider";

const App: React.FC = () =>
    <Router>
        <AuthProvider>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/add" element={<AddRecipePage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
            <Footer/>
        </AuthProvider>
    </Router>


export default App;
