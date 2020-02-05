'use strict';

// import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';

export default [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    redirect: { path: '/dashboard' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]
