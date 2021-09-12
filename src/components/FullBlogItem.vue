<template>
  <div class="host" v-html="text"></div>
</template>

<script lang="ts">
import Vue from "vue";
import blogRenderer from "../blogToHtml";
import blogListing from "../../public/assets/blog/listing.json";

export default Vue.extend({
  props: { id: { type: Number, required: true } },
  name: "FullBlogItem",
  asyncComputed: {
    text: async function (): Promise<string> {
      // Get the blog item. If it doesn't exist, print an error.
      const item = blogListing.find((blog) => blog.id === this.id);
      if (!item) {
        return `<div class="error">Blog with id ${this.id} does not exist.</div>`;
      }

      return await blogRenderer(item);
    },
  },
});
</script>

<style lang="scss">
.host {
  width: 75%;
  margin: 7px auto;

  a .q-icon {
    color: black;
  }

  p {
    margin-top: 1em;
  }

  h2.blog-entry-title {
    font-size: 5rem;
    font-weight: 500;
    margin-bottom: 20px;
  }

  h3.blog-entry-subtitle {
    font-size: 2rem;
    margin-top: 10px;
  }

  .blog-entry-author-date-row {
    padding-bottom: 1rem;
    border-bottom: 6px groove gray;
    margin-bottom: 0.75em;
  }

  h4,
  h5,
  h6 {
    margin: 1em 0;
  }

  hr + h4,
  hr + h5,
  hr + h6 {
    margin-top: 0;
  }

  .blog-text-image-container {
    border: 1px solid black;
    margin: 0 auto 2em;
    padding: 5px;
    width: 60%;
    max-width: 750px;

    .blog-text-image {
      width: 100%;
    }

    .blog-text-image-caption {
      font-family: "Georgia", "Times New Roman", Times, serif;
      font-size: 1.1em;
      margin-left: 2px;
    }
  }
}
.left {
  float: left;
}
.right {
  margin-left: 300px;
}

@media screen and (min-width: 750px) {
  .blog-entry-author-date-row {
    padding-bottom: 0.5rem;

    .blog-entry-author {
      display: inline-block;
    }

    .blog-entry-date {
      float: right;
    }
  }
}
</style>
