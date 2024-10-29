import React, { useEffect, useState } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../services/api';
import BookForm from './BookForm';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Error fetching books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleBookAdded = async (book) => {
        try {
            await createBook(book);
            const data = await fetchBooks(); // Refresh the book list
            setBooks(data);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            const data = await fetchBooks(); // Refresh the book list
            setBooks(data);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book); // Set the book to be edited
    };

    const handleUpdateBook = async (updatedBook) => {
        try {
            await updateBook(updatedBook.id, updatedBook);
            const data = await fetchBooks(); // Refresh the book list
            setBooks(data);
            setEditingBook(null); // Clear the editing state
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Books</h1>
            <BookForm 
                onBookAdded={handleBookAdded} 
                editingBook={editingBook} 
                onUpdateBook={handleUpdateBook} 
            />
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => handleEditBook(book)}>Edit</button>
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
