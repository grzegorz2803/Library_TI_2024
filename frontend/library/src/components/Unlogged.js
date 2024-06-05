import './Unlogged.css';

function Unlogged() {
/*    const [number, setNumber]=useState(0);
    console.log(number);*/
    return (
        <div className="unlogged">
            <div>
                <h2>Welcome, Guest!</h2>
                <p>Please sign in to access more features.</p>
                <p>Create an account if you don't have one.</p>
            </div>
{/*            <div className="unlogged-sign">
                <nav>
                    <ul>
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>
                </nav>
            </div>*/}

{/*            <div>
                <div>{number}</div>
                <button onClick={() => setNumber(number+1)}>+</button>
                <button onClick={() => setNumber(number-1)}>-</button>
            </div>*/}
        </div>
    );
}

export default Unlogged;