"use strict";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "@/App.vue";
import Store from "@/store";
import Routers from "@/router.js";
import ViewUI from "view-design";
import DomPortal from "vue-dom-portal";
import "view-design/dist/styles/iview.css";
import "@/theme/index.less";

// global components
import xChartip from "@/components/common/Chartip";
import xDashboardTitle from "@/components/common/DashboardTitle";
import xDrawer from "@/components/common/Drawer";
import xDropdown from "@/components/common/Dropdown";
import xErrorMessage from "@/components/common/ErrorMessage";
import xLoading from "@/components/common/Loading";
import xModal from "@/components/common/Modal";
import xTable from "@/components/common/Table";
import xTooltip from "@/components/common/Tooltip";
import xTree from "@/components/common/tree/TreeIndex";

// charts
import xArea from "@/components/chart/Area";
import xHistogram from "@/components/chart/Histogram";
import xPie from "@/components/chart/Pie";
import xPie2 from "@/components/chart/Pie2";
import xScatter from "@/components/chart/Scatter";
import xMiniScatter from "@/components/chart/MiniScatter";
import xSpaceScatter from "@/components/chart/SpaceScatter";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(DomPortal);

Vue.component("x-chartip", xChartip);
Vue.component("x-dashboard-title", xDashboardTitle);
Vue.component("x-drawer", xDrawer);
Vue.component("x-dropdown", xDropdown);
Vue.component("x-error-message", xErrorMessage);
Vue.component("x-loading", xLoading);
Vue.component("x-modal", xModal);
Vue.component("x-table", xTable);
Vue.component("x-tooltip", xTooltip);
Vue.component("x-tree", xTree);
Vue.component("x-area", xArea);
Vue.component("x-histogram", xHistogram);
Vue.component("x-pie", xPie);
Vue.component("x-pie2", xPie2);
Vue.component("x-scatter", xScatter);
Vue.component("x-mini-scatter", xMiniScatter);
Vue.component("x-space-scatter", xSpaceScatter);


// add vuex store
const store = new Vuex.Store(Store);

// add vue router
const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
