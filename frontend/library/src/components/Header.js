import './Header.css';

function Header({logout, user, showView}) {
    return (
        <header className="App-header">
            <div className="header-sign">
                <nav>
                    <ul>
                        {!user && <li><a href="#" onClick={() => showView('login')}>Log in</a></li>}
                        {user && <li><a href="#" onClick={() => logout()}>Log out</a></li>}
                        {!user && <li><a href="#" onClick={() => showView('signup')}>Sign Up</a></li>}
                    </ul>
                </nav>
            </div>
            <div className="header-title">
                <h1>LIBRARY</h1>
            </div>
            <div className="header-menu">
                <nav>
                    <ul>
                        <li><a href="#" onClick={() => showView('home')}>Home</a></li>
                        <li><a href="#"onClick={() => showView('about')}>About</a></li>
                        <li><a href="#"onClick={() => showView('contact')}>Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;