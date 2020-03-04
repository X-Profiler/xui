<template>
  <transition name="slide-drawer">
    <div v-show="show" class="mask">
      <transition name="slide-drawer-wrapper">
        <div v-show="show" class="wrapper">
          <div class="close" @click="close">
            <Icon style="margin-left: 5px;" type="md-play" />
          </div>
          <div class="content">
            <!-- header -->
            <div>
              <slot name="header"></slot>
            </div>

            <!-- content -->
            <div>
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.commit("closeDrawer");
    }
  },

  computed: {
    drawer() {
      return this.$store.state.drawer;
    },

    show() {
      return this.drawer.show;
    },

    data() {
      return this.drawer.data;
    }
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: scroll;
  z-index: 2000;
}

.wrapper {
  margin-left: 70px;
  width: 100%;
  position: relative;
  animation: load 0.2s;
}

.close {
  position: absolute;
  left: -25px;
  top: 15px;
  height: 60px;
  width: 0;
  border-right: 30px solid #fff;
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  z-index: -999;
}

.close:hover {
  border-right: 30px solid #e8eaec;
}

.content {
  min-height: 100%;
  background-color: #fff;
}

@keyframes load {
  0% {
    margin-left: calc(50vh - 70px);
    /* margin-left: 100vh; */
  }

  100% {
    margin-left: 70px;
  }
}
</style>