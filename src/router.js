'use strict';

// import Home from '@/components/Home';
import Console from '@/components/Console';
import DashboardIndex from '@/components/dashboard/Index';

export default [
  {
    path: '/',
    // component: Home,
    redirect: { path: '/console' }
  },
  {
    path: '/console',
    component: Console
  },
  {
    path: '/app/:appId/:menuTab',
    component: DashboardIndex
  }
]
