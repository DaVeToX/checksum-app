var express = require("express");
var bodyParser = require("body-parser");

var checksum = require("./checksumCalculation/checksum");
// const { compile } = require('openapi-to-json-schema');
// var swaggerUi = require('swagger-ui-express');
// const yaml = require('yamljs');
// const path = require('path');

var app = express();
app.use(bodyParser.json());

// OpenAPI-Spezifikation
// const apiSpec = yaml.load('../api/oneapi.yaml');
// const jsonSchema = compile(apiSpec);

// Swagger-UI integration
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

app.post("/checksumSinglePair", (req, res) => {
  try {
    var { listA, listB, target } = req.body;
    var checks = runChecks(listA, listB, target);

    if (checks.checkSuccessfull === false) {
        return res.status(400).json({ error: checks.error });
    } 
    
    const result = checksum.runCheckSumSinglePair(listA, listB, target);

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

app.post("/checksumMultiPair", (req, res) => {
    try {
        var { listA, listB, target } = req.body;
        var checks = runChecks(listA, listB, target);
    
        if (checks.checkSuccessfull === false) {
            return res.status(400).json({ error: checks.error });
        } 
        
        const result = checksum.runCheckSumMultiPair(listA, listB, target);
    
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
});

function runChecks(listA, listB, target) {
  // Run checks against the data from request data
  // unnecessary checks, as already checked in api spec
  // check if all needed data is present
  if (!listA || !listB || !target) {
    return {
      checkSuccessfull: false,
      error: "Missing/Wrong data in the request"
    };
  }
  // check if both lists contains only numbers and not listA should not empty
  if (!listA.every((num) => typeof num === "number") || listA.length == 0) {
    return {
        checkSuccessfull: false,
      error: "List A should contain only numbers"
    };
  }
  if (!listB.every((num) => typeof num === "number") || listB.length == 0) {
    return {
        checkSuccessfull: false,
      error: "List B should contain only numbers"
    };
  }
  // check if target is a number
  if (typeof target !== "number") {
    return {
        checkSuccessfull: false,
      error: "Target should be a number"
    };
  }
  return {
    checkSuccessfull: true
  };
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
