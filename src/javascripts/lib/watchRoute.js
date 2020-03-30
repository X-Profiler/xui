"use strict";

import { isNumber } from "@/javascripts/lib/common";

function checkValueSetting(componentKey, setValue, notSetting = false) {
  const whiteList = this.valueWhiteList && this.valueWhiteList[componentKey];
  const shouldDoNext = !setValue || !Array.isArray(whiteList) || whiteList.includes(setValue);
  if (!shouldDoNext) {
    if (!notSetting) {
      this.$Message.error(`不合法的参数：${setValue}`);
    }
    if (Array.isArray(whiteList)) {
      this[componentKey] = whiteList[0];
    }
  } else if (!notSetting) {
    if (setValue) {
      this[componentKey] = isNumber(setValue) ? Number(setValue) : setValue;
    } else {
      if (Array.isArray(whiteList)) {
        this[componentKey] = whiteList[0];
      }
    }
  }
  return shouldDoNext;
}

export function watchRoute(args, queryKey, componentKey) {
  const queryValue = args[0].query[queryKey];
  checkValueSetting.call(this, componentKey, queryValue);
}

export function watchQueryKey(queryKey, componentKey, args) {
  const [newVal, oldVal] = args;

  if (!checkValueSetting.call(this, componentKey, newVal)) {
    return;
  }

  const nessaryQueryArgs = this.nessaryQueryArgs || [];
  const query = this.$route.query;
  if (query[queryKey] == newVal) {
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
  }
}