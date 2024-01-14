# checksum-app
This is a spare time project, where I want to implement a small app that runs the well known checksum problem

# How to build the app
## Quick local testing
- run:
```sh
node src/app.js
```
- proceed with **Test app**

## To run it in Docker
- Run:
```sh 
docker build -t checksum .
docker run -p 3000:3000 checksum
```

## Test app
- Run a tool to test the app (e.g. Postman) and use the URL http://localhost:3000/checksumSinglePair or http://localhost:3000/checksumMultiPair with body:
```json
{
    "listA": [1, 65, 23, 4, 7],
    "listB": [2, 6, 2, 7, 8],
    "target": 10
}
```
- The result will be:
```json
{
    "result": {
        "result": true/false,
        "message": "1+7+2=10" or "no pair/combination found"
    }
}
```