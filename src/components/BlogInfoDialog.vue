<template>
  <q-card class="blog-info-dialog-card">
    <q-card-section>
      <h3>Blog Item Styles:</h3>
      The following styles are available in blog posts:
    </q-card-section>
    <q-separator />
    <q-card-section>
      {{ informationList }}
    </q-card-section>
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

<style lang="scss"></style>
