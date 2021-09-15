<template>
  <div class="full-blog-item-root live-blog-preview-root">
    <h3>Live Blog Post Preview</h3>
    <div class="meta-row">
      <input type="text" v-model="title" placeholder="Post title" />
      <input type="text" v-model="subtitle" placeholder="Post subtitle" />
    </div>
    <textarea
      class="contents"
      v-model="source"
      placeholder="Post contents"
    ></textarea>
    <div class="results">
      <div class="result-header" v-html="contents.header"></div>
      <div class="result-body" v-html="contents.body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { blogDataRenderer } from "../blogToHtml";

export default Vue.extend({
  name: "LiveBlogRenderer",
  data(): Record<string, string> {
    return {
      title: "",
      subtitle: "",
      source: "",
      pageTitle: "Live renderer for blog posts - Ryan Hodin",
      pageDescription:
        "Editable live preview in the custom blogpost language created for this website by Ryan Hodin",
    };
  },
  computed: {
    contents: function (): { header: string; body: string } {
      return blogDataRenderer(
        this.title,
        this.subtitle,
        "You",
        new Date().toString(),
        this.source
      );
    },
  },
});
</script>

<style lang="scss">
.live-blog-preview-root {
  h3 {
    margin: 12px 0;
  }

  .meta-row {
    width: 100%;
    display: flex;
    margin-bottom: 1vh;

    input {
      flex-grow: 1;

      &:first-child {
        margin-right: 1vh;
      }
    }
  }

  textarea {
    width: 100%;
    height: 20vh;
  }

  .results {
    height: 750px;
    width: 100%;
    overflow-y: auto;
  }
}
</style>
