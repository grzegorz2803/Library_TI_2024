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

function Content({user, currentView, login, showView}) {

    return (
        <div className="content-container">
            <div className="main-content">
                {!user && currentView === 'unlogged' && <Unlogged />}
                {!user && currentView === 'login' && <Login login={login} />}
                {!user && currentView === 'signup' && <Signup />}
                {user && <Reader/>}
                {user && currentView === 'home' && <Reader/>}
                {!user && currentView === 'home' && <Unlogged />}
                {currentView === 'about' && <About />}
                {currentView === 'contact' && <Contact />}
                {currentView === 'catalog' && <BooksCatalog />}
                {currentView === 'availableBooks' && <AvailableBooks />}
            </div>
            <div className="side-menu">
                <Menu showView={showView}/>
            </div>
        </div>
    );
}

export default Content;

