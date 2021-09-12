<template>
  <div class="host">
    <div class="header" v-html="contents.header"></div>
    <div class="navigation" v-if="navigation">
      <div class="previous">
        <q-icon name="arrow_left" color="green" size="25px" /> Older
      </div>
      <div class="next">
        Newer <q-icon name="arrow_right" color="green" size="25px" />
      </div>
    </div>
    <div class="body" v-html="contents.body || 'Loading...'"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import blogRenderer from "../blogToHtml";
import blogListing from "../../public/assets/blog/listing.json";

export default Vue.extend({
  props: {
    id: { type: Number, required: true },
    navigation: { type: Boolean, default: () => false },
  },
  name: "FullBlogItem",
  asyncComputed: {
    contents: async function (): Promise<{ header: string; body: string }> {
      // Get the blog item. If it doesn't exist, print an error.
      const item = blogListing.find((blog) => blog.id === this.id);
      if (!item) {
        return {
          header: `<div class="error">Blog with id ${this.id} does not exist.</div>`,
          body: "",
        };
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

  .navigation {
    width: 100%;
    height: 30px;
    position: relative;

    .q-icon {
      margin: 0 -7px 2.5px;
    }

    .previous {
      position: absolute;
      left: 0;
    }

    .next {
      position: absolute;
      right: 0;
    }
  }

  a .q-icon {
    color: black;
  }

  p {
    margin-top: 1em;
  }

  h2.blog-entry-title {
    font-size: 5rem;
    line-height: 5rem;
    font-weight: 500;
    margin-bottom: 20px;
  }

  h3.blog-entry-subtitle {
    font-size: 2rem;
    margin-top: 10px;
  }

  .blog-entry-author-date-row {
    margin-bottom: 0.75em;
  }

  .blog-entry-body {
    border-top: 6px groove gray;
    padding-top: 1rem;
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

@media screen and (orientation: portrait) {
  .host {
    width: 95%;
  }
}

@media screen and (max-width: 1100px) {
  .host h2.blog-entry-title {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
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
