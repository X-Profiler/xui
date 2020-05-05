<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="contacts_loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="contacts_load_error" :message="contacts_load_error"></x-error-message>

      <transition name="slide-noward">
        <x-contacts-settings v-if="!contacts_loading && !contacts_load_error"></x-contacts-settings>
      </transition>
    </div>

    <div class="x-modal-footer">
      <Button v-show="!contacts_loading" type="primary" ghost @click="closeContactsModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import contactsModule from "@/javascripts/alarm/contacts/ContactsIndex";
import xContactsSettings from "@/components/alarm/contacts/ContactsSettings";

export default {
  components: {
    "x-contacts-settings": xContactsSettings
  },

  ...contactsModule
};
</script>