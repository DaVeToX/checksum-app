const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function runCheckSum(listA, listB, target) {
    // !! Brute-Force => Bad runtime complexity
    // TODO: Add some tuning to the algorithm
    listA.sort((a, b) => a - b);
    listB.sort((a, b) => a - b);
    // if the last/biggest numbers of both lists combined are smaller as the target => return false, as target can't be reached (target is too big)
    // if first/lowest numbers of both lists combined are bigger as the target => return false, as target can't be reached (both lowest numbers are too big)
    if (listA[listA.length - 1] + listB[listB.length - 1] < target || listA[0] + listB[0] > target) {
        return false;
    }
    // calculate checksum
    for (let i = 0; i < listA.length; i++) {
        for (let j = 0; j < listB.length; j++) {
            if (listA[i] + listB[j] === target) {
                return true;
            }
        }
    }
}

app.post('/checksum', (req, res) => {
    try {
        const { listA, listB, target } = req.body;

        // Run checks against the data from request data
        // unnecessary checks, as already checked in api spec
        // check if all needed data is present
        if (!listA || !listB || !target) {
            return res.status(400).json({ error: 'Missing/Wrong data in the request' });
        }
        // check if both lists contains only numbers
        if (!listA.every((num) => typeof num === 'number')) {
            return res.status(400).json({ error: 'List A should contain only numbers' });
        }
        if (!listB.every((num) => typeof num === 'number')) {
            return res.status(400).json({ error: 'List B should contain only numbers' });
        }
        // check if target is a number
        if (typeof target !== 'number') {
            return res.status(400).json({ error: 'Target should be a number' });
        }

        const result = runCheckSum(listA, listB, target);

        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
