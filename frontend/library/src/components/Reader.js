import History from "./History";

function Reader() {
    const login = localStorage.getItem('login');
    return (
        <div className="reader">
            <h2>Welcome, {login}!</h2>

        </div>
    );
}

export default Reader;