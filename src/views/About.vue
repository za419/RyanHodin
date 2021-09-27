<template>
  <div class="about-root">
    <h4 class="title">About Ryan Hodin</h4>
    I'm not very good at writing about myself. Really.
    <p>
      If you don't believe me, here's an example - An edited version of an
      introduction I wrote a while ago.
    </p>
    <hr />
    I'm a 24-year-old software engineer working and living in Chicago - I
    graduated from Northwestern University with a degree in computer science.
    <p>
      Before college, I lived in Reno, NV, and I was born in Las Vegas. Both of
      my parents were immigrants (from different parts of the world no less), so
      I'm a first-generation American.
    </p>
    <hr />
    See, like I said - I'm pretty bad at this.<br />
    So let's try a different approach. Here's a list of facts about me, in no
    particular order:
    <p></p>
    <ul>
      <li>I own a <strong>lot</strong> of plants.</li>
      <li>
        Most of my plants are <em>Tillandsia</em>, otherwise known as air
        plants.
      </li>
      <li>
        I also own some carnivorous plants - Two 'B52' cultivar Venus Flytraps,
        and two sundews.
      </li>
      <li>I'm running out of things to say...</li>
      <li>
        I've decided to leave it off here even though it's super lame, and come
        back if I think of more things.
      </li>
      <li>If you see this, it means I never came back with more things.</li>
    </ul>
    <h5 class="subtitle">About this website</h5>
    This is my personal website. A big part of why I made it was because I heard
    of
    <a href="https://vuejs.org/" title="Vue.js">Vue.js</a>, and I wanted to give
    it a try, and maybe also refresh my (extremely rusty and rather minimal) web
    development skillset. Seriously, last time I made a website on my own, it
    was using absolutely no framework, targeting pre-ES5 Javascript and CSS2.<br />
    It was bad. And I hated working on it, so it never got finished enough to go
    up on the open internet.
    <p>
      This site is developed with Vue, in Typescript and SCSS, and it uses
      <a href="https://quasar.dev/" title="Quasar">Quasar</a>
      as a design framework. So it's much nicer looking, I get more done per
      hour of work, and the whole thing is generally a better idea.
    </p>
    <p>
      If you would like to see it, the source code for this site is available
      <a
        href="https://github.com/za419/RyanHodin/"
        title="The source repository for this website on GitHub"
        >here.</a
      >
    </p>
    <p>
      Ultimately though, the point is for me to learn things. Like the
      <router-link to="/blogdev">blog generation system</router-link> I wrote,
      which is entirely client-side, uses a custom language, and is generally
      worse than statically processed Markdown in pretty much every way, but I
      thought it would be an interesting exercise to create such a thing, so I
      did. And maybe you'll enjoy yourself toying with this site too!
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, string> {
    return {
      pageTitle: "About Ryan Hodin",
      pageDescription:
        "A small bit of information about Ryan Hodin and this site",
    };
  },

  // Lifecycle - While we're mounted, request other components to save space below 500px width or 100vh height
  // (we have lots of content to display, and we want small screens to have room to display it)
  mounted() {
    document.body.classList.add(
      "space-saver-500px-wide",
      "space-saver-100vh-tall"
    );
  },
  beforeDestroy() {
    document.body.classList.remove(
      "space-saver-500px-wide",
      "space-saver-100vh-tall"
    );
  },
});
</script>

<style lang="scss">
.about-root {
  width: 75%;
  max-width: 1250px;
  margin: auto;

  p {
    margin-top: 1em;
  }

  h4.title,
  h5 .subtitle {
    margin: 1em 0;
  }

  h4 {
    margin: 1em 0;
  }
}

@media screen and (orientation: portrait) {
  .about-root {
    width: 85%;
  }
}

@media screen and (min-width: 1250px) {
  .about-root {
    font-size: 1.2em;
  }
}
</style>
