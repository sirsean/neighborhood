package main

import (
	"github.com/gorilla/mux"
	"github.com/sirsean/neighborhood/api"
	"html/template"
	"log"
	"net/http"
	"os"
)

var googleMapsApiKey string = os.Getenv("GOOGLE_MAPS_API_KEY")

func main() {
	log.Printf("starting up")

	router := mux.NewRouter()
	router.HandleFunc("/", index).Methods("GET")

	router.HandleFunc("/api/where", api.Where).Methods("GET")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/src/github.com/sirsean/neighborhood/static/")))
	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":80", nil))
}

var indexTemplate = template.Must(template.ParseFiles("/src/github.com/sirsean/neighborhood/template/index.html"))

func index(w http.ResponseWriter, r *http.Request) {
	type Data struct {
		MapsApiKey string
	}
	data := Data{
		MapsApiKey: googleMapsApiKey,
	}
	indexTemplate.Execute(w, data)
}
