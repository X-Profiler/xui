"use strict";

import { isNumber, isBooleanString, stringToBoolean } from "@/javascripts/lib/common";

function changeValue(componentKey, value, nextTick) {
  if (nextTick) {
    this[componentKey] = null;
    setTimeout(() => this[componentKey] = value, 0);
  } else {
    this[componentKey] = value;
  }
}

function checkValueSetting(componentKey, setValue, notSetting = false, nextTick = false) {
  const whiteList = this.valueWhiteList && this.valueWhiteList[componentKey];
  const shouldDoNext = !setValue || !Array.isArray(whiteList) || whiteList.includes(setValue);
  if (!shouldDoNext) {
    if (!notSetting) {
      this.$Message.error(`不合法的参数：${setValue}`);
    }
    if (Array.isArray(whiteList)) {
      changeValue.call(this, componentKey, whiteList[0], nextTick);
    }
  } else if (!notSetting) {
    if (setValue) {
      if (isNumber(setValue)) {
        changeValue.call(this, componentKey, Number(setValue), nextTick);
      } else if (isBooleanString(setValue)) {
        changeValue.call(this, componentKey, stringToBoolean(setValue), nextTick);
      } else {
        changeValue.call(this, componentKey, setValue, nextTick);
      }
    } else {
      if (Array.isArray(whiteList)) {
        changeValue.call(this, componentKey, whiteList[0], nextTick);
      }
    }
  }
  return shouldDoNext;
}

export function watchRoute(args, queryKey, componentKey, nextTick = false) {
  const queryValue = args[0].query[queryKey];
  checkValueSetting.call(this, componentKey, queryValue, false, nextTick);
}

export function watchQueryKey(queryKey, componentKey, args) {
  const [newVal, oldVal] = args;

  if (!checkValueSetting.call(this, componentKey, newVal)) {
    return;
  }

  const nessaryQueryArgs = this.nessaryQueryArgs || [];
  const query = this.$route.query;
  if ((query[queryKey] == newVal)
    || isBooleanString(query[queryKey]) && stringToBoolean(query[queryKey]) === newVal) {
    return;
  }

  const $query = { [queryKey]: newVal };
  for (const nessaryArg of nessaryQueryArgs) {
    if (nessaryArg !== queryKey) {
      $query[nessaryArg] = query[nessaryArg];
    }
  }

  const replace = oldVal === undefined || !checkValueSetting.call(this, componentKey, oldVal, true);
  if (replace) {
    this.$router.replace({ path: this.$route.path, query: $query });
  } else {
    this.$router.push({ path: this.$route.path, query: $query });
    return true;
  }
}