<template>
  <div class="full-blog-item-root">
    <div class="header" v-html="contents.header"></div>
    <div class="navigation" v-if="navigationRoot != null">
      <div class="previous" v-if="lastID != null">
        <router-link class="no-underline" :to="navigationRoot + lastID"
          ><q-icon name="arrow_left" color="green" size="25px" /><span
            class="underline"
            >Older</span
          ></router-link
        >
      </div>
      <div class="next" v-if="nextID != null">
        <router-link class="no-underline" :to="navigationRoot + nextID"
          ><span class="underline">Newer</span
          ><q-icon name="arrow_right" color="green" size="25px"
        /></router-link>
      </div>
    </div>
    <div class="body" v-html="contents.body || 'Loading...'"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import blogRenderer from "../blogToHtml";
import blogListing from "../../public/assets/blog/listing.json";
import { BlogDescription } from "@/app.types";

export default Vue.extend({
  props: {
    id: { type: Number, required: true },
    navigationRoot: { type: String, default: () => null },
  },
  name: "FullBlogItem",
  asyncComputed: {
    contents: async function (): Promise<{ header: string; body: string }> {
      // Get the blog item. If it doesn't exist, print an error.
      if (!this.currentListing) {
        return {
          header: `<div class="error">Blog with id ${this.id} does not exist.</div>`,
          body: "",
        };
      }

      return await blogRenderer(this.currentListing);
    },
  },
  computed: {
    currentListing: function (): BlogDescription | undefined {
      return blogListing.find((blog) => blog.id === this.id);
    },
    lastID: function (): number | null {
      const minID = Math.min(...blogListing.map((item) => item.id));
      return this.id === minID ? null : this.id - 1;
    },
    nextID: function (): number | null {
      const maxID = Math.max(...blogListing.map((item) => item.id));
      return this.id === maxID ? null : this.id + 1;
    },
  },
  methods: {
    pageTitle: function (): string {
      if (this.currentListing) {
        return (
          this.currentListing.title +
          " - " +
          this.currentListing.author
        ).replaceAll("&nbsp;", " ");
      }
      return "Blog item viewer - Ryan Hodin";
    },
    pageDescription: function (): string {
      if (this.currentListing) {
        const htmlTags = /<.+?>/g;
        return (
          '"' +
          this.currentListing.title +
          ": " +
          this.currentListing.subtitle +
          '", by ' +
          this.currentListing.author
        )
          .replaceAll("&nbsp;", " ")
          .replaceAll(htmlTags, "");
      }
      return "Renders posts written in the custom blogpost language created for this website by Ryan Hodin";
    },
  },

  // Lifecycle - While we're mounted, request other components to save space below 500px width or 100vh height
  // (we have lots of content to display, and we want small screens to have room to display it)
  mounted() {
    document.body.classList.add(
      "space-saver-500px-wide",
      "space-saver-50em-tall"
    );
  },
  beforeDestroy() {
    document.body.classList.remove(
      "space-saver-500px-wide",
      "space-saver-50em-tall"
    );
  },
});
</script>

<style lang="scss">
.full-blog-item-root {
  width: 75%;
  max-width: 1250px;
  margin: 7px auto;

  .navigation {
    width: 100%;
    height: 30px;
    position: relative;

    .q-icon {
      margin: 0 -2px 2.5px;
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
    font-size: 1.2em;
    padding-bottom: 0.5rem;

    .blog-entry-author {
      display: inline-block;
    }

    .blog-entry-date {
      float: right;
    }
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

@media screen and (orientation: portrait) {
  .full-blog-item-root {
    width: 85%;
  }
}

@media screen and (max-width: 1100px) {
  .full-blog-item-root h2.blog-entry-title {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
}

@media screen and (max-width: 750px) {
  .full-blog-item-root {
    .blog-entry-date-text,
    .blog-entry-author-text {
      display: none;
    }

    h2.blog-entry-title {
      font-size: 2.25rem;
      line-height: 2.25rem;
    }

    h3.blog-entry-subtitle {
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
}

@media screen and (max-width: 400px) {
  .full-blog-item-root {
    word-wrap: break-word;
  }
}

@media screen and (min-width: 1250px) {
  .full-blog-item-root {
    font-size: 1.2em;

    h3.blog-entry-title {
      font-size: 3rem;
    }

    h4.blog-text-title {
      font-size: 2.5rem;
    }

    h5.blog-text-subtitle {
      font-size: 1.8rem;
    }

    h6.blog-text-minor-title {
      font-size: 1.5rem;
    }
  }
}
</style>
