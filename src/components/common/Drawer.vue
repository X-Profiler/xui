<template>
  <div v-show="firstShow" ref="mask" v-dom-portal :class="'mask ' + (show ? 'display' : 'hidden')">
    <div ref="container" :class="'container ' + (show ? 'load' : 'leave')">
      <div class="wrapper">
        <div class="close" @click="close">
          <Icon class="close-icon" type="md-skip-backward" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstShow: false,
      show: false
    };
  },

  mounted() {
    this.mask = this.$refs.mask;
    this.container = this.$refs.container;
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

      if (!this.firstShow) {
        this.firstShow = true;
      }

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
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  /* overflow-x: hidden; */
}

.display {
  animation: display 0.3s ease;
  z-index: 1200;
}

.hidden {
  animation: hidden 0.3s ease;
  z-index: -9999;
  opacity: 0;
}

.load {
  animation: load 0.3s ease;
}

.leave {
  animation: leave 0.3s ease;
}

.wrapper {
  margin-left: 70px;
  width: calc(100% - 70px);
  height: 100%;
  position: relative;
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
}

.close-icon {
  margin-left: 6px;
  transform: rotate(180deg) scale(1);
  font-size: 21px;
  /* color: #2b7ab5; */
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

@keyframes display {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes hidden {
  0% {
    opacity: 1;
    z-index: 1200;
  }

  100% {
    opacity: 0;
    z-index: 1200;
  }
}

@keyframes load {
  0% {
    opacity: 0;
    transform: translateX(calc(50vw - 70px));
    z-index: 1200;
    /* transform: translateX(100vw); */
  }

  100% {
    opacity: 1;
    transform: translateX(0);
    z-index: 1200;
    /* transform: translateX(100vw); */
  }
}

@keyframes leave {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(calc(50vw - 70px));
  }
}
</style>