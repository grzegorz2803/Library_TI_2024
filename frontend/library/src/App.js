import './App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {useState, useEffect} from "react";

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
    const [sessionData, setSessionData] = useState(null);



    return (
        <div className="App">
            <Header login={login} logout={logout} user={user} showView={showView}/>
            <Content user={user} currentView={currentView} login={login} showView={showView}  />
            <Footer/>
        </div>
    );
}
export default App;

