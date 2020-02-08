'use strict';

export const http = {
  user: {
    url: '/xapi/user',
    msg: {
      ch: '获取用户信息失败，请重试',
      en: 'Get user info failed, please retry'
    }
  },
  apps: {
    url: '/xapi/apps',
    msg: {
      ch: '获取应用列表失败，请重试',
      en: 'Get applications failed, please retry'
    }
  }
};

export const tags = {
  // nav
  docs: {
    ch: '使用指南',
    en: 'User Guide'
  },
  console: {
    ch: '控制台',
    en: 'Console'
  },
  lang: {
    ch: '切换英文',
    en: 'Chinese'
  },

  // tab
  myApps: {
    ch: '我的应用',
    en: 'My Apps'
  },
  joinedApps: {
    ch: '加入的应用',
    en: 'Joined Apps'
  }
}