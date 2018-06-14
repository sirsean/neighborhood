cp xml/chicago.kml dist/chicago.kml

cd dist
rm neighborhood-api.zip
zip neighborhood-api.zip neighborhood-api chicago.kml

cd ../

aws lambda update-function-code --function-name neighborhood-api --zip-file fileb://dist/neighborhood-api.zip --publish