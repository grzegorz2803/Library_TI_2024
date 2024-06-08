import './Menu.css';

function Menu({showView, user}) {
    return (
        <div className="menu">
            <ul>
                <li><a href="#" onClick={() => showView('catalog')}>Books Catalog</a></li>
                <li><a href="#" onClick={() => showView('availableBooks')}>Available Books</a></li>
                <li><a href="#" onClick={() => showView('recommended')}>Recommended</a></li>
                {user && <li><a href="#" onClick={() => showView('history')}>History</a></li>}
            </ul>
        </div>
    );
}

export default Menu;
