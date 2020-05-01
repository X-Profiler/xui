<template>
  <div>
    <!-- message -->
    <Alert class="x-alert tip" type="info">
      <div class="alert-group">
        <Icon style="color: #2376b7;`" type="ios-alert-outline" />
        <div class="alert-desc">
          <span>规则</span>
          <code class="expression">&nbsp;{{ contactsData.expression }}&nbsp;</code>
          <span>联系人信息</span>
        </div>
      </div>
    </Alert>

    <!-- contacts -->
    <div class="alarm-section">已添加联系人</div>
    <x-table :columns="contactsColumns" :data="contacts" noDataText="规则下未添加告警联系人" no-data-head>
      <!-- user info -->
      <template v-slot:userInfo="{ row }">
        <div class="content">{{ row.userInfo }}</div>
      </template>

      <!-- operation -->
      <template v-slot:operation="{ row }">
        <Button
          class="button"
          type="info"
          ghost
          size="small"
          :loading="row.loading"
          @click="remove(row)"
        >移出联系人列表</Button>
      </template>
    </x-table>

    <!-- remain members -->
    <div class="alarm-section">可添加联系人</div>
    <x-table
      :columns="remainMemberColumns"
      :data="remainMembers"
      noDataText="没有剩余可添加的联系人"
      no-data-head
    >
      <!-- user info -->
      <template v-slot:userInfo="{ row }">
        <div class="content">{{ row.userInfo }}</div>
      </template>

      <!-- operation -->
      <template v-slot:operation="{ row }">
        <Button
          class="button"
          type="info"
          ghost
          size="small"
          :loading="row.loading"
          @click="add(row)"
        >添加至联系人项</Button>
      </template>
    </x-table>
  </div>
</template>

<script>
import contactsSettingsModule from "@/javascripts/alarm/contacts/ContactsSettings";

export default {
  data() {
    return {
      contacts: [],
      contactsColumns: [
        { title: "成员信息", value: "userInfo", left: 23 },
        { title: "操作", value: "operation", align: "center", width: 150 }
      ],
      remainMembers: [],
      remainMemberColumns: [
        { title: "成员信息", value: "userInfo", left: 23 },
        { title: "操作", value: "operation", align: "center", width: 150 }
      ]
    };
  },

  ...contactsSettingsModule
};
</script>

<style scoped>
.tip {
  margin-top: -15px;
}

.expression {
  color: #c45a65;
}

.alarm-section {
  text-align: left;
  font-size: 13px;
  font-weight: bold;
  margin: 10px 0;
}

.button {
  font-size: 12px;
}
</style>