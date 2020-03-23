"use strict";

function getIndexOrIndex(length) {
  if (length % 2 === 0) {
    return length / 2;
  } else {
    return (length - 1) / 2;
  }
}

export function dichotomy(arr, val) {
  let length = arr.length;

  let before = arr[0];
  let after = arr[arr.length - 1];
  let index = getIndexOrIndex(length);

  while (length > 0) {
    if (val >= arr[index]) {
      if (arr[index] > before) {
        before = arr[index];
      }
      length = getIndexOrIndex(length, false);
      index = index + getIndexOrIndex(length) + 1;
    } else {
      if (arr[index] < after) {
        after = arr[index];
      }

      length = getIndexOrIndex(length, true);
      index = index - (length - getIndexOrIndex(length));
    }
  }

  return [before, after];
}