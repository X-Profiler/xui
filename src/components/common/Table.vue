<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :style="getThStyle(column)"
        >{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- no data -->
      <tr v-if="!data || !data.length">
        <td class="no-data" :colspan="columns.length">{{ noDataText || "暂无信息" }}</td>
      </tr>

      <!-- show data -->
      <tr v-for="(row, index) in data" :key="index">
        <td class="row-data" v-for="(col, index) in columns" :key="index">
          <slot :name="col.value" :row="row">{{ row[col.value] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array,
    noDataText: String
  },

  methods: {
    getThStyle(column) {
      let style = "";
      if (column.width) {
        style = "width: " + column.width + "px";
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

.table thead {
  background-color: #f8f8f9;
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  text-align: left;
}

.table thead tr th {
  padding: 10px 15px;
  border-bottom: 1px solid #e7e7e8;
}

.table tbody tr td {
  border-bottom: 1px solid #e7e7e8;
}

.no-data {
  text-align: center;
  padding: 10px 15px;
}

.row-data {
  text-align: left;
  padding: 10px 15px;
}
</style>

