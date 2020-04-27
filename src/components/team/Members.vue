<template>
  <div>
    <x-table :columns="columns" :data="members" noDataText="应用下暂无团队成员" no-data-head>
      <!-- user info -->
      <template v-slot:userInfo="{ row }">
        <div class="padding">{{ row.userInfo }}</div>
      </template>

      <!-- user status -->
      <template v-slot:status="{ row }">
        <div class="padding">{{ formatStatus(row.status) }}</div>
      </template>

      <!-- timestamp -->
      <template v-slot:timestamp="{ row }">
        <div class="padding">{{ formatTime(row.timestamp) }}</div>
      </template>

      <!-- operation -->
      <template v-slot:operation="{ row }">
        <div v-if="currentUserId === appOwnerId">
          <!-- inviting member -->
          <Button
            v-if="row.status === 1"
            type="warning"
            size="small"
            class="button-label"
            @click="cancelInvitation(row)"
          >撤回邀请</Button>
          <Button
            v-if="row.status === 1"
            type="warning"
            size="small"
            class="button-label second-button invisiable"
          >撤回邀请</Button>

          <!-- joined member -->
          <Button v-if="row.status === 2" type="info" size="small" class="button-label">转交应用</Button>
          <Button
            v-if="row.status === 2"
            type="error"
            size="small"
            class="button-label second-button"
          >移除成员</Button>
        </div>

        <div v-else>
          <Button
            v-if="row.userId === currentUserId"
            type="warning"
            size="small"
            class="button-label"
          >离开团队</Button>
        </div>
      </template>
    </x-table>
  </div>
</template>

<script>
import membersModule from "@/javascripts/team/Members";

export default {
  data() {
    return {
      columns: [
        { title: "成员信息", value: "userInfo", left: 23 },
        { title: "当前状态", value: "status", align: "center" },
        { title: "邀请 / 加入时间", value: "timestamp", align: "center" },
        { title: "团队操作", value: "operation", align: "center", width: 205 }
      ]
    };
  },

  ...membersModule
};
</script>

<style scoped>
.padding {
  padding: 4px 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #4d575f;
}

.button-group {
  display: flex;
}

.button-label {
  font-size: 12px;
}

.second-button {
  margin-left: 10px;
}

.invisiable {
  opacity: 0;
}
</style>