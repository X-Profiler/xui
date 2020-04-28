<template>
  <div>
    <div
      v-for="(invitation, index) in invitations"
      :key="index"
      :style="index !== 0 ? 'margin-top: 13px' : ''"
    >
      <div class="invitation">
        <!-- confirm / reject -->
        <div class="button-group">
          <Button
            type="info"
            ghost
            class="button"
            :loading="invitation.rejectLoading"
            :disabled="invitation.confirmLoading"
            @click="rejectInvitation(invitation)"
          >谢绝邀请</Button>
          <Button
            type="info"
            class="button"
            style="margin-left: 8px"
            :loading="invitation.confirmLoading"
            :disabled="invitation.rejectLoading"
            @click="confirmInvitation(invitation)"
          >加入应用</Button>
        </div>

        <!-- invitation tips -->
        <div
          class="title"
        >您收到了来自应用 {{ invitation.appName }} (Owner: {{ invitation.ownerInfo }}) 的邀请！</div>
        <div class="sub-title">加入应用后您可以查看应用完整的监控数据、访问和分析性能文件以协助定位 Node.js 应用故障</div>
      </div>
    </div>
  </div>
</template>

<script>
import invitationsModule from "@/javascripts/Invitations";

export default {
  props: {
    invitations: Array
  },

  ...invitationsModule
};
</script>

<style scoped>
.invitation {
  text-align: left;
  padding: 10px;
  border: 1px solid rgb(33, 150, 243);
  background-color: rgb(33, 150, 243, 0.1);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
}

.title {
  font-weight: bold;
  font-size: 15px;
}

.sub-title {
  margin-top: 5px;
  font-size: 13px;
}

.button-group {
  position: absolute;
  top: 17px;
  right: 20px;
}

.button {
  font-size: 13px;
}
</style>