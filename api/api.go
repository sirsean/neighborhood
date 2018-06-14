package api

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/sirsean/neighborhood/hood"
	"log"
	"net/http"
	"strconv"
)

func Router() http.Handler {
	router := httprouter.New()
	router.GET("/where", where)
	return router
}

func where(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	query := r.URL.Query()
	lat, _ := strconv.ParseFloat(query.Get("latitude"), 64)
	long, _ := strconv.ParseFloat(query.Get("longitude"), 64)
	here := hood.Coordinate{Lat: lat, Long: long}
	neighborhood, err := hood.Which(here)
	if err == nil {
		log.Printf("Found (%v, %v): %v", lat, long, neighborhood.Name)
		respond(w, neighborhood)
	} else {
		log.Printf("Not Found: %v %v", lat, long)
		originHeader(w)
		http.NotFound(w, r)
	}
}

func originHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func respond(w http.ResponseWriter, value interface{}) {
	originHeader(w)
	w.Header().Set("Content-Type", "application/json")
	response, err := json.Marshal(value)
	if err != nil {
		log.Println("json error", err)
	}
	w.Write(response)
}
