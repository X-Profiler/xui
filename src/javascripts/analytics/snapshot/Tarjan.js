"use strict";

export default class Tarjan {
  constructor({ inbounds, outbounds, count, root }) {
    this.root = root;
    this.inbounds = inbounds;
    this.outbounds = outbounds;
    const length = this.length = count + 1;

    this.dfs = new Array(length);
    this.vertex = new Array(length);
    this.semi = new Array(length);
    this.parent = new Array(length);
    this.bucket = new Array(length);
    this.dom = new Array(length);

    this.ancestor = new Array(length);
    this.label = new Array(length);
    this.size = new Array(length);
    this.child = new Array(length);

    this.idominator = new Array(length);
    this.dominators = {};

    for (let i = 0; i < length; i++) {
      this.dfs[i] = 0;
      this.vertex[i] = null;
      this.semi[i] = i;
      this.parent[i] = 0;
      this.bucket[i] = [];
      this.ancestor[i] = 0;
      this.label[i] = i;
      this.size[i] = 1;
      this.child[i] = 0;
      this.dom[i] = 0;
    }

    this.size[0] = 0;
  }

  releaseMemory(time = 5) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async compute() {
    this.enumerate();
    await this.build();

    this.dfs = null;
    this.semi = null;
    this.parent = null;
    this.bucket = null;
    this.ancestor = null;
    this.label = null;
    this.size = null;
    this.child = null;
    this.inbounds = null;
    this.outbounds = null;
    await this.releaseMemory(50);

    for (let i = 0; i < this.length; ++i) {
      this.idominator[i] = null;
    }

    for (let i = 1; i < this.dom.length; i++) {
      if (i % 50000 === 0) {
        await this.releaseMemory();
      }
      if (this.dom[i] === 0)
        continue;

      const dominator = this.vertex[this.dom[i]];
      const block = this.vertex[i];

      const list = this.dominators[dominator];
      if (Array.isArray(list)) {
        list.push(block);
      } else {
        this.dominators[dominator] = [block];
      }

      this.idominator[block] = dominator;
    }

    this.vertex = null;
    this.dom = null;
    await this.releaseMemory(50);
  }

  enumerate() {
    const queue = [this.root, 0];
    let dfs = 1;

    while (queue.length !== 0) {
      const parent = queue.pop();
      const block = queue.pop();
      if (this.dfs[block] !== 0)
        continue;

      this.dfs[block] = dfs;
      this.parent[dfs] = parent;
      this.vertex[dfs] = block;

      const successors = this.outbounds[block];
      if (Array.isArray(successors)) {
        for (let i = successors.length - 1; i >= 0; i--) {
          const succ = successors[i];
          queue.push(succ, dfs);
        }
      }

      dfs++;
    }
  }

  async build() {
    const dfs = this.dfs;
    const vertex = this.vertex;
    const semi = this.semi;
    const bucket = this.bucket;
    const parent = this.parent;
    const dom = this.dom;

    for (let w = dfs.length - 1; w >= 2; w--) {
      if (w % 50000 === 0) {
        await this.releaseMemory();
      }

      const predecessors = this.inbounds[vertex[w]];
      if (Array.isArray(predecessors)) {
        for (let i = 0; i < predecessors.length; i++) {
          const v = dfs[predecessors[i]];
          const u = this.evaluate(v);

          if (semi[u] < semi[w])
            semi[w] = semi[u];
        }
      }

      bucket[semi[w]].push(w);
      this.link(parent[w], w);

      const parentBucket = bucket[parent[w]];
      while (parentBucket.length !== 0) {
        const v = parentBucket.pop();
        const u = this.evaluate(v);

        if (semi[u] < semi[v])
          dom[v] = u;
        else
          dom[v] = parent[w];
      }
    }

    for (let w = 2; w < dfs.length; w++)
      if (dom[w] !== semi[w])
        dom[w] = dom[dom[w]];
    dom[1] = 0;
  }

  evaluate(v) {
    const ancestor = this.ancestor;
    const label = this.label;
    const semi = this.semi;


    if (ancestor[v] === 0)
      return label[v];

    this.compress(v);

    if (semi[label[ancestor[v]]] >= semi[label[v]])
      return label[v];
    else
      return label[ancestor[v]];
  }

  link(v, w) {
    const semi = this.semi;
    const label = this.label;
    const child = this.child;
    const size = this.size;
    const ancestor = this.ancestor;

    let s = w;

    while (semi[label[w]] < semi[label[child[s]]]) {
      if (size[s] + size[child[child[s]]] >= 2 * size[child[s]]) {
        ancestor[child[s]] = s;
        child[s] = child[child[s]];
      } else {
        size[child[s]] = size[s];
        ancestor[s] = child[s];
        s = ancestor[s];
      }
    }

    label[s] = label[w];
    size[v] += size[w];

    if (size[v] < 2 * size[w]) {
      const t = s;
      s = child[v];
      child[v] = t;
    }

    while (s !== 0) {
      ancestor[s] = v;
      s = child[s];
    }
  }

  compress(v) {
    const ancestor = this.ancestor;
    const semi = this.semi;
    const label = this.label;

    if (ancestor[ancestor[v]] === 0)
      return;

    this.compress(ancestor[v]);

    if (semi[label[ancestor[v]]] < semi[label[v]])
      label[v] = label[ancestor[v]];
    ancestor[v] = ancestor[ancestor[v]];
  }
}
