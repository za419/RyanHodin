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

  // From here down, we're duplicating FullBlogItem's styles, except custom for our dialog.
  .blog-specification-list-item {
    h4.blog-text-title {
      display: inline-block;
      margin: 0 1ch;
      font-size: 1.75em;
      line-height: 1.75em;
    }

    h5.blog-text-subtitle {
      display: inline-block;
      margin: 0 1ch;
      font-size: 1.5em;
      line-height: 1.5em;
    }

    h6.blog-text-minor-title {
      display: inline-block;
      margin: 0 1ch;
      font-size: 1.15em;
      line-height: 1.15em;
    }
  }
}
</style>
