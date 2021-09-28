<template>
  <div class="live-blog-preview-root">
    <h3>
      Live Blog Post Preview
      <q-btn flat class="info-button" @click="dialog = true">
        <q-icon name="info" size="1.5em"
      /></q-btn>
    </h3>
    <q-dialog v-model="dialog"><BlogInfoDialog /></q-dialog>
    <div class="meta-row">
      <input type="text" v-model="title" placeholder="Post title" />
      <input type="text" v-model="subtitle" placeholder="Post subtitle" />
    </div>
    <textarea
      class="contents"
      v-model="source"
      placeholder="Post contents"
    ></textarea>
    <div class="results full-blog-item-root">
      <div class="result-header" v-html="contents.header"></div>
      <div class="result-body" v-html="contents.body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { blogDataRenderer } from "../blogToHtml";
import BlogInfoDialog from "./BlogInfoDialog.vue";

export default Vue.extend({
  components: { BlogInfoDialog },
  name: "LiveBlogRenderer",
  data(): Record<string, string> {
    return {
      dialog: "",
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

  // Lifecycle - While we're mounted, request other components to save space below 500px width or 100vh height
  // (we have lots of content to display, and we want small screens to have room to display it)
  mounted() {
    document.body.classList.add(
      "space-saver-500px-wide",
      "space-saver-100vh-tall"
    );
  },
  beforeDestroy() {
    document.body.classList.remove(
      "space-saver-500px-wide",
      "space-saver-100vh-tall"
    );
  },
});
</script>

<style lang="scss">
.live-blog-preview-root {
  width: 85%;
  max-width: 1250px;
  margin: auto;

  h3 {
    margin: 12px 0;
  }

  .meta-row {
    width: 100%;
    display: flex;
    margin-bottom: 1vh;

    input {
      flex-grow: 1;
      max-width: calc(50% - 0.5vh);

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
    min-height: 5em;
    max-height: calc(77.5vh - 250px);
    width: 100%;
    overflow-y: auto;
  }
}

@media screen and (max-height: 1100px) {
  .live-blog-preview-root .results {
    max-height: calc(75vh - 250px);
  }
}

@media screen and (max-height: 30em) {
  .live-blog-preview-root {
    h3 {
      font-size: 2rem;
      line-height: 2rem;
      margin: 6px 0;
    }
  }
}
</style>
