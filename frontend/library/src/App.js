import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import Unlogged from "./components/Unlogged";
import Reader from "./components/Reader";
import Librarian from "./components/Librarian";
import Admin from "./components/Admin";

function App() {
    const [user, setUser] = useState(null);

    const loginAsReader = () => {
        setUser({ role: 'reader' });
    };

    const loginAsAdmin = () => {
        setUser({ role: 'admin' });
    };

    const loginAsLibrarian = () => {
        setUser({ role: 'librarian' });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <div className="App">
            <Header
                loginAsReader={loginAsReader}
                loginAsAdmin={loginAsAdmin}
                loginAsLibrarian={loginAsLibrarian}
                logout={logout}
            />
            {!user && <Unlogged />}
            {user && user.role === 'reader' && <Reader />}
            {user && user.role === 'admin' && <Admin />}
            {user && user.role === 'librarian' && <Librarian />}
        </div>
    );
}

export default App;

