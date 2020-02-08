'use strict';

import axios from "axios";

let lang = 'ch';

export function setLang(lang_) {
  lang = lang_;
}

export function getTag(tags) {
  return tags[lang];
}

export function error(content, code, duration) {
  if (Number(code) === 401) {
    location.reload();
    return;
  }
  if (duration) {
    this.$Message.error({ content, duration, closable: true });
  } else {
    this.$Message.error(content);
  }
}

export function resolveData(message, loadingKey, data) {
  data = data.data;
  let res;
  if (data.ok) {
    res = data.data;
  } else {
    error.call(this, data.message || `${message}`, data.code);
  }
  if (loadingKey) {
    this[loadingKey] = false;
  }
  return res;
}

export function handleError(message, loadingKey, err) {
  error.call(this, `${message} ${err}`, err.code);
  this[loadingKey] = false;
}

export function get(message, url, params, callback, loadingKey = '') {
  if (loadingKey) {
    this[loadingKey] = true;
  }
  message = message[lang];
  axios
    .get(url, { params })
    .then(resolveData.bind(this, message, loadingKey))
    .then(callback)
    .catch(handleError.bind(this, message, loadingKey));
}