<template>
  <div class="host">
    <div class="meta-row">
      <input type="text" v-model="title" placeholder="Post title" />
      <input type="text" v-model="subtitle" placeholder="Post subtitle" />
    </div>
    <textarea class="contents" placeholder="Post contents"></textarea>
    <div v-html="text"></div>
  </div>
</template>

<script lang="ts">
import { BlogDescription } from "../app.types";
import blogRenderer from "../blogToHtml";

export default {
  name: "LiveBlogRenderer",
  data(): Record<string, string> {
    return {
      title: "Blog Title",
      subtitle: "Blog Subtitle",
    };
  },
  asyncComputed: {
    text: async function (): Promise<string> {
      const description: BlogDescription = {
        id: -1,
        title: this.title,
        subtitle: this.subtitle,
        author: "You",
        published: new Date().toString(),
      };
      return await blogRenderer(description);
    },
  },
};
</script>

<style lang="scss">
.host {
  width: 75%;
  margin: 7px auto;

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
    height: 50vh;
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
