<template>
  <div>
    <div
      class="tree"
      :style="marginLeft"
      v-for="(child, index) in data"
      :key="index"
      @click.stop="toggle(child)"
    >
      <div class="title">
        <div class="icon-translate">
          <Icon
            :ref="`dropIcon-${child.id}`"
            class="icon-rotate"
            :style="iconExpandStyle(child)"
            type="md-arrow-dropright"
          />
        </div>
        <div v-html="child.title"></div>
      </div>

      <!-- <transition name="slide-noward"> -->
      <div v-if="child.expand">
        <x-tree
          :data="child.children"
          :depth="depth + 1"
          @expandNode="expandNode"
        ></x-tree>
        <div
          v-if="child.more"
          :style="marginLeft"
          @click.stop="expandNode(child)"
        >
          +{{ child.left }}
        </div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },

    depth: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      inconDownStyle:
        "scaleX(1.2) scaleY(1.4) translateY(-1px) translateX(-2px) rotate(90deg)",
    };
  },

  methods: {
    toggle(tree) {
      this.$set(tree, "expand", !tree.expand);
      this.expandNode(tree);

      const dropIcon = this.$refs[`dropIcon-${tree.id}`][0];
      if (!dropIcon) {
        return;
      }
      if (tree.expand) {
        dropIcon.$el.style.transform = this.inconDownStyle;
        dropIcon.$el.style.transition = "transform 0.1s ease-out";
      } else {
        dropIcon.$el.style.transform = "scaleY(1.2) scaleX(1.4)";
      }
    },

    expandNode(tree) {
      this.$emit("expandNode", tree);
    },

    iconExpandStyle(tree) {
      return tree.expand ? `transform: ${this.inconDownStyle}` : "";
    },
  },

  computed: {
    marginLeft() {
      const marginLeft = this.depth * 5;
      return `margin-left: ${marginLeft}px;`;
    },
  },
};
</script>

<style scoped>
.tree {
  cursor: pointer;
  user-select: none;
  font-family: Menlo;
  font-size: 12px;
}

.title {
  display: flex;
  align-items: center;
}

.icon-translate {
  margin-right: 3px;
}

.icon-rotate {
  transform: scaleY(1.2) scaleX(1.4);
  padding-bottom: 3px;
  color: #c0c4cc;
}
</style>
