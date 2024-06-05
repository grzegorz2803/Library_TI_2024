import './Content.css';

import Unlogged from "./Unlogged";
import Reader from "./Reader";
import Menu from "./Menu";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function Content({user, currentView, login}) {

    return (
        <div className="content-container">
            <div className="main-content">
                {!user && currentView === 'unlogged' && <Unlogged />}
                {!user && currentView === 'login' && <Login login={login} />}
                {!user && currentView === 'signup' && <Signup />}
                {user && <Reader/>}
                {currentView === 'home' && <Home />}
                {currentView === 'about' && <About />}
                {currentView === 'contact' && <Contact />}
            </div>
            <div className="side-menu">
                <Menu/>
            </div>
        </div>
    );
}

export default Content;

