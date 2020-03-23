<template>
  <table class="table" :style="getTableStyle">
    <thead class="table-background">
      <tr v-if="data && data.length">
        <th
          v-for="(column, index) in columns"
          :key="index"
          :style="getCellStyle(column)"
        >{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- no data -->
      <tr v-if="!data || !data.length">
        <td class="no-data" :colspan="columns.length">{{ noDataText || "暂无信息" }}</td>
      </tr>

      <!-- show data -->
      <tr v-for="(row, index) in data" :key="index" :class="getClasses(index)">
        <td
          class="row-data"
          v-for="(col, index) in columns"
          :key="index"
          :style="getCellStyle(col)"
        >
          <slot :name="col.value" :row="row">{{ row[col.value] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    columns: Array,
    data: Array,
    noDataText: String,
    hover: Boolean,
    stribe: Boolean,
    fontSize: [Number, String]
  },

  methods: {
    getCellStyle(column) {
      let style = "";
      if (column.width) {
        style += "width: " + column.width + "px;";
      }

      if (column.align) {
        style += "text-align: " + column.align + ";";
      }

      return style;
    },

    getClasses(index) {
      let classes = "";

      if (this.hover) {
        classes += "tr-hover ";
      }

      if (this.stribe && index % 2 === 1) {
        classes += "table-background ";
      }

      return classes;
    }
  },

  computed: {
    getTableStyle() {
      let style = "";
      if (this.fontSize) {
        if (isNumber(this.fontSize)) {
          style += "font-size: " + this.fontSize + "px;";
        } else {
          style += "font-size: " + this.fontSize + ";";
        }
      }

      return style;
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-top: 1px solid #e7e7e8;
  border-left: 1px solid #e7e7e8;
  border-right: 1px solid #e7e7e8;
  border-collapse: collapse;
  font-size: 13px;
}

.table-background {
  background-color: #f0f1f4;
  /* background-color: #f8f8f9; */
}

.table thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  text-align: left;
}

.table thead tr th {
  padding: 13px 15px;
  /* border-bottom: 1px solid #e7e7e8; */
}

.table tbody tr td {
  border-bottom: 1px solid #e7e7e8;
}

.table tbody .tr-hover:hover {
  transition: all 0.3s ease-out;
  background-color: #ebf7ff;
}

.no-data {
  text-align: center;
  padding: 13px 15px;
}

.row-data {
  text-align: left;
  padding: 13px 15px;
}
</style>

