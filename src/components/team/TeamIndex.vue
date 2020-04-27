<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line></x-dashboard-title>

    <!-- message -->
    <Alert class="x-alert tip" type="info">
      <div class="alert-group">
        <Icon style="color: #2376b7;`" type="ios-alert-outline" />
        <div
          class="alert-desc"
        >您可以将应用授权给其它成员进行管理，团队成员可以查看完整的应用监控数据，也可以访问生成的性能分析文件，方便协作定位 Node.js 应用故障</div>
      </div>
    </Alert>

    <!-- add new team member -->
    <div class="addition-wrapper">
      <div class="addition">
        <Input class="add-team-member" v-model="userId" placeholder="请输入需要邀请的用户 ID">
          <span slot="prepend">邀请新成员</span>
        </Input>

        <Button long type="info" class="addition-confirm">确认邀请</Button>
      </div>
    </div>

    <!-- show team members -->
  </div>
</template>

<script>
import teamModule from "@/javascripts/team/TeamIndex";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  data() {
    return {
      userId: undefined
    };
  },

  ...teamModule
};
</script>

<style scoped>
.tip {
  margin-top: 15px;
}

.addition-wrapper {
  position: relative;
}

.addition {
  position: absolute;
  right: 0;
  display: flex;
}

.add-team-member {
  width: 370px;
  flex-shrink: 0;
}

.addition-confirm {
  margin: 1px 0 0 15px;
  width: 95px;
}
</style>
