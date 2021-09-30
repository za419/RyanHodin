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
    <div class="other-projects-container">
      <h3 class="other-projects-title">Some other things I've worked on</h3>
      <div class="other-projects">
        <q-card square>
          <figure class="other-project">
            <a href="https://cadenceradio.com/" target="_blank"
              ><picture>
                <source type="image/webp" srcset="/assets/CadenceRadio.webp" />
                <img
                  class="other-project-image"
                  loading="lazy"
                  src="/assets/CadenceRadio.png"
                  title="Cadence Radio: A Rhythmic Experience"
                  alt="Screenshot of the Cadence Radio website" /></picture
            ></a>
            <figcaption class="other-project-caption">
              <a href="https://cadenceradio.com/" target="_blank"
                >Cadence Radio</a
              >, a project by
              <a href="https://kenellorando.com" target="_blank"
                >Ken Ellorando</a
              >, is an internet radio with an interface allowing multiple themes
              and user-provided song requests. It has been through several
              redesigns and rewrites, each of which I have contributed to in
              varying amounts.
            </figcaption>
          </figure>
        </q-card>
        <q-card square>
          <figure class="other-project">
            <a href="https://github.com/za419/Cadencebot/" target="_blank"
              ><picture
                ><source
                  type="image/webp"
                  srcset="/assets/CadenceBot-large.webp" />
                <img
                  class="other-project-image"
                  loading="lazy"
                  src="/assets/CadenceBot-large.png"
                  title="CadenceBot: Discord bot for Cadence Radio"
                  alt="Screenshot of some interaction with CadenceBot" /></picture
            ></a>
            <figcaption class="other-project-caption">
              <a href="https://github.com/za419/Cadencebot/" target="_blank"
                >CadenceBot</a
              >
              is a Discord bot which allows for control and playback of Cadence
              Radio within a Discord server. It can play the stream, announce
              what song is playing, submit requests for songs, and it supports
              several unrelated commands specific to Discord. I manage the
              project, and I have contributed the vast majority of the code for
              it, in addition to hosting the production instance.
            </figcaption>
          </figure>
        </q-card>
        <q-card square>
          <figure class="other-project">
            <a href="https://github.com/za419/reddit-news/" target="_blank"
              ><picture
                ><source type="image/webp" srcset="/assets/reddit-news.webp" />
                <img
                  class="other-project-image"
                  loading="lazy"
                  src="/assets/reddit-news.png"
                  title="Reddit News: EECS 338 project for Northwestern University"
                  alt="Screenshot of analysis results for an /r/news post about Joe Biden's victory in the US Presidential Election of 2020" /></picture
            ></a>
            <figcaption class="other-project-caption">
              <a href="https://github.com/za419/reddit-news/" target="_blank"
                >Reddit News</a
              >
              was a group project for EECS 338 at Northwestern University,
              wherein I wrote the majority of the code. The goal of the project
              was to use natural language processing to compare keywords found
              in an article to those found in the comments to a corresponding
              Reddit post - The concept being that it would be possible to have
              a sense of the progression of the conversation about the given
              topic. It was not developed beyond presenting lists of those
              keywords.
            </figcaption>
          </figure>
        </q-card>
        <q-card square>
          <figure class="other-project">
            <a href="https://github.com/za419/Hero/" target="_blank"
              ><picture
                ><source type="image/webp" srcset="/assets/hero-1.webp" />
                <img
                  class="other-project-image"
                  loading="lazy"
                  src="/assets/hero-1.png"
                  title="Hero: A toy Version Control System"
                  alt="Screenshot of some partial self-hosting as a demo of Hero's capability and behavior" /></picture
            ></a>
            <figcaption class="other-project-caption">
              <a href="https://github.com/za419/Hero/" target="_blank">Hero</a>
              (named for Herodotus) is a toy
              <a
                href="https://en.wikipedia.org/wiki/Version_control"
                target="_blank"
                title="Wikipedia article for version control"
                >Version Control System</a
              >
              that I wrote, largely out of boredom. I haven't developed it
              enough to be used seriously, but Hero supports a full minimal set
              of features - Commit-based tracking of previous versions of a file
              structure, with timestamps and descriptions attached, generation
              of a log of all previous versions, and checkout of a previous
              version by its hash. There is some ability to create a branch
              within it, but branches cannot currently be named or merged back
              into the primary branch.
            </figcaption>
          </figure>
        </q-card>
      </div>
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

  // Lifecycle - While we're mounted, request other components to save space below 100vh height
  // (we have lots of content to display, and we want small screens to have room to display it)
  mounted(): void {
    document.body.classList.add("space-saver-50em-tall");
  }
  beforeDestroy(): void {
    document.body.classList.remove("space-saver-50em-tall");
  }
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

    // Little trick to center this even though it's inline-block...
    // First, scoot the div right by half the container width.
    position: relative;
    left: 50%;

    // Then, scoot it left by half this element's width.
    transform: translateX(-50%);

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
        height: 100px;
        display: block;
      }
    }
  }

  .other-projects {
    width: 100%;

    .q-card {
      width: 100%;
      max-width: 1000px;
      margin: auto;
      margin-bottom: 1em;

      .other-project {
        width: 100%;
        margin: 0;

        .other-project-image {
          width: 100%;
          margin: auto;
          display: block;
        }

        .other-project-caption {
          margin: 1ch;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .home .other-project-caption {
    font-size: 1.1em;
  }
}

@media (min-width: 1000px) {
  .home .other-project-caption {
    font-size: 1.2em;
  }
}
</style>
