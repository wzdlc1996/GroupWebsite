package dataio

import (
	"fmt"
	"path"
	"strings"
)

// FileNameParser returns the basename and extname of filename, no extra dot, no parent dir.
func FileNameParser(filename string) (base, ext string) {
	if filename[0] == 0x2e { // if the filename is started with dot, neglect it
		return "", ""
	}
	_, fn := path.Split(filename)
	fnps := strings.SplitN(fn, ".", 2)
	if len(fnps) < 2 {
		return "", ""
	}
	base = fnps[0]
	ext = fnps[1]
	return base, ext
}

// SlidesFileNameDst returns the destiny of slide upload
func SlidesFileNameDst(filename string) string {
	return fmt.Sprintf("%s/%s", dbslide, filename)
}
