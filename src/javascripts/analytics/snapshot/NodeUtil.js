"use strict";

export default class NodeUtil {
  constructor(parser) {
    this.parser = parser;

    this.first_int = -1;
    this.second_int = -1;
    this.lazy_string_map = {};
    this.lazy_sorted_edge_map = {};
  }

  static get NodeTypes() {
    return {
      KHIDDEN: 0,
      KARRAY: 1,
      KSTRING: 2,
      KOBJECT: 3,
      KCODE: 4,
      KCLOSURE: 5,
      KREGEXP: 6,
      KNUMBER: 7,
      KNATIVE: 8,
      KSYNTHETIC: 9,
      KCONCATENATED_STRING: 10,
      KSLICED_STRING: 11
    };
  }

  getConsStringName(id) {
    const parser = this.parser;
    const lazy_string_map = this.lazy_string_map;
    const { KCONCATENATED_STRING } = NodeUtil.NodeTypes;

    const strings = parser.strings;
    if (lazy_string_map[id])
      return lazy_string_map[id];

    // max length
    const node_stack = new Array(128).fill(0);
    node_stack[0] = id;
    let length = 1;
    let name = "";
    while (length > 0 && name.length < 256) {
      const index = node_stack[--length];
      if (this.getTypeForInt(index) != KCONCATENATED_STRING) {
        const cons = strings[parser.nodes[index * parser.node_field_length + parser.node_name_offset]];
        name += cons;
        continue;
      }
      const edges = this.getEdges(index);
      const edge_count = this.getEdgeCount(index);
      let first_node_index = -1;
      let second_node_index = -1;
      for (let i = 0; i < edge_count; i++) {
        const edge = edges[i];
        const edge_type = parser.edge_util.getTypeForInt(edge, true);
        if (edge_type == parser.EdgeUtil.EdgeTypes.KERNAL) {
          if (this.first_int != -1 && this.second_int != -1) {
            const edge_name = parser.edge_util.getNameOrIndexForInt(edge, true);
            if (edge_name == this.first_int)
              first_node_index = parser.edge_util.getTargetNode(edge, true);
            if (edge_name == this.second_int)
              second_node_index = parser.edge_util.getTargetNode(edge, true);
          } else {
            const edge_name = parser.edge_util.getNameOrIndex(edge, true);
            if (edge_name == "first") {
              first_node_index = parser.edge_util.getTargetNode(edge, true);
              this.first_int = parser.edge_util.getNameOrIndexForInt(edge, true);
            }
            if (edge_name == "second") {
              second_node_index = parser.edge_util.getTargetNode(edge, true);
              this.second_int = parser.edge_util.getNameOrIndexForInt(edge, true);
            }
          }
        }
      }

      if (second_node_index != -1)
        node_stack[length++] = second_node_index;
      if (first_node_index != -1)
        node_stack[length++] = first_node_index;
    }

    lazy_string_map[id] = name;
    return name;
  }

  checkOrdinalId(oridnal) {
    const parser = this.parser;
    return oridnal < parser.node_count;
  }

  getNodeId(source) {
    const parser = this.parser;
    const node_field_length = parser.node_field_length;
    if (source % node_field_length != 0) {
      throw new Error("node source id is wrong!");
    }
    return source / node_field_length;
  }

  getAddress(id) {
    const parser = this.parser;
    return parser.nodes[id * parser.node_field_length + parser.node_address_offset];
  }

  getType(id) {
    const parser = this.parser;
    const type = parser.nodes[id * parser.node_field_length + parser.node_type_offset];
    const types = parser.node_types;
    // with type "undefined", total 13
    if (type > (types.length - 1)) {
      return "undefined";
    }
    return types[type];
  }

  getTypeForInt(id) {
    const parser = this.parser;
    return parser.nodes[id * parser.node_field_length + parser.node_type_offset];
  }

  getName(id) {
    const parser = this.parser;
    return parser.strings[parser.nodes[id * parser.node_field_length + parser.node_name_offset]];
  }

  getNameForInt(id) {
    const parser = this.parser;
    return parser.nodes[id * parser.node_field_length + parser.node_name_offset];
  }

  getEdges(id) {
    const parser = this.parser;
    const first_edge_index = parser.first_edge_indexes[id];
    let next_first_edge_index = 0;
    if (id + 1 >= parser.node_count) {
      next_first_edge_index = parser.edges.length;
    } else {
      next_first_edge_index = parser.first_edge_indexes[id + 1];
    }
    const edges = new Array((next_first_edge_index - first_edge_index) / parser.edge_field_length);
    for (let i = first_edge_index; i < next_first_edge_index; i += parser.edge_field_length) {
      edges[(i - first_edge_index) / parser.edge_field_length] = i;
    }
    return edges;
  }

  getSortedEdges(id) {
    const lazy_sorted_edge_map = this.lazy_sorted_edge_map;
    const parser = this.parser;

    const retained_sizes = parser.retained_sizes;

    if (lazy_sorted_edge_map[id]) {
      return lazy_sorted_edge_map[id];
    }
    const edges = this.getEdges(id);
    edges.sort((o, n) => {
      const ot = parser.edge_util.getTargetNode(o, true);
      const nt = parser.edge_util.getTargetNode(n, true);
      return retained_sizes[ot] < retained_sizes[nt] ? 1 : -1;
    });
    lazy_sorted_edge_map[id] = edges;
    return edges;
  }

  getEdgeCount(id) {
    const parser = this.parser;
    return parser.nodes[id * parser.node_field_length + parser.node_edge_count_offset];
  }

  getSelfSize(id) {
    const parser = this.parser;
    return parser.nodes[id * parser.node_field_length + parser.node_self_size_offset];
  }
}