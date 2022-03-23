package usrcheck

import (
	"os"
)

const usrpath = "../db/usr.txt"

type UsrId struct {
	Id string `json:"id"`
}

type UsrCorrect struct {
	Res bool `json:"res"`
}

// Check whether the usr is correct
func IsUsrCorrect(inp UsrId) UsrCorrect {
	fp, err := os.ReadFile(usrpath)
	if err != nil {
		return UsrCorrect{Res: false}
	}
	return UsrCorrect{Res: string(fp) == inp.Id}
}
