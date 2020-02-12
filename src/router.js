'use strict';

// import Home from '@/components/Home';
import Console from '@/components/Console';
import InstanceIndex from '@/components/instance/Index';

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
    path: '/app/:appId/instance',
    component: InstanceIndex
  }
]
