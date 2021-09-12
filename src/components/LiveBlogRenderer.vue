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
    <div class="results" v-html="text"></div>
  </div>
</template>

<script lang="ts">
import { blogDataRenderer } from "../blogToHtml";

export default {
  name: "LiveBlogRenderer",
  data(): Record<string, string> {
    return {
      title: "",
      subtitle: "",
      source: "",
    };
  },
  asyncComputed: {
    text: async function (): Promise<string> {
      return await blogDataRenderer(
        this.title,
        this.subtitle,
        "You",
        new Date().toString(),
        this.source
      );
    },
  },
};
</script>

<style lang="scss">
.host {
  width: 75%;
  margin: 7px auto;

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
