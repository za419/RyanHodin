<template>
  <div class="host">
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
.host {
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
    width: 85%;
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

@media screen and (min-width: 1250px) {
  .host {
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
