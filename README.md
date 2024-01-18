# checksum-app
This is a spare time project, where I want to implement a small app that runs the well known checksum problem.
# Checksum App

The Checksum app is a simple application that checks whether there is a pair in two lists of numbers whose sum corresponds to a certain target value.
Two endpoints are offered.
/checksumSinglePair
and
/checksumMultiPair

# How to build the app
## Quick local testing
- Run ```node src/app.js ``` and proceed with **Test app**

## To run it in Docker
- Run ```docker build -t checksum .``` and ```docker run -p 3000:3000 checksum```

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
```
{
    "result": {
        "result": true/false,
        "message": "1+7+2=10" or "no pair/combination found"
    }
}
```
