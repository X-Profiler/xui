"use strict";

import { createCancelToken, cancelRequest } from "@/javascripts/lib/request";
import { isNumber } from "@/javascripts/lib/common";

const routeCanBackMap = {};

function routeFactory(openName, closeName, ...args) {
  const tag = "YES";

  const [queryKeyName, flag, refKey, setFlag, routeData, request, loading, extra = []] = args;

  return {
    handleMounted(name, enable = false, dataKey = false) {
      if (enable) {
        this[name](this.$route.query, dataKey);
      } else {
        this[setFlag]({ status: false });
      }
    },

    mapMethods(name) {
      return {
        [name](query, dataKey) {
          const element = this.$refs[refKey];
          const value = query[this[queryKeyName]];

          if (value === tag) {
            const data = { status: true };
            if (routeData) {
              try {
                data[routeData] = JSON.parse(query[routeData]);
              } catch (e) { e; }
            }
            if (dataKey) {
              data[dataKey] = query;
            }
            this[setFlag](data);
            element[openName]();
            if (request) {
              const extraData = {};
              for (const keyId of extra) {
                extraData[keyId] = this[keyId];
              }
              this[request](Object.assign({
                cancelToken: this.cancelToken.token
              }, extraData));
            }
          } else {
            this[setFlag]({ status: false });
            element[closeName]();
            if (loading && this[loading]) {
              cancelRequest(this.cancelToken);
              this.cancelToken = createCancelToken();
            }
          }
        }
      };
    },

    mapWatch: {
      [flag]() {
        const queryKey = this[queryKeyName];
        if (this[flag]) {
          const route = this.$route;
          if (route.query[queryKey] === tag) {
            return;
          }
          const query = Object.assign({}, route.query, {
            [queryKey]: tag,
            [routeData]: JSON.stringify(this[routeData])
          });
          this.$router.push({ path: route.path, query });
          routeCanBackMap[queryKey] = true;
        } else {
          const route = this.$route;
          if (route.query[queryKey] === tag) {
            if (!routeCanBackMap[queryKey] && this.$store.state.first) {
              this.$store.commit("first", false);
              const $query = {};
              if (Array.isArray(this.whiteQueryKeys)) {
                for (const key of this.whiteQueryKeys) {
                  $query[key] = route.query[key];
                }
                $query[queryKey] = undefined;
                $query[routeData] = undefined;
              } else {
                Object.assign($query, route.query, {
                  [queryKey]: undefined,
                  [routeData]: undefined
                });
              }
              this.$router.push({ path: route.path, query: $query });
            } else {
              this.$router.go(isNumber(this.goBack) ? -(this.goBack) : -1);
              routeCanBackMap[queryKey] = false;
            }
          }
        }
      }
    }
  };
}

export function drawerRouteFactory(...args) {
  return routeFactory("open", "close", ...args);
}

export function modalRouteFactory(...args) {
  return routeFactory("showModal", "cancelModal", ...args);
}