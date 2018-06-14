package hood

import (
	"errors"
	"github.com/sirsean/neighborhood/parse"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

type Coordinate struct {
	Lat  float64
	Long float64
}

type Neighborhood struct {
	Name   string
	Points []Coordinate `json:"-"`
}

var all []Neighborhood

func Which(point Coordinate) (*Neighborhood, error) {
	for _, n := range all {
		if n.Contains(point) {
			return &n, nil
		}
	}
	return nil, errors.New("no neighborhood")
}

func (n Neighborhood) Contains(c Coordinate) bool {
	size := len(n.Points)
	angle := float64(0)
	for i, p := range n.Points {
		p2 := n.Points[(i+1)%size]
		angle += angle2d(p.Lat-c.Lat, p.Long-c.Long, p2.Lat-c.Lat, p2.Long-c.Long)
	}
	return math.Abs(angle) >= math.Pi
}

func angle2d(y1, x1, y2, x2 float64) float64 {
	theta1 := math.Atan2(y1, x1)
	theta2 := math.Atan2(y2, x2)
	dtheta := theta2 - theta1
	for dtheta > math.Pi {
		dtheta -= 2 * math.Pi
	}
	for dtheta < -1*math.Pi {
		dtheta += 2 * math.Pi
	}
	return dtheta
}

func LoadFile(filename string) error {
	kml, err := parse.LoadKml(filename)
	if err != nil {
		log.Fatal("Failed to load KML: ", err)
		return err
	}
	all = make([]Neighborhood, len(kml.Placemarks))
	for i, placemark := range kml.Placemarks {
		pieces := strings.Split(strings.TrimSpace(placemark.Coordinates), " ")
		coordinates := make([]Coordinate, len(pieces))
		for j, piece := range pieces {
			c := strings.Split(piece, ",")
			long, _ := strconv.ParseFloat(c[0], 64)
			lat, _ := strconv.ParseFloat(c[1], 64)
			coordinates[j] = Coordinate{
				Lat:  lat,
				Long: long,
			}
		}
		all[i] = Neighborhood{
			Name:   placemark.Name,
			Points: coordinates,
		}
	}
	return nil
}

func init() {
	if os.Getenv("KML_FILE") != "" {
		LoadFile(os.Getenv("KML_FILE"))
	}
	log.Println("Neighborhoods:", len(all))
}
