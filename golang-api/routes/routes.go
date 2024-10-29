package routes

import (
	"golang-api/handlers"
	"github.com/gin-gonic/gin"
	"golang-api/middleware"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", handlers.RegisterUser)
	r.POST("/login", handlers.Login)
	
	protected := r.Group("/books")
	protected.Use(middleware.AuthMiddleware())
	protected.POST("", handlers.CreateBook)
	protected.PUT("/:id", handlers.UpdateBook).Use(middleware.AdminMiddleware())
	protected.DELETE("/:id", handlers.DeleteBook).Use(middleware.AdminMiddleware())
}
