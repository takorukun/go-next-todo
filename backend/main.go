package main

import (
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Todo struct {
	ID      int    `json:"id"`
	Message string `json:"message"`
}

var todos = []Todo{}
var nextID = 1

func main() {
	r := gin.Default()

	// CORS設定
	r.Use(cors.Default())

	// タスクを取得
	r.GET("/api/todos", func(c *gin.Context) {
		c.JSON(http.StatusOK, todos)
	})

	// タスクを追加
	r.POST("/api/todos", func(c *gin.Context) {
		var newTodo Todo
		if err := c.ShouldBindJSON(&newTodo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		newTodo.ID = nextID
		nextID++
		todos = append(todos, newTodo)
		c.JSON(http.StatusCreated, newTodo)
	})

	// タスクを削除
	r.DELETE("/api/todos/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		for i, todo := range todos {
			if todo.ID == id {
				todos = append(todos[:i], todos[i+1:]...)
				c.Status(http.StatusNoContent)
				return
			}
		}
		c.Status(http.StatusNotFound)
	})

	r.Run(":8080")
}
