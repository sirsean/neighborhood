neighborhood
===========

**Neighborhood** is a web app that tells you what neighborhood you are currently in.

It currently only supports Chicago, with a KML file from [Kevin Zolkiewicz at Chicago Neighborhoods Map](http://chicagomap.zolk.com/about.html). Thanks Kevin!

# Rationale

I often wonder exactly what neighborhood I'm in. This will help!

You just open it, it gets your current location, and determines which neighborhood encompasses that spot.

# Decisions

The app has a Go backend and a React frontend. It is designed to be entirely serverless; the API runs in Lambda and responds to requests at a single endpoint: `GET /where`.

The backend reads a KML file at startup that defines the polygons for all the neighborhoods.

# Deployment

This runs in Lambda, and the frontend is served by S3.

To build and deploy the backend:

```
script/build.sh
script/deploy.sh
```

To build and deploy the frontend:

```
cd frontend
./build.sh
./deploy.sh
```
