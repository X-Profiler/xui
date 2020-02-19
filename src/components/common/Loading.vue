<template>
  <div>
    <!-- spin -->
    <div v-if="loadingType === 'spin'" v-show="loading" class="spin-loading" :style="style">
      <Spin :size="spinSize"></Spin>
    </div>

    <!-- dot -->
    <div v-if="loadingType === 'dot'" v-show="loading" class="dot-loading" :style="style">
      <div class="dot-pulse"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    top: Number,
    size: String,
    type: String
  },

  computed: {
    style() {
      let style = "";
      if (this.top && !isNaN(this.top)) {
        style += "margin-top: " + this.top + "px;";
      }
      return style;
    },

    spinSize() {
      let size = this.size || "large";
      if (!["large", "small"].includes(size)) {
        size = undefined;
      }
      return size;
    },

    loadingType() {
      let type = this.type || "spin";
      return type;
    }
  }
};
</script>

<style scoped>
.spin-loading {
  display: inline-block;
  position: relative;
}

.dot-loading {
  display: inline-block;
  position: relative;
}

.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccccd6;
  color: #ccccd6;
  box-shadow: 9984px 0 0 0 #ccccd6, 9999px 0 0 0 #ccccd6, 10014px 0 0 0 #ccccd6;
  animation: dotPulse 1.5s infinite linear;
}

@keyframes dotPulse {
  0% {
    box-shadow: 9984px 0 0 -5px #ccccd6, 9999px 0 0 0 #ccccd6,
      10014px 0 0 2px #ccccd6;
  }

  25% {
    box-shadow: 9984px 0 0 0 #ccccd6, 9999px 0 0 2px #ccccd6,
      10014px 0 0 0 #ccccd6;
  }

  50% {
    box-shadow: 9984px 0 0 2px #ccccd6, 9999px 0 0 0 #ccccd6,
      10014px 0 0 -5px #ccccd6;
  }

  75% {
    box-shadow: 9984px 0 0 0 #ccccd6, 9999px 0 0 -5px #ccccd6,
      10014px 0 0 0 #ccccd6;
  }

  100% {
    box-shadow: 9984px 0 0 -5px #ccccd6, 9999px 0 0 0 #ccccd6,
      10014px 0 0 2px #ccccd6;
  }
}
</style>