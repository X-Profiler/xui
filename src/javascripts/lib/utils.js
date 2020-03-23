"use strict";

import { setLang, getTag } from "./i18n";
import { createNamespace } from "./vuexHelper";
import { formatSize, formatTime } from "./format";
import { createCancelToken, cancelRequest } from "./request";
import { watchRoute, watchQueryKey } from "./watchRoute";
import { storeFactory } from "./storeFactory";
import { drawerRouteFactory, modalRouteFactory } from "./routerFactory";
import { dichotomy } from "./dichotomy";
import { hashCode, isNumber, createLaterFunction } from "./common";

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