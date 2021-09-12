<template>
  <LiveBlogRenderer />
</template>

<script lang="ts">
import LiveBlogRenderer from "@/components/LiveBlogRenderer.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { LiveBlogRenderer },
})
export default class BlogIDE extends Vue {}
</script>
