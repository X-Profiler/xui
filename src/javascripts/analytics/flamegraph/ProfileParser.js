"use strict";

class CPULogParser {
  constructor(profile, limit, filter) {
    this._profile = profile;
    this._limit = limit;
    this._filter = filter;

    this._paths = [];
    this._time = 0;
    this._each = 0;

    this._last = [];
    this._tmp = {};
    this._nodes = {};

    this._top = [];
    this._bail = [];
  }

  static funcName(node, parent) {
    let n = node.functionName || "anonymous";
    if (node.url) n += " " + node.url + ":" + node.lineNumber;
    return {
      func: n,
      funcName: node.functionName || "anonymous",
      bailoutReason: node.bailoutReason,
      parent,
      url: node.url && `(${node.url} ${node.lineNumber})` || `(${node.lineNumber})`
    };
  }

  static byFramesLexically(a, b) {
    let i = 0;
    let framesA = a.frames.map(f => f.func);
    let framesB = b.frames.map(f => f.func);
    while (true) {
      if (!framesA[i]) return -1;
      if (!framesB[i]) return 1;
      if (framesA[i] < framesB[i]) return -1;
      if (framesB[i] < framesA[i]) return 1;
      i++;
    }
  }

  static sort(functions) {
    return functions.sort(CPULogParser.byFramesLexically);
  }

  _flow(frames) {
    let lenLast = this._last.length - 1;
    let lenFrames = frames.length - 1;
    let i;
    let lenSame;
    let k;

    for (i = 0; i <= lenLast; i++) {
      if (i > lenFrames) break;
      if (this._last[i].func !== frames[i].func) break;
    }

    lenSame = i;

    for (i = lenLast; i >= lenSame; i--) {
      k = this._last[i].func + ";" + i;
      this._nodes[k + ";" + this._time] = {
        func: this._last[i].func,
        funcName: this._last[i].funcName,
        bailoutReason: this._last[i].bailoutReason,
        url: this._last[i].url,
        parent: this._last[i].parent,
        depth: i,
        etime: this._time,
        stime: this._tmp[k].stime
      };
      this._last[i].stime = this._tmp[k].stime;
      this._last[i].etime = this._time;
      this._tmp[k] = null;
    }

    for (i = lenSame; i <= lenFrames; i++) {
      k = frames[i].func + ";" + i;
      this._tmp[k] = { stime: this._time };
    }
  }

  _processPath(path) {
    this._flow(path.frames);
    this._time += path.hitCount;
    this._last = path.frames;
  }

  _explorePaths(node, stack) {
    const parent = stack.length === 0 && { funcName: "-", mock: true } || stack[stack.length - 1];
    stack.push(CPULogParser.funcName(node, parent));
    // if (node.hitCount) {
    this._paths.push({ frames: stack.slice(), hitCount: node.hitCount });
    // }

    for (let i = 0; i < node.children.length; i++) {
      this._explorePaths(node.children[i], stack);
    }

    stack.pop();
  }

  _processPaths() {
    CPULogParser.sort(this._paths);
    for (let i = 0; i < this._paths.length; i++) {
      this._processPath(this._paths[i]);
    }

    this._flow([]);
  }

  _sampleInterval() {
    let startTime = this._profile.startTime;
    let endTime = this._profile.endTime;
    this._each = (endTime - startTime) / this._time * 1000;
  }

  _getResults() {
    const nodes = this._nodes;
    const each = this._each;
    const funcList = Object.keys(nodes).filter(f => !this._filter || this._filter(nodes[f].url, nodes[f].funcName));
    Object.keys(nodes).forEach(f => {
      const execTime = (nodes[f].etime - nodes[f].stime) * each;
      nodes[f].execTime = execTime;
      if (nodes[f].parent.mock) {
        nodes[f].percentage = "-";
      } else {
        const pExecTime = (nodes[f].parent.etime - nodes[f].parent.stime) * each;
        nodes[f].percentage = pExecTime && `${((execTime / pExecTime) * 100).toFixed(2)}%` || "100%";
      }
      nodes[f].parent = nodes[f].parent.funcName;
    });
    this._top = funcList.map(f => nodes[f]).sort((o, n) => Number(o.execTime) < Number(n.execTime) ||
      Number(o.execTime) === Number(n.execTime) && Number(o.depth) > Number(n.depth) ? 1 : -1)
      .filter((n, i) => i < Number(this._limit.top));
    this._bail = funcList.map(f => nodes[f]).filter(n => n.bailoutReason && n.bailoutReason !== "no reason");
  }

  process() {
    this._explorePaths(this._profile.head, []);
    this._processPaths();
    this._sampleInterval();
    this._getResults();
    return {
      nodes: this._nodes,
      time: this._time,
      each: this._each,
      top: this._top,
      bail: this._bail
    };
  }
}

const flamegraphConfig = {
  fonttype: "Verdana"     // font type
  , fontsize: 12            // base text size
  , imagewidth: "100%"          // max width, pixels
  , frameheight: 16.0          // max height is dynamic
  , fontwidth: 0.59          // avg width relative to fontsize
  , minwidth: 0.1           // min function width, pixels
  , countname: "samples"     // what are the counts in the data?
  , colors: "hot"         // color theme
  , bgcolor1: "#eeeeee"     // background color gradient start
  , bgcolor2: "#eeeeb0"     // background color gradient stop
  , timemax: Infinity      // (override the) sum of the counts
  , factor: 1             // factor to scale counts by
  , hash: true          // color by function name
  , titletext: "Flame Graph" // centered heading
  , nametype: "Function:"   // what are the names in the data?

  // below are not supported at this point
  , palette: false         // if we use consistent palettes (default off)
  , palette_map: {}            // palette map hash
  , pal_file: "palette.map" // palette map file name

  , removenarrows: true        // removes narrow functions instead of adding a 'hidden' class

  , profile: {
    shortStack: true
    , unresolveds: false
    , v8internals: false
    , v8gc: true
    , sysinternals: false
  }
};

export function fetchSvgRenderContext(profile, limit = 10, filter) {
  const cpuLogParser = new CPULogParser(profile, limit, filter);
  const parsed = cpuLogParser.process();
  const fconfig = flamegraphConfig;
  return {
    top: parsed.top,
    bail: parsed.bail,
    flamegraph: {
      fconfig,
      parsed: { nodes: parsed.nodes, time: parsed.time, each: parsed.each },
    }
  };
}