"use strict";

import { setLang, getTag } from "@/javascripts/lib/i18n";
import { createNamespace } from "@/javascripts/lib/vuexHelper";
import { formatSize, formatTime } from "@/javascripts/lib/format";
import { createCancelToken, cancelRequest } from "@/javascripts/lib/request";
import { watchRoute, watchQueryKey } from "@/javascripts/lib/watchRoute";
import { storeFactory } from "@/javascripts/lib/storeFactory";
import { drawerRouteFactory, modalRouteFactory } from "@/javascripts/lib/routerFactory";
import { dichotomy } from "@/javascripts/lib/dichotomy";
import { hashCode, isNumber, createLaterFunction } from "@/javascripts/lib/common";

export {
  setLang, getTag,
  createNamespace,
  formatSize, formatTime,
  createCancelToken, cancelRequest,
  watchRoute, watchQueryKey,
  storeFactory,
  drawerRouteFactory, modalRouteFactory,
  dichotomy,
  hashCode, isNumber, createLaterFunction
};