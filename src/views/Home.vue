<template>
  <div class="home">
    <h1 class="home-title">Ryan Hodin</h1>
    <h2 class="home-subtitle">Welcome to my personal website</h2>
    <div class="blog-preview-container">
      <h3 class="blog-preview-title">Blog</h3>
      <ul class="blog-preview-list">
        <li v-for="id in blogIDs" :key="id" class="blog-preview-list-root">
          <BlogItemPreview :id="id" navigationRoot="/blog/" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import BlogItemPreview from "@/components/BlogItemPreview.vue";
import { Component, Vue } from "vue-property-decorator";
import blogListing from "../../public/assets/blog/listing.json";

@Component({
  components: { BlogItemPreview },
})
export default class Home extends Vue {
  pageTitle = "Ryan Hodin";
  pageDescription = "The personal website of a programmer named Ryan Hodin";
  blogIDs = blogListing.map((post) => post.id);
}
</script>

<style lang="scss">
.home {
  width: 75%;
  max-width: 1250px;
  margin: 7px auto;

  .home-title {
    font-size: 4rem;
    line-height: 4rem;
  }

  .home-subtitle {
    font-size: 3rem;
    line-height: 3rem;
  }

  .blog-preview-container {
    display: inline-block;

    .blog-preview-title {
      font-size: 2rem;
      font-weight: 600;
      line-height: 2rem;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    .blog-preview-list {
      display: inline-block;
      height: 180px;
      overflow-x: hidden;
      overflow-y: auto;
      list-style-type: none;
      margin: 0;
      padding: 0;

      li.blog-preview-list-root {
        width: 100%;
        height: 90px;
        display: block;
      }
    }
  }
}
</style>
