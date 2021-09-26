<template>
  <q-card class="blog-info-dialog-card">
    <q-card-section>
      <h4 class="blog-info-dialog-title">Blog Item Styles</h4>
      The following styles are available in blog posts:
    </q-card-section>
    <q-separator />
    <q-card-section v-html="informationList"> </q-card-section>
    <q-separator />
    <q-card-actions><q-btn flat>More information</q-btn></q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { blogItemUsageList } from "@/blogToHtml";
export default {
  name: "BlogInfoDialog",
  computed: {
    informationList(): string {
      return blogItemUsageList();
    },
  },
};
</script>

<style lang="scss">
.blog-info-dialog-card {
  .blog-info-dialog-title {
    margin: 0.75em 0;
  }
}
</style>
