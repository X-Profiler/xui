'use strict';

// import Home from '@/components/Home';
import Console from '@/components/Console';

export default [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    redirect: { path: '/console' }
  },
  {
    path: '/console',
    name: 'Console',
    component: Console
  }
]
