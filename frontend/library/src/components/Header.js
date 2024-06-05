import './Header.css';

function Header() {
    return (
        <header className="App-header">
            <div className="header-sign">
                <nav>
                    <ul>
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Log out</a></li>
                    </ul>
                </nav>
            </div>
            <div className="header-title">
                <h1>LIBRARY</h1>
            </div>
            <div className="header-menu">
                <nav>
                    <ul>
                        <li><a href="#">XXX</a></li>
                        <li><a href="#">YYY</a></li>
                        <li><a href="#">ZZZ</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;