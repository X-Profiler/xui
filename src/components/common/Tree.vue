<template>
  <div>
    <div
      class="tree"
      :style="marginLeft"
      v-for="(child, index) in data.list"
      :key="index"
      @click.stop="toggle(child)"
    >
      <div
        class="title"
        @mouseenter.stop="mousemove(child)"
        @mouseleave.stop="mouseleave(child)"
      >
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
        <div v-show="child.showHidden" v-html="child.hiddenInfo"></div>
      </div>

      <transition name="slide-tree">
        <div class="child" v-if="child.expand">
          <x-tree
            :data="{ list: child.children }"
            :depth="depth + 1"
            :parent="child.id"
            @expandNode="expandNode"
            @showExtra="showExtra"
            @hiddenExtra="hiddenExtra"
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
    <div
      v-if="data.more"
      class="first-more-btn"
      @click.stop="expandParent(data)"
    >
      <Button size="small" type="primary" ghost class="remain"
        ><span>加载更多 &lt;{{ data.left }}&gt;</span></Button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({ list: [], more: false, lastIndex: 0, left: 0 }),
    },

    depth: {
      type: Number,
      default: 0,
    },

    parent: {
      type: Number,
      default: -1,
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

      const list = this.$refs[`dropIcon-${tree.id}`];
      if (!list) {
        return;
      }
      const dropIcon = list[0];
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

    expandParent(data) {
      this.$emit("expandParent", data);
    },

    iconExpandStyle(tree) {
      return tree.expand ? `transform: ${this.inconDownStyle}` : "";
    },

    mousemove(child) {
      if (this.parent === -1) {
        return;
      }
      this.$emit("showExtra", { parent: this.parent, child });
    },

    mouseleave(child) {
      if (this.parent === -1) {
        return;
      }
      this.$emit("hiddenExtra", { child });
    },

    showExtra(data) {
      this.$emit("showExtra", data);
    },

    hiddenExtra(data) {
      this.$emit("hiddenExtra", data);
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

.title:hover {
  background-color: #f5f7fa;
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

.first-more-btn {
  margin-left: -4px;
}
</style>
