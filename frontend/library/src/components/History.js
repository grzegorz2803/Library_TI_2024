import React, { useEffect, useState } from 'react';

function History({ user }) {
    const [reservedBooks, setReservedBooks] = useState([]);
    const [loanedBooks, setLoanedBooks] = useState([]);
    const [returnedBooks, setReturnedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchHistory = async () => {
                try {
                    const [reservedResponse, loanedResponse, returnedResponse] = await Promise.all([
                        fetch(`http://localhost:3001/reservations/${user.login}`),
                        fetch(`http://localhost:3001/loans/${user.login}`),
                        fetch(`http://localhost:3001/loans/returned/${user.login}`)
                    ]);

                    const reservedData = await reservedResponse.json();
                    const loanedData = await loanedResponse.json();
                    const returnedData = await returnedResponse.json();

                    setReservedBooks(reservedData);
                    setLoanedBooks(loanedData);
                    setReturnedBooks(returnedData);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchHistory();
        }
    }, [user]);

    if (loading) return <div>History Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="history">
            <h2>History</h2>
            <div className="reserved-books">
                <h3>Reserved Books</h3>
                <ul>
                    {reservedBooks.map((book) => (
                        <li key={book.id_book}>
                            <h4>{book.title}</h4>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Time to borrow:</strong> {book.timeToBorrow} days</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="loaned-books">
                <h3>Loaned Books</h3>
                <ul>
                    {loanedBooks.map((book) => (
                        <li key={book.id_book}>
                            <h4>{book.title}</h4>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Time to return:</strong> {book.timeToReturn} days</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="returned-books">
                <h3>Returned Books</h3>
                <ul>
                    {returnedBooks.map((book) => (
                        <li key={book.id_book}>
                            <h4>{book.title}</h4>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Borrowed on:</strong> {book.borrowedOn}</p>
                            <p><strong>Returned on:</strong> {book.returnedOn}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default History;
