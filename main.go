package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/sirsean/neighborhood/api"
	"github.com/sirsean/neighborhood/config"
	"html/template"
	"log"
	"net/http"
)

func main() {
	log.Printf("starting up")

	router := mux.NewRouter()
	router.HandleFunc("/", index).Methods("GET")

	router.HandleFunc("/api/where", api.Where).Methods("GET")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir(fmt.Sprintf("%s/static/", config.Get().Host.Path))))
	http.Handle("/", router)

	port := config.Get().Host.Port
	log.Printf("Serving on port %v", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

var indexTemplate = template.Must(template.ParseFiles(fmt.Sprintf("%s/template/index.html", config.Get().Host.Path)))

func index(w http.ResponseWriter, r *http.Request) {
	type Data struct {
		MapsApiKey string
	}
	data := Data{
		MapsApiKey: config.Get().Maps.ApiKey,
	}
	indexTemplate.Execute(w, data)
}
