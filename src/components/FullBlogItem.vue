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
  width: 500px;
  margin: 7px 5%;

  a .q-icon {
    color: black;
  }
}
.left {
  float: left;
}
.right {
  margin-left: 300px;
}
</style>
