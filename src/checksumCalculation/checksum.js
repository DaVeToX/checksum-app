function runCheckSumMultiPair(listA, listB, target, currentSum = 0, indexA = 0, indexB = 0, currentNumbersA = [], currentNumbersB = []) {
    // connect all numbers from currentNumbers to a string separated by "+"
    if (currentSum === target) {
        var combinedNumbers = currentNumbersA.concat(currentNumbersB);
        var resString = combinedNumbers.join("+");
        resString += "=" + target;
        return {
            result: true,
            message: resString,
        };
    }

    // stop recursion if we reached the end of one of the lists
    if ((indexA >= listA.length || indexB >= listB.length) && (currentSum !== target)) {
      return {
        result: false,
        message: "no combination found",
      };        
    }

    // Add next number from listA
    if (indexA < listA.length) {
        const numbersFromListA = runCheckSumMultiPair(listA, listB, target, currentSum + listA[indexA], indexA + 1, indexB, currentNumbersA.concat(listA[indexA]), currentNumbersB);
        if (numbersFromListA.result) {
            return numbersFromListA;
        }
    }

    // Add next number from listB
    if (indexB < listB.length) {
        const numbersFromListB = runCheckSumMultiPair(listA, listB, target, currentSum + listB[indexB], indexA, indexB + 1, currentNumbersA, currentNumbersB.concat(listB[indexB]));
        if (numbersFromListB.result) {
            return numbersFromListB;
        }
    }

    // Add both lists together
    if (indexA < listA.length && indexB < listB.length) {
        const numbersFromBothLists = runCheckSumMultiPair(listA, listB, target, currentSum + listA[indexA] + listB[indexB], indexA + 1, indexB + 1, currentNumbersA.concat(listA[indexA]), currentNumbersB.concat(listB[indexB]));
        if (numbersFromBothLists.result) {
            return numbersFromBothLists;
        }
    }

    // Skip current number from listA
    if (indexA < listA.length) {
        return runCheckSumMultiPair(listA, listB, target, currentSum, indexA + 1, indexB, currentNumbersA, currentNumbersB);
    }

    // Skip current number from listB
    if (indexB < listB.length) {
        return runCheckSumMultiPair(listA, listB, target, currentSum, indexA, indexB + 1, currentNumbersA, currentNumbersB);
    }

    return {
        result: false,
        message: "no combination found",
    };

}

function runCheckSumSinglePair(listA, listB, target) {
    // !! Brute-Force => Bad runtime complexity
    // TODO: Add some tuning to the algorithm
    var pairs = [];
    var seenNumbers = new Map(); // to store all already iterated numbers
    var res = {
      result: false,
      message: "no pair found",
    };

    listA.sort((a, b) => a - b);
    listB.sort((a, b) => a - b);
    // if the last/biggest numbers of both lists combined are smaller as the target => return false, as target can't be reached (target is too big)
    // if first/lowest numbers of both lists combined are bigger as the target => return false, as target can't be reached (both lowest numbers are too big)
    if (
      listA[listA.length - 1] + listB[listB.length - 1] < target ||
      listA[0] + listB[0] > target
    ) {
      return res;
    }

    // calculate checksum
    for (var num of [...listA, ...listB]) {
      var differenceLeftover = target - num;
  
      if (seenNumbers.has(differenceLeftover)) {
        pairs.push([num, differenceLeftover]);
      }
  
      seenNumbers.set(num, differenceLeftover);
    }

    if (pairs.length > 0) {
      res.result = true;
      res.message = createReturnMessage(pairs, target);
    }

    return res;
  }

  function createReturnMessage(pairs, target) {
    // return a list of all pairs that add up to the target value
    var resString = "";
    for (var pair of pairs) {
      resString += pair[0] + "+" + pair[1] + "=" + target;
      if (pairs.indexOf(pair) < pairs.length - 1) {
        resString += ", ";
      }
    }
    return resString;
  }
  
  module.exports = { runCheckSumSinglePair, runCheckSumMultiPair };
  