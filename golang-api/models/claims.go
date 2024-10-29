package models

import "github.com/golang-jwt/jwt/v4"

// Claims represents the JWT claims structure.
type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}
