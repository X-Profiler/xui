<template>
  <div>
    <div
      class="tree"
      :style="marginLeft"
      v-for="(child, index) in data"
      :key="index"
      @click.stop="toggle(child)"
    >
      <div>
        {{ child.title }}
      </div>

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

  methods: {
    toggle(tree) {
      this.$set(tree, "expand", !tree.expand);
      this.expandNode(tree);
    },

    expandNode(tree) {
      this.$emit("expandNode", tree);
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
}
</style>
