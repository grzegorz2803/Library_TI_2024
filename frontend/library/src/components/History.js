import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

function History({ user}) {
    const userName = localStorage.getItem('login');
    console.log(userName);
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
                        fetch(`http://localhost:3001/reservations/${userName}`),
                        fetch(`http://localhost:3001/loans/${userName}`),
                        fetch(`http://localhost:3001/loans/returned/${userName}`)
                    ]);

                    const reservedData = await reservedResponse.json();
                    const loanedData = await loanedResponse.json();
                    const returnedData = await returnedResponse.json();
                    setLoading(false);
                    setReservedBooks(reservedData);
                    setLoanedBooks(loanedData);
                    setReturnedBooks(returnedData);

                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchHistory();
        }
    }, [user]);

    if (loading) return <div></div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="history">
            <h2>History</h2>
            <div className="reserved-books">
                <h3>Reserved Books</h3>
                <ul>
                    {reservedBooks.map((reservation, index) => (
                        <li key={`reserved-${reservation.book.id_book || index}`}>
                            <h4>{reservation.book.title}</h4>
                            <p><strong>Author:</strong> {reservation.book.author}</p>
                            <p><strong>Time to borrow:</strong> {reservation.time_to_borrow} days</p>
                            <p><strong>Reservation Date:</strong> {reservation.reservation_date}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="loaned-books">
                <h3>Loaned Books</h3>
                <ul>
                    {loanedBooks.map((loan, index) => (
                        <li key={`loaned-${loan.book.id_book || index}`}>
                            <h4>{loan.book.title}</h4>
                            <p><strong>Author:</strong> {loan.book.author}</p>
                            <p><strong>Borrowed on:</strong> {loan.loan_date}</p>
                            <p><strong>Time to return:</strong> {loan.time_to_return} days</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="returned-books">
                <h3>Returned Books</h3>
                <ul>
                    {returnedBooks.map((returned, index) => (
                        <li key={`returned-${returned.book.id_book || index}`}>
                            <h4>{returned.book.title}</h4>
                            <p><strong>Author:</strong> {returned.book.author}</p>
                            <p><strong>Borrowed on:</strong> {returned.loan_date}</p>
                            <p><strong>Returned on:</strong> {returned.return_date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default History;
