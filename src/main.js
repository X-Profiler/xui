"use strict";

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routers from "./router.js";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "./theme/index.less";

// global components
import xDashboardTitle from "@/components/common/DashboardTitle";
import xDropdown from "@/components/common/Dropdown";
import xLoading from "@/components/common/Loading";
import xModal from "@/components/common/Modal";
import xTable from "@/components/common/Table";
import xTooltip from "@/components/common/Tooltip";

// charts
import xScatter from "@/components/chart/Scatter";

Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.component("x-dashboard-title", xDashboardTitle);
Vue.component("x-dropdown", xDropdown);
Vue.component("x-loading", xLoading);
Vue.component("x-modal", xModal);
Vue.component("x-table", xTable);
Vue.component("x-tooltip", xTooltip);
Vue.component("x-scatter", xScatter);

const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
