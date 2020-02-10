<template>
  <div>
    <Modal v-model="showModal" title="Common Modal dialog box title" :closable="false">
      <!-- header -->
      <template slot="header">
        <div>
          <Icon class="modal-title-icon" :type="iconType" />
          <span>{{ title }}</span>
        </div>
      </template>

      <!-- content -->
      <slot name="content"></slot>

      <!-- footer -->
      <template slot="footer">
        <Button type="primary" ghost style="margin-right: 2px" @click="cancelModal">{{ cancel }}</Button>
        <Button type="primary" :loading="loading" @click="submitModal">{{ submit }}</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },

  props: {
    show: Boolean,
    type: String,
    title: String,
    okText: String,
    okLoadingText: String,
    cancelText: String,
    loading: Boolean
  },

  methods: {
    cancelModal() {
      this.showModal = false;
      this.$emit("canceled");
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
    }
  },

  watch: {
    show() {
      this.showModal = this.show;
    },

    showModal() {
      this.$emit("status", this.showModal);
    }
  }
};
</script>