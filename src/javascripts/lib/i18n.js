"use strict";

let lang = "ch";

export function setLang(lang_) {
  lang = lang_;
}

export function getTag(tags) {
  return tags[lang];
}