'use strict';

exports.checkParam = function (obj, keys) {
  for (const key of keys) {
    if (obj[key] === undefined) {
      throw new Error(`${key} should be passed in!`);
    }
  }
};

exports.createAreaData = function (yaxis, fn, duration = 24) {
  const data = [];
  const interval = duration * 60 / 720 * 60 * 1000;
  const end = Date.now();
  const start = end - duration * 60 * 60 * 1000;

  // const noNeedStart = start + 3 * 60 * 60 * 1000;
  // const noNeedEnd = noNeedStart + 3 * 60 * 60 * 1000;

  // console.log(new Date(noNeedStart).toLocaleString(), new Date(noNeedEnd).toLocaleString())

  for (let time = start; time < end; time += interval) {
    const item = { time };
    // if (time >= noNeedStart && time < noNeedEnd) {
    //   data.push(item);
    //   continue;
    // }

    for (const y of yaxis) {
      item[y] = fn[y]();
    }

    data.push(item);
  }

  // data.unshift({ time: start - 1 });
  // data.unshift({ time: start - 2 });
  // data.push({ time: end + 1 });
  // data.push({ time: end + 2 });

  return data;
};