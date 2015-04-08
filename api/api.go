package api

import (
	"encoding/json"
	"github.com/sirsean/neighborhood/hood"
	"log"
	"net/http"
	"strconv"
)

func Where(w http.ResponseWriter, r *http.Request) {
	lat, _ := strconv.ParseFloat(r.URL.Query().Get("latitude"), 64)
	long, _ := strconv.ParseFloat(r.URL.Query().Get("longitude"), 64)
	here := hood.Coordinate{Lat: lat, Long: long}
	neighborhood, err := hood.Which(here)
	if err == nil {
		log.Printf("Found (%v, %v): %v", lat, long, neighborhood.Name)
		response, _ := json.Marshal(neighborhood)
		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
	} else {
		log.Printf("Not Found: %v %v", lat, long)
		http.NotFound(w, r)
	}
}
