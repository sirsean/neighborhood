./build.sh
docker build -t neighborhood .
docker stop neighborhood
docker rm neighborhood
docker rmi $(docker images -q -f dangling=true)
docker run \
    -p 4566:80 \
    -p 4567:443 \
    --name neighborhood \
    -d \
    neighborhood
docker logs -f --tail=20 neighborhood
