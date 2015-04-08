package config

import (
	"code.google.com/p/gcfg"
	"log"
	"os"
)

type Config struct {
	Host struct {
		Port string
		Path string
		Kml  string
	}
}

var cfg Config
var loaded bool

func Get() Config {
	if !loaded {
		Load()
	}
	return cfg
}

func Load() {
	var file string
	if len(os.Args) > 1 {
		file = os.Args[1]
	} else {
		file = "/etc/neighborhood/neighborhood.gcfg"
	}
	log.Printf("Loading from config file: %v", file)
	err := gcfg.ReadFileInto(&cfg, file)
	if err != nil {
		log.Printf("Failed to read config: %v", err)
	} else {
		loaded = true
	}
}
