<template>
  <div class="space-status">
    <!-- tooltip -->
    <x-chartip :min-width="100" :max-width="100" ref="chartip" no-arrow>
      <div slot="content" class="space-size">{{ selectedSpace }}: {{ selectedSpaceSize }}</div>
    </x-chartip>

    <!-- smaller spaces -->
    <div class="smaller-spaces" :style="`height: ${100 - largerHeight}%;`">
      <div
        v-for="(small, index) in smallers"
        :ref="`smaller-${index}`"
        :key="index"
        class="small-space-wrapper"
        :style="`width: ${small.width}%;` + (index !== 0 ? 'padding-left: 1px;' : '')"
      >
        <!-- unused smaller space -->
        <div
          class="used-space-wrapper"
          :style="`height: ${100 - small.usedHeight}%;background-color: ${small.color};`"
        >
          <div
            class="used-space"
            @mousemove="mousemove('small_unused_space' ,$event, small, index)"
            @mouseleave="mouseleave"
          ></div>
        </div>

        <!-- used smaller space -->
        <div
          class="smaller-space"
          :style="`height: ${small.usedHeight}%;background-color: ${small.color};`"
          @mousemove="mousemove('small_used_space' ,$event, small, index)"
          @mouseleave="mouseleave"
        ></div>
      </div>
    </div>

    <!-- larger spaces -->
    <div class="larger-space-wrapper" :style="`height: ${largerHeight}%;`">
      <!-- unused larger space -->
      <div
        class="used-space-wrapper"
        :style="`height: ${100 - largerUsedHeight}%;background-color: ${largerColor};`"
      >
        <div
          class="used-space"
          @mousemove="mousemove('large_unused_space' ,$event)"
          @mouseleave="mouseleave"
        ></div>
      </div>

      <!-- used larger space -->
      <div
        class="larger-space"
        :style="`height: ${largerUsedHeight}%;background-color: ${largerColor};`"
        @mousemove="mousemove('large_used_space' ,$event)"
        @mouseleave="mouseleave"
      ></div>
    </div>
  </div>
</template>

<script>
import spaceStatusModule from "@/javascripts/analytics/gc/SpaceStatus";

export default {
  props: {
    data: Array,
    before: Array,
    height: Number
  },

  data() {
    return {
      colors: {
        old_space: "#f4d03f",
        new_space: "#30bfd9",
        map_space: "#646faa",
        large_object_space: "#8995d9",
        code_space: "#d4668c",
        read_only_space: "#ffc900",
        new_large_object_space: "#9b59b6",
        code_large_object_space: "#2ecc71"
      },
      selectedSpace: undefined,
      selectedSpaceSize: undefined
    };
  },

  ...spaceStatusModule
};
</script>

<style scoped>
.space-status {
  height: 100%;
}

.smaller-spaces {
  transition: height 0.1s ease;
  display: flex;
}

.small-space-wrapper {
  height: 100%;
}

.smaller-space {
  height: 100%;
  transition: width 0.1s ease;
  cursor: pointer;
}

.larger-space-wrapper {
  height: 100%;
  padding-top: 1px;
}

.larger-space {
  transition: height 0.1s ease;
  cursor: pointer;
}

.used-space-wrapper {
  border-bottom: 1px solid #ffffff;
}

.used-space {
  transition: height 0.1s ease, width 0.1s ease;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.5) 3px,
    rgba(255, 255, 255, 0.5) 6px
  );
  height: 100%;
  cursor: pointer;
}

.smaller-space:hover,
.larger-space:hover,
.used-space:hover {
  transition: opacity 0.1s ease-in;
  opacity: 0.7;
}

.space-size {
  padding: 5px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>