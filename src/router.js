"use strict";

// import Home from "@/components/Home";
import Console from "@/components/Console";
import Dashboard from "@/components/Dashboard";

export default [
  {
    path: "/",
    // component: Home,
    redirect: { path: "/console" }
  },
  {
    path: "/console",
    component: Console
  },
  {
    path: "/app/:appId/:menuTab",
    component: Dashboard
  }
];
