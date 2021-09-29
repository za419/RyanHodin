<template>
  <q-card class="blog-info-dialog-card">
    <q-card-section>
      <h4 class="blog-info-dialog-title">Blog Item Styles</h4>
      The following styles are available in blog posts:
    </q-card-section>
    <q-separator />
    <q-card-section v-html="informationList"> </q-card-section>
    <q-separator />
    <q-card-actions
      ><router-link class="reset-text" to="/blogdevinfo" tag="a" target="_blank"
        ><q-btn flat>More information</q-btn></router-link
      ></q-card-actions
    >
  </q-card>
</template>

<script lang="ts">
import { blogItemUsageList } from "@/blogToHtml";
import Vue from "vue";
export default Vue.extend({
  name: "BlogInfoDialog",
  computed: {
    informationList(): string {
      return blogItemUsageList();
    },
  },
});
</script>

<style lang="scss">
.blog-info-dialog-card {
  .blog-info-dialog-title {
    margin: 0.75em 0;
  }

  // From here down, we're duplicating FullBlogItem's styles, except custom for our dialog.
  .blog-specification-list-item {
    // Special-case: Adjust underlines so it's more obvious what the trigger is
    u {
      display: inline-block;
      transform: translateY(5%);
      margin: 0 0.075ch;
    }

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

  .reset-text {
    text-decoration: unset;
    color: unset;
  }
}
</style>
