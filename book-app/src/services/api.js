import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:8080';

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to inject the Authorization header into every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Fetch all books using the Axios instance
export const fetchBooks = async () => {
    try {
        const response = await axiosInstance.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Propagate the error for further handling
    }
};

// Create a new book using the Axios instance
export const createBook = async (book) => {
    try {
        console.log('Creating book with payload:', book);

        const response = await axiosInstance.post('/books', book);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error.response || error.message);
        throw error;
    }
};


// Update an existing book (PUT request)
export const updateBook = async (id, book) => {
    try {
        const response = await axiosInstance.put(`/books/${id}`, book);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error.response || error.message);
        throw error;
    }
};

// Delete a book (DELETE request)
export const deleteBook = async (id) => {
    try {
        const response = await axiosInstance.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error.response || error.message);
        throw error;
    }
};
