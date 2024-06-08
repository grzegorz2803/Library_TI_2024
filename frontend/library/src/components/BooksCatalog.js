import React, { useEffect, useState } from 'react';

function BooksCatalog() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/books')
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

    if (loading) return <div>Books Catalog Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="books-catalog">
            <h2>Books Catalog</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id_book}>
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Year:</strong> {book.year}</p>
                        <p><strong>Availability:</strong> {book.availablity}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        {/*{book.imageUrl && <img src={book.imageUrl} alt={book.title}/>}*/}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BooksCatalog;
