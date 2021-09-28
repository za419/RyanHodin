<template>
  <div class="blog-item-preview-root">
    <router-link
      v-if="navigationRoot"
      :to="navigationRoot + id"
      tag="a"
      class="blog-post-link"
    >
      <div class="header" v-html="header"></div>
      <q-icon
        name="arrow_right"
        color="green"
        size="30px"
        class="go-to-arrow"
      />
    </router-link>
    <div v-if="!navigationRoot" class="header" v-html="header"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { blogHeader } from "../blogToHtml";
import blogListing from "../../public/assets/blog/listing.json";

export default Vue.extend({
  props: {
    id: { type: Number, required: true },
    navigationRoot: { type: String, default: () => null },
  },
  name: "BlogItemPreview",
  computed: {
    header: function (): string {
      const description = blogListing.find((blog) => blog.id === this.id);
      if (description) {
        return blogHeader(description);
      }
      return "Warning: Could not find data for post " + this.id;
    },
  },
});
</script>

<style lang="scss">
.blog-item-preview-root {
  padding-right: 10px;
  height: 100px;
  width: 100%;

  h2.blog-entry-title {
    font-size: 1.2rem;
    line-height: 1.2rem;
    font-weight: 500;
    margin: 0 0 7px 0;
  }

  h3.blog-entry-subtitle {
    font-size: 1.1rem;
    line-height: 1.1rem;
    margin: 0 0 5px 0;
  }

  .blog-entry-author-date-row {
    font-weight: 300;

    .blog-entry-author {
      display: inline-block;
    }

    .blog-entry-date {
      float: right;
    }

    .blog-entry-date-text,
    .blog-entry-author-text {
      display: none;
    }
  }

  a.blog-post-link {
    text-decoration: none;
    position: relative;
    display: inline-block;
    width: 100%;

    // Quick trick to center this vertically
    // This makes a list of these appear evenly separated...
    // Otherwise, previews that end up with vertically shorter titles or subtitles would
    // be set apart from the others - Because they'd be at the top of a large space.
    top: 50%;
    transform: translateY(-50%);

    .go-to-arrow {
      position: absolute;
      margin: 0 -20px;
      right: 0;
      top: calc(50% - 15px);
    }
  }
}

@media (max-width: 550px) {
  .blog-item-preview-root {
    h2.blog-entry-title {
      font-size: 1.1rem;
      line-height: 1.1rem;
      font-weight: 500;
      margin: 0 0 5px 0;
    }

    h3.blog-entry-subtitle {
      font-size: 1rem;
      line-height: 1rem;
      margin: 0 0 3px 0;
    }

    .blog-entry-author-date-row {
      font-size: 0.9rem;
    }
  }
}
</style>
