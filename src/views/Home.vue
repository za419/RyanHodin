<template>
  <div class="home">
    <h1 class="home-title">Ryan Hodin</h1>
    <h2 class="home-subtitle">Welcome to my personal website</h2>
    <p>
      This is my personal website, full of generic content I wrote to have a
      little fun and experiment with different web design technology than I've
      used before.
    </p>
    <p>
      Here, you can find a
      <router-link tag="a" to="/privacy">Privacy Policy</router-link>, which
      states all the various ways in which I don't collect your data, as I did
      not even put in the work to make it possible to collect your data; A short
      page with some more information
      <router-link tag="a" to="/about">about me and about this site</router-link
      >; A &quot;blog&quot; with a few articles I wrote, so I could write a
      script to translate a markup language into HTML to be rendered as part of
      this site; And a
      <router-link tag="a" to="/blogdev"
        >tool to render that markup live</router-link
      >, since I made the language up myself and a tool to help me write it
      comes in handy. Source code for this website is available
      <a
        href="https://github.com/za419/RyanHodin"
        target="_blank"
        title="Github source repository: za419/RyanHodin"
        >on GitHub.</a
      >
    </p>
    <p>I hope you enjoy visiting!</p>
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
