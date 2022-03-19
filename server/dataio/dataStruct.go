package dataio

// CommentItem is the data struct for comment items
// The `json:key` tags guide how json package identify the fields and unmarshal/marshal to struct
// `json:key` there should be no whitespace
// The struct field variables (like CommentItem.Time) should start with uppercase letters (to export)
type CommentItem struct {
	Time    int    `json:"time"`
	Date    string `json:"date"`
	Content string `json:"content"`
}

// Report is the data struct for a single report
// Thus the data.json should be the list of Report
type Report struct {
	Title    string        `json:"title"`
	Abstract string        `json:"abstract"`
	Uptime   int           `json:"uptime"`
	Date     string        `json:"date"`
	Comment  []CommentItem `json:"comment"`
}
