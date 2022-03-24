package main

import (
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/wzdlc1996/GroupWebsite/server/dataio"
	"github.com/wzdlc1996/GroupWebsite/server/usrcheck"
)

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/api/qReport", func(c *gin.Context) {
		c.JSON(200, dataio.QueryLatestReport())
	})
	r.POST("/api/aComment", func(ctx *gin.Context) {
		var newComment dataio.CommentItem
		if err := ctx.BindJSON(&newComment); err != nil {
			return
		}
		dataio.AppendCommentToLatest(newComment)
		ctx.IndentedJSON(http.StatusCreated, newComment)
	})
	r.POST("/api/aReport", func(ctx *gin.Context) {
		var newReport dataio.Report
		if err := ctx.BindJSON(&newReport); err != nil {
			return
		}
		dataio.AppendReport(newReport)
		ctx.IndentedJSON(http.StatusCreated, newReport)
	})
	r.POST("/api/qUsrCorrect", func(ctx *gin.Context) {
		var newUsrId usrcheck.UsrId
		if err := ctx.BindJSON(&newUsrId); err != nil {
			return
		}
		ctx.IndentedJSON(http.StatusAccepted, usrcheck.IsUsrCorrect(newUsrId))
	})
	r.Use(static.Serve("/", static.LocalFile("../release/build", true)))
	r.Use(static.Serve("/upload", static.LocalFile("../release/build", true)))
	r.Use(static.Serve("/report", static.LocalFile("../release/build", true)))
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
