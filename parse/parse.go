package parse

import (
	"encoding/xml"
	"io/ioutil"
	"os"
)

type Kml struct {
	Placemarks []Placemark `xml:"Document>Placemark"`
}

type Placemark struct {
	Name        string `xml:"name"`
	Coordinates string `xml:"Polygon>outerBoundaryIs>LinearRing>coordinates"`
}

func LoadKml(filename string) (*Kml, error) {
	f, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	data, _ := ioutil.ReadAll(f)
	var doc Kml
	xml.Unmarshal(data, &doc)
	return &doc, nil
}
