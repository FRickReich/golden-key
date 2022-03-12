import {
    BrowserRouter,
    Routes, 
    Route
} from 'react-router-dom';
import React, { useState } from 'react';
import { UserDataContext } from './UserDataProvider';
import Header from './components/Header/Header';

import './App.scss';

import {
    NotFound,
    Home,
    Login,
    Register,
    Dashboard
} from './pages';

export default function App()
{
    const [ user, setUser ] = useState({ data: {}, loggedIn: false });

    const value = { user, setUser };

    return (
        <UserDataContext.Provider value={ value }>
            <BrowserRouter>
                <Header/>

                <div id="layout">
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/signup" element={ <Register /> } />
                        <Route path="/dashboard" element ={ <Dashboard /> } /> 
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserDataContext.Provider>
    );
}
