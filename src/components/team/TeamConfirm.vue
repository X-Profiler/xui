<template>
  <div>
    <x-modal
      ref="confirm"
      :title="confirmData.title"
      :padding="0"
      @canceled="closeConfirmModal"
      hide-footer
    >
      <x-confirm-content slot="content"></x-confirm-content>
    </x-modal>
  </div>
</template>

<script>
import teamConfirmModule from "@/javascripts/team/TeamConfirm";
import xConfirmContent from "@/components/team/ConfirmContent";

export default {
  components: {
    "x-confirm-content": xConfirmContent
  },

  data() {
    return {
      modalQueryKey: "operation-confirm"
    };
  },

  ...teamConfirmModule
};
</script>