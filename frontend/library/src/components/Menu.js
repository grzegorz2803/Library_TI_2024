import './Menu.css';

function Menu({showView}) {
    return (
        <div className="menu">
            <ul>
                <li><a href="#" onClick={() => showView('catalog')}>Books Catalog</a></li>
                <li><a href="#" onClick={() => showView('availableBooks')}>Available Books</a></li>
                <li><a href="#">Option 3</a></li>
            </ul>
        </div>
    );
}

export default Menu;
