package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// JWT secret key
var jwtKey = []byte("your-secret-key")

// User struct to hold credentials
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// In-memory user store
var users = map[string]string{
	"admin": "admin123",
	"user":  "user123",
}

// Claims struct for JWT
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// RegisterUser handler to register new users (optional)
func RegisterUser(c *gin.Context) {
	var creds User
	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Store user in the in-memory map
	if _, exists := users[creds.Username]; exists {
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}
	users[creds.Username] = creds.Password
	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

// Login handler to authenticate users and return a JWT
func Login(c *gin.Context) {
	var creds User
	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	expectedPassword, ok := users[creds.Username]
	if !ok || expectedPassword != creds.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Create the JWT token with claims
	expirationTime := time.Now().Add(1 * time.Hour) 
	claims := &Claims{
		Username: creds.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	// Return the token as JSON
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
