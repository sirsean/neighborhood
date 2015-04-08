neighborhood
===========

**Neighborhood** is a web app that tells you what neighborhood you are currently in.

It currently only supports Chicago, with a KML file from [Kevin Zolkiewicz at Chicago Neighborhoods Map](http://chicagomap.zolk.com/about.html). Thanks Kevin!

# Rationale

I often wonder exactly what neighborhood I'm in. This will help!

You just open it, it gets your current location, and determines which neighborhood encompasses that spot.

# Decisions

The app has a Go backend and a React frontend.

The backend reads a KML file at startup that defines the polygons for all the neighborhoods.

# Deployment

To deploy the backend, you will need to compile it for your production environment and upload the executable file and the template files to the server.

## /etc/neighborhood/neighborhood.gcfg

You will need this file whether you're developing locally or deploying to a server.

```
[Host]
port = :80
path = /path/to/neighborhood
kml = /path/to/neighborhood/xml/chicago.kml
```

## systemd config

Edit `/lib/systemd/system/neighborhood.service`:

```
[Unit]
Description=neighborhood web service
After=syslog.target network.target

[Service]
Type=simple
ExecStart=/path/to/neighborhood/neighborhood.linux

[Install]
WantedBy=multi-user.target
```

Then, make a symbolic link:

```
ln -s /lib/systemd/system/neighborhood.service /etc/systemd/system/neighborhood.service
```

And start/enable your service:

```
systemctl start neighborhood.service
systemctl enable neighborhood.service
```

## compile/upload/deploy script

I deploy with a script like this:

```
echo "Compiling"
cd neighborhood; GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o neighborhood.linux; cd ..
echo "Uploading"
pwd
tar cvf neighborhood.tar neighborhood/neighborhood.linux neighborhood/template neighborhood/static neighborhood/xml
ssh -l sirsean whatneighborhood.com mkdir -p neighborhood
ssh -l sirsean whatneighborhood.com rm neighborhood/neighborhood.linux
scp neighborhood.tar sirsean@whatneighborhood.com:neighborhood.tar
ssh -l sirsean whatneighborhood.com tar xvf neighborhood.tar
echo "Restarting"
ssh -l root whatneighborhood.com systemctl restart neighborhood.service
echo "Deployed"

```

Note that you will need to set up your system to cross-compile for your target environment. (I deploy to a 64-bit Linux server.)

