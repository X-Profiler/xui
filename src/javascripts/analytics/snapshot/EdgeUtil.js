"use strict";

export default class EdgeUtil {
  constructor(parser) {
    this.parser = parser;
  }

  static get EdgeTypes() {
    return {
      KCONTEXTVARIABLE: 0,
      KELEMENT: 1,
      KPROPERTY: 2,
      KERNAL: 3,
      KHIDDEN: 4,
      KSHORTCUT: 5,
      KWEAK: 6
    };
  }

  getTargetNode(id, source) {
    const parser = this.parser;
    const edge_field_length = parser.edge_field_length;
    if (source && id % edge_field_length != 0) {
      throw ("edge source id is wrong!");
    }
    const edge_source_index = source ? id : id * edge_field_length;
    if (edge_source_index / edge_field_length >= parser.edge_count) {
      throw ("edge id larger than edges.length!");
    }
    const target_node_source_id = parser.edges[edge_source_index + parser.edge_to_node_offset];
    const node_field_length = parser.node_field_length;
    if (target_node_source_id % node_field_length != 0) {
      throw ("target node source id is wrong!");
    }
    return target_node_source_id / node_field_length;
  }

  GetType(id, source) {
    const parser = this.parser;
    const edge_field_length = parser.edge_field_length;
    if (source && id % edge_field_length != 0) {
      throw ("edge source id is wrong!");
    }
    const edge_source_index = source ? id : id * edge_field_length;
    if (edge_source_index / edge_field_length >= parser.edge_count) {
      throw ("edge id larger than edges.length!");
    }
    const type = parser.edges[edge_source_index + parser.edge_type_offset];
    const types = parser.edge_types;
    return types[type];
  }

  getTypeForInt(id, source) {
    const parser = this.parser;
    const edge_field_length = parser.edge_field_length;
    if (source && id % edge_field_length != 0) {
      throw ("edge source id is wrong!");
    }
    const edge_source_index = source ? id : id * edge_field_length;
    if (edge_source_index / edge_field_length >= parser.edge_count) {
      throw ("edge id larger than edges.length!");
    }
    return parser.edges[edge_source_index + parser.edge_type_offset];
  }

  getNameOrIndexForInt(id, source) {
    const parser = this.parser;
    const edge_field_length = parser.edge_field_length;
    if (source && id % edge_field_length != 0) {
      throw ("edge source id is wrong!");
    }
    const edge_source_index = source ? id : id * edge_field_length;
    if (edge_source_index / edge_field_length >= parser.edge_count) {
      throw ("edge id larger than edges.length!");
    }
    return parser.edges[edge_source_index + parser.edge_name_or_index_offset];
  }

  getNameOrIndex(id, source) {
    const parser = this.parser;
    const edge_field_length = parser.edge_field_length;
    if (source && id % edge_field_length != 0) {
      throw ("edge source id is wrong!");
    }
    const edge_source_index = source ? id : id * edge_field_length;
    if (edge_source_index / edge_field_length >= parser.edge_count) {
      throw ("edge id larger than edges.length!");
    }
    const type = parser.edges[edge_source_index + parser.edge_type_offset];
    const name_or_index = parser.edges[edge_source_index + parser.edge_name_or_index_offset];
    if (type == EdgeUtil.EdgeTypes.KELEMENT) {
      return "[" + name_or_index + "]";
    } else if (type == EdgeUtil.EdgeTypes.KHIDDEN) {
      return name_or_index;
    } else {
      return parser.strings[name_or_index];
    }
  }
}