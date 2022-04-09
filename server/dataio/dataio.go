package dataio

import (
	"encoding/json"
	"os"
	"sort"
)

const dbpath string = "../db/data.json"

func LoadData() []Report {
	fp, err := os.ReadFile(dbpath)
	if err != nil {
		panic(err)
	}
	data := new([]Report)
	json.Unmarshal(fp, data)
	return *data
}

func WriteData(data []Report) {
	dt, _ := json.MarshalIndent(data, "", "\t")
	os.Rename(dbpath, dbpath+".bkup")
	err := os.WriteFile(dbpath, dt, 0666) // 0666 as the `os.Create` example. (like created by touch)
	if err != nil {
		panic(err)
	}
}

func QueryLatestReport() Report {
	data := LoadData()
	return data[0]
}

func QueryPastReports() []Report {
	data := LoadData()
	return data[1:]
}

func AppendReport(rep Report) {
	data := LoadData()
	v := []Report{rep}
	newData := append(v, data...)
	WriteData(newData)
}

func AppendCommentToLatest(comm CommentItem) {
	data := LoadData()
	data[0].Comment = append(data[0].Comment, comm)
	WriteData(data)
}

func ReSortAllData() {
	data := LoadData()
	sort.Stable(SortByUpTime(data))
	WriteData(data)
}

type SortByUpTime []Report

func (a SortByUpTime) Len() int           { return len(a) }
func (a SortByUpTime) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a SortByUpTime) Less(i, j int) bool { return a[i].Uptime < a[j].Uptime }
