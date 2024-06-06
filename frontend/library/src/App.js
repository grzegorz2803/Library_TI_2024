import './App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import {useState} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [currentView, setCurrentView] = useState('unlogged');

    const login = (userData) => {
        setUser(userData);
        setCurrentView('reader');
    };

    const logout = () => {
        setUser(null);
        setCurrentView('unlogged');
    };

    const showView = (view) => {
        setCurrentView(view);
    };

    return (
        <div className="App">
            <Header login={login} logout={logout} user={user} showView={showView}/>
            <Content user={user} currentView={currentView} login={login} showView={showView}/>
        </div>
    );
}
export default App;

