package data

import "golang-api/models"

// In-memory data store
var Books = []models.Book{
	{ID: "1", Title: "The Go Programming Language", Author: "Alan A. A. Donovan"},
	{ID: "2", Title: "Clean Code", Author: "Robert C. Martin"},
}

var users = map[string]string{
	"admin": "admin123",
	"user":  "user123",
}

