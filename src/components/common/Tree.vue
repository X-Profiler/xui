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
            v-if="!child.noChild"
            :ref="`dropIcon-${child.id}`"
            class="icon-rotate"
            :style="iconExpandStyle(child)"
            type="md-arrow-dropright"
          />
        </div>
        <div v-html="child.title"></div>
      </div>

      <transition name="slide-tree">
        <div class="child" v-if="child.expand">
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
            <Button size="small" type="primary" ghost class="remain"
              ><span>加载更多 &lt;{{ child.left }}&gt;</span></Button
            >
          </div>
        </div>
      </transition>
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
      if (tree.disabled) {
        return;
      }

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
  min-height: 26px;
}

.icon-translate {
  /* margin-right: 3px; */
  min-width: 16px;
}

.icon-rotate {
  transform: scaleY(1.2) scaleX(1.4);
  padding-bottom: 3px;
  color: #c0c4cc;
}

.child {
  overflow: hidden;
  background-color: transparent;
}

.remain {
  font-size: 12px;
  margin: 3px 0 5px 8px;
}
</style>
