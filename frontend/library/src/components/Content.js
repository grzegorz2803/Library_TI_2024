import './Content.css';

import Unlogged from "./Unlogged";
import Reader from "./Reader";
import Menu from "./Menu";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import BooksCatalog from "./BooksCatalog";
import AvailableBooks from "./AvailableBooks";
import Recommended from "./Recommended";
import History from "./History";
import {useEffect, useState} from "react";

function Content({user, currentView, login, showView}) {

    return (
        <div className="content-container">
            <div className="main-content">
                {!user && currentView === 'unlogged' && <Unlogged/>}
                {!user && currentView === 'login' && <Login login={login}/>}
                {!user && currentView === 'signup' && <Signup/>}
                {user && <Reader/>}
                {user && currentView === 'home' && <Reader/>}
                {!user && currentView === 'home' && <Recommended/>}
                {currentView === 'recommended' && <Recommended/>}
                {currentView === 'about' && <About/>}
                {currentView === 'contact' && <Contact/>}
                {currentView === 'catalog' && <BooksCatalog/>}
                {currentView === 'availableBooks' && <AvailableBooks login={login} user={user}/>}
                {user && currentView === 'history' && <History user={user} />}
            </div>
            <div className="side-menu">
                <Menu showView={showView} user={user}/>
            </div>

        </div>
    );
}

export default Content;

