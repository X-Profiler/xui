<template>
  <div>
    <!-- heap statistics -->
    <div class="section-title">进程堆信息</div>

    <x-heap style="margin-top: 5px;"></x-heap>

    <!-- javascripts stacks -->
    <div class="section-title" style="margin-top: 20px;">函数调用栈</div>
  </div>
</template>

<script>
import javascriptModule from "@/javascripts/analytics/diag/display/JavaScript";
import xHeap from "./Heap";

export default {
  components: {
    "x-heap": xHeap
  },

  ...javascriptModule
};
</script>