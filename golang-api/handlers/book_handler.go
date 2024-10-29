package handlers

import (
	"golang-api/data"
	"golang-api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetBooks(c *gin.Context) {
	c.JSON(http.StatusOK, data.Books)
}

// Counter to generate sequential IDs
var idCounter = len(data.Books) + 1

func CreateBook(c *gin.Context) {
	var newBook models.Book
	if err := c.ShouldBindJSON(&newBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Assign a new sequential ID
	newBook.ID = strconv.Itoa(idCounter)
	idCounter++ // Increment the counter
	data.Books = append(data.Books, newBook)
	c.JSON(http.StatusCreated, newBook)
}

// Update an existing book by ID
func UpdateBook(c *gin.Context) {
	id := c.Param("id")
	var updatedBook models.Book

	if err := c.ShouldBindJSON(&updatedBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid book payload"})
		return
	}

	for i, book := range data.Books {
		if book.ID == id {
			data.Books[i] = updatedBook
			c.JSON(http.StatusOK, updatedBook)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
}

// Delete a book by ID
func DeleteBook(c *gin.Context) {
	id := c.Param("id")

	for i, book := range data.Books {
		if book.ID == id {
			// Remove the book from the slice
			data.Books = append(data.Books[:i], data.Books[i+1:]...)
			c.Status(http.StatusNoContent)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
}
