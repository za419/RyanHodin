<template>
  <div class="blog-info-host">
    <h4 class="blog-info-title">Blog Item Styles</h4>
    The following styles are available in blog posts:
    <q-separator />
    <div class="blog-info-contents" v-html="information"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { blogItemUsage } from "@/blogToHtml";
export default Vue.extend({
  name: "FullBlogInfo",
  data() {
    return {
      pageTitle: "Blog item specification information",
      pageDescription:
        "A full description of all available styling for blog posts on this site.",
    };
  },
  computed: {
    information(): string {
      return blogItemUsage();
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
.blog-info-host {
  width: 85%;
  max-width: 1250px;
  margin: auto;

  .blog-info-contents {
    margin-top: 3em;
  }

  .blog-specification-usage {
    margin-bottom: 2em;

    .blog-specification-usage-text {
      font-family: monospace;
      font-size: 1.1em;
    }

    .blog-specification-usage-description {
      margin: 0;
      font-family: inherit;
      white-space: pre-wrap;
    }
  }
}

@media screen and (min-width: 750px) {
  .blog-info-host {
    font-size: 1.1em;

    .blog-specification-usage-text {
      font-size: 1.2em;
    }
  }
}

@media screen and (min-width: 1000px) {
  .blog-info-host {
    font-size: 1.2em;

    .blog-specification-usage-text {
      font-size: 1.3em;
    }
  }
}

@media screen and (min-width: 1500px) {
  .blog-info-host {
    font-size: 1.3em;

    .blog-info-title {
      font-size: 2.5rem;
    }

    .blog-specification-usage-text {
      font-size: 1.4em;
    }
  }
}
</style>
