<template>
  <div>
    <Modal
      class="x-modal"
      v-model="show"
      :mask-closable="false"
      :width="width"
      :footer-hide="hideFooter"
    >
      <!-- header -->
      <template slot="header">
        <div>
          <Icon class="modal-title-icon" :type="iconType" />
          <span style="user-select: none;">{{ title }}</span>
        </div>
      </template>

      <!-- closable -->
      <template slot="close">
        <Icon class="modal-title-close" type="md-close" />
      </template>

      <transition name="modal-content">
        <div v-if="show" :style="contentStyle">
          <!-- content -->
          <slot name="content"></slot>
        </div>
      </transition>

      <!-- footer -->
      <template slot="footer">
        <slot name="footer">
          <Button type="primary" ghost style="margin-right: 2px" @click="cancelModal">{{ cancel }}</Button>
          <Button type="primary" :loading="loading" @click="submitModal">{{ submit }}</Button>
        </slot>
      </template>
    </Modal>
  </div>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  data() {
    return {
      show: false
    };
  },

  props: {
    type: String,
    title: String,
    okText: String,
    okLoadingText: String,
    cancelText: String,
    loading: Boolean,
    width: Number,
    hideFooter: Boolean,
    padding: Number
  },

  methods: {
    showModal() {
      this.show = true;
    },

    cancelModal(emit) {
      this.show = false;
      if (emit) {
        this.$emit("canceled");
      }
    },

    submitModal() {
      if (this.loading !== false && this.loading !== true) {
        this.showModal = false;
      }
      this.$emit("submited");
    }
  },

  computed: {
    iconType() {
      let icon = "md-information-circle";
      if (this.type === "error") {
        icon = "md-alert";
      }
      if (this.type === "error") {
        icon = "md-close-circle";
      }
      return icon;
    },

    submit() {
      if (this.loading && this.okLoadingText) {
        return this.okLoadingText;
      }
      return this.okText || "确定";
    },

    cancel() {
      return this.cancelText || "取消";
    },

    contentStyle() {
      let style = "";

      let padding = 16;
      if (isNumber(this.padding)) {
        padding = this.padding;
      }
      style += "padding: " + padding + "px;";

      return style;
    }
  },

  watch: {
    show() {
      if (!this.show) {
        this.cancelModal(true);
      }
    }
  }
};
</script>