package dataio

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
)

const dbslide string = "../db/slides/"
const dbpath string = "../db/data.json"

// LoadData returns the list of all Report stored in db
func LoadData() []Report {
	fp, err := os.ReadFile(dbpath)
	if err != nil {
		panic(err)
	}
	data := new([]Report)
	json.Unmarshal(fp, data)
	return *data
}

// WriteData add the list of Report(arg) into db, with automatically backup (only 1)
func WriteData(data []Report) {
	dt, _ := json.MarshalIndent(data, "", "\t")
	os.Rename(dbpath, dbpath+".bkup")
	err := os.WriteFile(dbpath, dt, 0666) // 0666 as the `os.Create` example. (like created by touch)
	if err != nil {
		panic(err)
	}
}

// QueryLatestReport returns the latest Report (first one in db)
func QueryLatestReport() Report {
	data := LoadData()
	return data[0]
}

// QueryPastReports returns the list of past Report (without the latest one)
func QueryPastReports() []Report {
	data := LoadData()
	return data[1:]
}

// GetSlidesByUptime returns the filename by uptime in db/slides, ispdf means whether the extension is pdf or not
func GetSlidesByUptime(uptime string) (filename string, ispdf bool, exists bool) {
	// define the default value
	enties, err := os.ReadDir(dbslide)
	if err != nil {
		return "", true, false
	}
	for _, fln := range enties {
		base, ext := FileNameParser(fln.Name())
		fmt.Println(base, uptime, fln.Name())
		if base == uptime {
			return fmt.Sprintf("%s/%s", dbslide, fln.Name()), ext == "pdf", true
		}
	}
	return "", true, false
}

// AppendReport add a Report into db, as the latest
func AppendReport(rep Report) {
	data := LoadData()
	v := []Report{rep}
	newData := append(v, data...)
	WriteData(newData)
}

// AppendCommentToLatest add a CommentItem in current(latest) Report
func AppendCommentToLatest(comm CommentItem) {
	data := LoadData()
	data[0].Comment = append(data[0].Comment, comm)
	WriteData(data)
}

// ReSortAllData re-sort all Report by Report.Uptime and write to db (with backup)
func ReSortAllData() {
	data := LoadData()
	sort.Stable(SortByUpTime(data))
	WriteData(data)
}

type SortByUpTime []Report

func (a SortByUpTime) Len() int           { return len(a) }
func (a SortByUpTime) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a SortByUpTime) Less(i, j int) bool { return a[i].Uptime < a[j].Uptime }
