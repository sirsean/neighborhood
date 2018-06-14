package main

import (
	"github.com/akrylysov/algnhsa"
	"github.com/sirsean/neighborhood/api"
)

func main() {
	algnhsa.ListenAndServe(api.Router(), nil)
}
