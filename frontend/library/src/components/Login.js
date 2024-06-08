import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

function Login({login}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    // Sprawdzenie, czy istnieją zapisane dane logowania w cookies podczas ładowania komponentu
    useEffect(() => {
        const savedUsername = Cookies.get('username');
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

/*        if (rememberMe) {
            Cookies.set('username', username, {expires: 365});
        } else {
            Cookies.remove('username');
        }*/

        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login: username, password: password})
            });

            const data = await response.json();


            if (response.ok) {
                // Zapamiętywanie nazwy użytkownika, jeśli opcja "Remember Me" jest zaznaczona
                if (rememberMe) {
                    Cookies.set('username', username, {expires: 365});
                } else {
                    Cookies.remove('username');
                }

                // Ustawienie stanu użytkownika na zalogowanego
                login(data);
                console.log(data);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember Me
                    </label>
                </div>
                <button type="submit">Log in</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
