package main

import (
	"github.com/gin-gonic/gin"
	"golang-api/handlers"
	"golang-api/middleware"
)

func main() {
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	// Public routes
	router.POST("/register", handlers.RegisterUser)
	router.POST("/login", handlers.Login)

	// Protected routes (require authentication)
	protected := router.Group("/books")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("", handlers.GetBooks)      // Get all books
	protected.POST("", handlers.CreateBook)   // Create a new book
	protected.PUT("/:id", handlers.UpdateBook) // Update a book by ID
	protected.DELETE("/:id", handlers.DeleteBook) // Delete a book by ID

	// Start the server on port 8080
	router.Run(":8080")
}
