'use strict';

const instanceMap = {};

function randomSetInstances() {
  for (var i = 1; i < 21; i++) {
    instanceMap[i] = {
      count: parseInt(Math.random() * 50)
    };
  }
}

randomSetInstances();
setInterval(randomSetInstances, 60 * 1000);

function randomInstance(instanceCount) {
  // 0: no data, 1 healthy, 2 warning, 3 errored
  const list = new Array(instanceCount).fill('*').map(() => ({
    status: 1,
    title: (Math.random() * 60).toFixed(2) + '%',
    agentId: Math.random().toString(16).slice(2, 10),
    pid: 10000 + parseInt(Math.random() * 89999)
  }));

  // set no data
  const noDataIndex = parseInt(Math.random() * instanceCount);
  if (list[noDataIndex]) {
    list[noDataIndex].status = 0;
    list[noDataIndex].title = '-';
  }

  // set warning
  const warningIndex = parseInt(Math.random() * instanceCount);
  if (list[warningIndex]) {
    list[warningIndex].status = 2;
    list[warningIndex].title = (60 + Math.random() * 25).toFixed(2) + '%';
  }

  // set error
  const errorIndex = parseInt(Math.random() * instanceCount);
  if (list[errorIndex]) {
    list[errorIndex].status = 3;
    list[errorIndex].title = (85 + Math.random() * 15).toFixed(2) + '%';
  }

  return list;
}

function getInstances(appId) {
  return instanceMap[appId];
}

module.exports = { randomInstance, getInstances };