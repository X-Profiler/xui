<template>
  <transition name="drawer">
    <div v-show="show" class="mask" v-dom-portal>
      <transition name="drawer-container">
        <div v-if="show" class="container">
          <div class="wrapper">
            <div class="close" @click="close">
              <Icon class="close-icon" type="md-archive" />
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
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },

  methods: {
    open() {
      if (this.show) return;

      // diable touchmove
      const mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.body.style.poxition = "fixed";
      document.addEventListener("touchmove", mo, false);

      this.show = true;
    },

    close() {
      if (!this.show) return;

      // enable touchmove
      const mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", mo, false);

      this.show = false;
      this.$emit("close");
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 999;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.wrapper {
  margin-left: 70px;
  width: calc(100% - 70px);
  height: 100%;
  position: relative;
  font-family: "Titillium Web", "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  color: #373d41;
}

.close {
  position: fixed;
  left: 41px;
  top: 10px;
  height: 60px;
  width: 0;
  border-right: 30px solid #fff;
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: -999;
  color: #373d41;
}

.close-icon {
  margin-left: 3px;
  transform: rotate(270deg) scale(1);
  font-size: 22px;
}

.close:hover {
  color: white;
  border-right: 30px solid #2b7ab5;
  transition: border-right 0.2s ease-out;
}

.content {
  min-height: 100%;
  background-color: #fff;
}
</style>