'use strict';

const path = require('path');

const path1 = `/Users/hyj1991/git/monitor/xui/package.json`;
const path2 = `/Users/hyj1991/git/monitor/xprofiler/package.json`;
const path3 = `/Users/hyj1991/git/monitor/easy-monitor/package.json`;
const path4 = `/Users/hyj1991/git/monitor/xtransit/package.json`;

const data = [
  {
    value: path1,
    label: path.basename(path1),
    risk: {
      vulnerabilities: {
        critical: 1,
        high: 20,
        moderate: 3,
        low: 1
      },
      dependencies: 6679,
      devDependencies: 12934,
      optionalDependencies: 220,
      totalDependencies: 27854,
      scanTime: "2020-03-30 17:23:56"
    },
  },
  {
    value: path2,
    label: path.basename(path2),
    risk: {
      vulnerabilities: {
        low: 1
      },
      dependencies: 5084,
      devDependencies: 9509,
      optionalDependencies: 109,
      totalDependencies: 14596,
      scanTime: "2020-03-29 22:23:56"
    }
  },
  {
    value: path3,
    label: path.basename(path3),
    risk: {
      vulnerabilities: {
        moderate: 30,
        low: 2
      },
      dependencies: 6679,
      devDependencies: 12934,
      optionalDependencies: 220,
      totalDependencies: 27854,
      scanTime: "2020-03-30 17:23:56"
    },
  },
  {
    value: path4,
    label: path.basename(path4),
    risk: {
      vulnerabilities: {},
      dependencies: 6679,
      devDependencies: 12934,
      optionalDependencies: 220,
      totalDependencies: 27854,
      scanTime: "2020-03-30 17:23:56"
    },
  }
];

module.exports = data;