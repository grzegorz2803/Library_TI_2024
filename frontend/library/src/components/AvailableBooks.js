import React, { useEffect, useState } from 'react';

function AvailableBooks({login, user}) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        author: '',
        genre: '',
        year: ''
    });

    useEffect(() => {
        fetch('http://localhost:3001/books/available')
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };
    const userName = localStorage.getItem('login');
    const handleReservation = async (id) => {
        try {
            const response = await fetch('http://localhost:3001/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_book: id, login: userName })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
            } else {
                console.error(data.message || 'Reservation failed');
            }
        } catch (error) {
            console.error('An error occurred. Please try again.', error);
        }
    };


    const filteredBooks = books.filter((book) => {
        return (
            (filters.author === '' || book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
            (filters.genre === '' || book.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
            (filters.year === '' || book.year.toString().includes(filters.year))
        );
    });

    if (loading) return <div>Available Books Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="books">
            <h2>Available Books</h2>
            <div className="filters">
                <input
                    type="text"
                    name="author"
                    placeholder="Filter by author"
                    value={filters.author}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Filter by genre"
                    value={filters.genre}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Filter by year"
                    value={filters.year}
                    onChange={handleFilterChange}
                />
            </div>
            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.id_book}>
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Year:</strong> {book.year}</p>
                        <p><strong>Availability:</strong> {book.availablity}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        {user && <button onClick={() => handleReservation(book.id_book)}>Reserve</button>}
                        <hr/>
                        {/*{book.imageUrl && <img src={book.imageUrl} alt={book.title} />}*/}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailableBooks;
