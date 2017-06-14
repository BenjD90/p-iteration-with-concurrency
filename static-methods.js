/**
 * forEach implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.forEach = async (array, callback, thisArg) => {
  const promiseArray = [];
  for (let i = 0; i < array.length; i++) {
    promiseArray.push(callback.call(thisArg || this, array[i], i, array));
  }
  await Promise.all(promiseArray);
}

/**
 * forEach implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.forEachSeries = async (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    await callback.call(thisArg || this, array[i], i, array);
  }
}

/**
 * map implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.map = (array, callback, thisArg) => {
  const promiseArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      promiseArray[i] = callback.call(thisArg || this, array[i], i, array);
    } else {
      continue;
    }
  }
  return Promise.all(promiseArray);
}

/**
 * map implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.mapSeries = async (array, callback, thisArg) => {
  const result = [];
  for (var i = 0; i < array.length; i++) {
    if (i in array) {
      result[i] = await callback.call(thisArg || this, array[i], i, array);
    } else {
      continue;
    }
  }
  return result;
}

/**
 * find implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.find = (array, callback, thisArg) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      callback.call(thisArg || this, array[i], i, array).then(found => {
        if (found) {
          return resolve(array[i]);
        }
      }).catch(err => {
        throw err;
      });
    }
  });
}

/**
 * find implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.findSeries = async (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    if (await callback.call(thisArg || this, array[i], i, array)) {
      return array[i];
    }
  }
}

/**
 * findIndex implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.findIndex = (array, callback, thisArg) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      callback.call(thisArg || this, array[i], i, array).then(found => {
        if (found) {
          return resolve(i);
        }
      }).catch(err => {
        throw err;
      });
    }
  });
}

/**
 * findIndex implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.findIndexSeries = async (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    if (await callback.call(thisArg || this, array[i], i, array)) {
      return i;
    }
  }
}

/**
 * some implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.some = (array, callback, thisArg) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      callback.call(thisArg || this, array[i], i, array).then(found => {
        if (found) {
          resolve(true);
        } else if (i === array.length - 1) {
          resolve(false);
        }
      }).catch(err => {
        throw err;
      });
    }
  });
}

/**
 * some implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.someSeries = async (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    if (await callback.call(thisArg || this, array[i], i, array)) {
      return true;
    }
  }
  return false;
}

/**
 * every implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.every = (array, callback, thisArg) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      callback.call(thisArg || this, array[i], i, array).then(found => {
        if (!found) {
          return resolve(false);
        } else if (i === array.length - 1) {
          resolve(true);
        }
      }).catch(err => {
        throw err;
      });
    }
  });
}

/**
 * every implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.everySeries = async (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    if (!await callback.call(thisArg || this, array[i], i, array)) {
      return false;
    }
  }
  return true;
}

/**
 * filter implementation in parallel
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.filter = async (array, callback, thisArg) => {
  const promiseArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      promiseArray[i] = callback.call(thisArg || this, array[i], i, array);
    } else {
      continue;
    }
  }
  return Promise.all(promiseArray).then(results => {
    const filteredArray = [];
    results.forEach((result, index) => {
      if (result) {
        filteredArray.push(array[index]);
      }
    });
    return filteredArray;
  });
}

/**
 * filter implementation in series
 * @param {*[]} array
 * @param {Function} callback
 * @param {Object} thisArg
 */
exports.filterSeries = async (array, callback, thisArg) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      if (await callback.call(thisArg || this, array[i], i, array)) {
        result.push(array[i]);
      }
    } else {
      continue;
    }
  }
  return result;
}

/**
 * reduce implementation
 * @param {*[]} array
 * @param {Function} callback
 * @param {*} initialValue
 */
exports.reduce = async (array, callback, initialValue) => {
  let previousValue;
  for (var i = 0; i < array.length; i++) {
    if (i === 0) {
      if (initialValue) {
        previousValue = initialValue;
      } else {
        previousValue = array[i];
        continue;
      }
    }
    if (i in array) {
      previousValue = await callback(previousValue, array[i], i, array);
    } else {
      continue;
    }
  }
  return previousValue;
}
