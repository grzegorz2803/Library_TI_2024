import './Unlogged.css';
import Recommended from "./Recommended";

function Unlogged() {
    return (
        <div className="unlogged">
            <div>
                <h2>Welcome, Guest!</h2>
                <p>Please sign in to access more features.</p>
                <p>Create an account if you don't have one.</p>
            </div>
            <Recommended />
        </div>
    );
}

export default Unlogged;