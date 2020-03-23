"use strict";

import axios from "axios";
const CancelToken = axios.CancelToken;

export function createCancelToken() {
  return CancelToken.source();
}

export function cancelRequest(source) {
  source.cancel("Operation canceled by the user.");
}