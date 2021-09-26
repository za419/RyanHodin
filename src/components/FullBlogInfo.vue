<template>
  <div class="blog-info-host">
    <h4 class="blog-info-title">Blog Item Styles</h4>
    The following styles are available in blog posts:
    <q-separator />
    <div class="blog-info-contents" v-html="information"></div>
  </div>
</template>

<script lang="ts">
import { blogItemUsage } from "@/blogToHtml";
export default {
  name: "FullBlogInfo",
  computed: {
    information(): string {
      return blogItemUsage();
    },
  },
};
</script>

<style lang="scss">
.blog-info-host {
  width: 85%;
  max-width: 1250px;
  margin: auto;

  .blog-info-contents {
    margin-top: 2em;
  }
}
</style>
