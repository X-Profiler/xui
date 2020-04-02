<template>
  <div>content</div>
</template>

<script>
import xContent from "@/javascripts/file/list/Content";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  ...xContent
};
</script>