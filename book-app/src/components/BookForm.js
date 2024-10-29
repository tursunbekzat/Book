import React, { useState, useEffect } from 'react';

const BookForm = ({ onBookAdded, editingBook, onUpdateBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
        } else {
            setTitle('');
            setAuthor('');
        }
    }, [editingBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const book = { title, author };

            if (editingBook) {
                await onUpdateBook(book); // Update the book if editing
            } else {
                await onBookAdded(book); // Add a new book
            }

            setTitle(''); // Clear the form fields
            setAuthor('');
        } catch (err) {
            console.error('Error submitting book:', err);
            setError('Failed to submit the book. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default BookForm;
