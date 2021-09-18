<template>
  <div class="privacy-policy-root">
    <h2 class="title">Privacy Policy</h2>
    <div class="publish-date">Last updated: {{ lastUpdated }}</div>
    <div class="foreword">
      In plain terms, I do not collect <strong>any</strong> information from you
      when you visit this site.
      <p>
        In full (informal) terms: This site is hosted on Github Pages, which
        does not allow me to save any data on the server. It does not connect to
        any other server, except to fetch resources such as images - No data is
        sent from this site to any location I have control over.
      </p>
      <p>
        Pages also does not provide me with any statistics regarding who is
        viewing this site, or how many times it is viewed. I do not inject
        Google Analytics or another script which would collect that information
        from your browser either - In short, I know nothing more about you after
        you've seen this site compared to before you came here, neither as an
        individual or aggregated into a pool of however many people have seen
        this (I don't even know that much!).
      </p>
      <p>
        A more detailed, more formal description of this arrangement follows
        below:
      </p>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, string> {
    return {
      // Last updated datestamp: Update this whenever the policy changes
      // As if that's going to be often...
      lastUpdated: new Date(
        "Fri Sep 17 2021 19:36:42 GMT-0500"
      ).toLocaleDateString(undefined, { dateStyle: "long" }),
      pageTitle: "Privacy Policy - Ryan Hodin",
      pageDescription:
        "An in-depth description of all the personal information I don't collect.",
    };
  },
});
</script>

<style lang="scss">
.privacy-policy-root {
  width: 75%;
  max-width: 1250px;
  margin: auto;

  p {
    margin-top: 1em;
  }

  h2.title {
    margin-top: 1em;
    margin-bottom: 0.35em;
  }

  div.publish-date {
    margin-bottom: 2em;
    font-size: 0.95em;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.8);
  }

  div.foreword {
    margin-bottom: 1em;
  }
}

@media screen and (orientation: portrait) {
  .privacy-policy-root {
    width: 85%;
  }
}

@media screen and (min-width: 1250px) {
  .privacy-policy-root {
    font-size: 1.2em;
  }
}
</style>
