<template>
  <div>
    <x-tree :data="data"></x-tree>
  </div>
</template>

<script>
import containmentModule from "@/javascripts/analytics/snapshot/display/Containment";

export default {
  data() {
    return {
      data: [
        {
          title: "p1",
          expand: true,
          children: [
            {
              title: "p2",
              // expand: true,
              children: [
                { title: "p3", children: [{ title: "p6" }] },
                { title: "p4" },
                { title: "p5" },
              ],
            },
          ],
        },
      ],
    };
  },

  ...containmentModule,
};
</script>
