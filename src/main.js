"use strict";

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routers from "./router.js";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "./theme/index.less";
// global components
import xTable from "@/components/common/Table";
import xLoading from "@/components/common/Loading";

Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.component("x-table", xTable);
Vue.component("x-loading", xLoading);

const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
