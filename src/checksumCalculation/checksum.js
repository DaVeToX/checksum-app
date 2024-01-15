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
    if (indexA >= listA.length || indexB >= listB.length) {
        return {
          result: false,
          message: "no combination found",
      };;
    }

    // Add next number from listA
    const numbersFromListA = runCheckSumMultiPair(listA, listB, target, currentSum + listA[indexA], indexA + 1, indexB, currentNumbersA.concat(listA[indexA]), currentNumbersB);
    if (numbersFromListA !== null) {
        return numbersFromListA;
    }

    // Add next number from listB
    const numbersFromListB = runCheckSumMultiPair(listA, listB, target, currentSum + listB[indexB], indexA, indexB + 1, currentNumbersA, currentNumbersB.concat(listB[indexB]));
    if (numbersFromListB !== null) {
        return numbersFromListB;
    }

    // Add both lists together
    const numbersFromBothLists = runCheckSumMultiPair(listA, listB, target, currentSum + listA[indexA] + listB[indexB], indexA + 1, indexB + 1, currentNumbersA.concat(listA[indexA]), currentNumbersB.concat(listB[indexB]));
    if (numbersFromBothLists !== null) {
        return numbersFromBothLists;
    }

    // Skip current number from listA
    return runCheckSumMultiPair(listA, listB, target, currentSum, indexA + 1, indexB, currentNumbersA, currentNumbersB);
}

function runCheckSumSinglePair(listA, listB, target) {
    // !! Brute-Force => Bad runtime complexity
    // TODO: Add some tuning to the algorithm
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
    for (let i = 0; i < listA.length; i++) {
      for (let j = 0; j < listB.length; j++) {
        if (listA[i] + listB[j] === target) {
          res.result = true;
          res.message = listA[i] + "+" + listB[j] + "=" + target;
          break;
        }
      }
    }
    return res;
  }
  
  module.exports = { runCheckSumSinglePair, runCheckSumMultiPair };
  