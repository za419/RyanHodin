<template>
  <div class="host" v-html="text"></div>
</template>

<script lang="ts">
import blogRenderer from "../blogToHtml";
import blogListing from "../assets/blog/listing.json";

const data = { text: "Loading..." };

// Return the current HTML we should be displaying
async function getContents(): Promise<string> {
  await new Promise((r) => setTimeout(r, 3000));
  // Get the blog item. If it doesn't exist, print an error.
  const item = blogListing.find((blog) => blog.id === 0);
  if (!item) {
    return '<div class="error">Blog with id 0 does not exist.</div>';
  }

  const result = await blogRenderer(item);

  console.log(result);

  return result;
}

// When we can get the contents downloaded, place them in the component.
getContents().then((text) => (data.text = text));

export default {
  name: "FullBlogItem",
  data: (): Record<string, unknown> => {
    return data;
  },
};
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
  }

  .blog-text-image {
    margin: auto;
    width: 80%;
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
