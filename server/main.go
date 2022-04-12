package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/wzdlc1996/GroupWebsite/server/dataio"
	"github.com/wzdlc1996/GroupWebsite/server/usrcheck"
)

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/api/qReport", func(c *gin.Context) {
		c.JSON(http.StatusOK, dataio.QueryLatestReport())
	})

	r.POST("/api/aComment", func(ctx *gin.Context) {
		var newComment dataio.CommentItem
		if err := ctx.BindJSON(&newComment); err != nil {
			return
		}
		dataio.AppendCommentToLatest(newComment)
		ctx.JSON(http.StatusCreated, newComment)
	})

	r.POST("/api/aReport", func(ctx *gin.Context) {
		var newReport dataio.Report
		frm, err := ctx.MultipartForm()
		if err != nil {
			return
		}
		json.Unmarshal([]byte(frm.Value["data"][0]), &newReport) // read the report body, according to the client
		file, _ := ctx.FormFile("file")                          // read the file uploaded
		dataio.AppendReport(newReport)

		if file != nil {
			ctx.SaveUploadedFile(file, dataio.SlidesFileNameDst(
				fmt.Sprint(newReport.Uptime, path.Ext(file.Filename)),
			))
		}
		ctx.JSON(http.StatusCreated, newReport)
	})

	r.POST("/api/qUsrCorrect", func(ctx *gin.Context) {
		var newUsrId usrcheck.UsrId
		if err := ctx.BindJSON(&newUsrId); err != nil {
			return
		}
		ctx.JSON(http.StatusAccepted, usrcheck.IsUsrCorrect(newUsrId))
	})

	r.GET("/api/qPastReports", func(ctx *gin.Context) {
		ctx.IndentedJSON(http.StatusOK, dataio.QueryPastReports())
	})

	r.GET("/api/qSlides", func(ctx *gin.Context) {
		uptime := ctx.Query("uptime")
		//ctx.File(fmt.Sprintf("../db/slides/%s.pptx", filename))
		filename, _, exists := dataio.GetSlidesByUptime(uptime)
		if !exists {
			return
		}
		ctx.Header("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", path.Base(filename)))
		ctx.File(filename)
	})

	r.Use(static.Serve("/", static.LocalFile("../release/build", true)))
	r.Use(static.Serve("/upload", static.LocalFile("../release/build", true)))
	r.Use(static.Serve("/report", static.LocalFile("../release/build", true)))
	r.Use(static.Serve("/archive", static.LocalFile("../release/build", true)))
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
