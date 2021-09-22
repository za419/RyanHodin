<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title
          ><router-link tag="a" to="/" class="link-return-home">
            Ryan Hodin
          </router-link></q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item clickable tag="router-link" to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>A little bit of everything</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/about">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption
              >A little about the guy who made this</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/blogdev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog Renderer</q-item-label>
            <q-item-label caption>Live rendering of blog text</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item expand-separator icon="rss_feed" label="Blog Posts">
          <q-list>
            <q-item
              v-for="post in blogListing"
              :key="post.id"
              clickable
              tag="router-link"
              :to="'/blog/' + post.id"
            >
              <!-- Empty avatar for alignment - This makes this clearly a submenu. -->
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-item-label>{{ post.title }}</q-item-label>
                <q-item-label caption>{{ post.subtitle }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item clickable tag="router-link" to="/privacy">
          <q-item-section avatar>
            <q-icon name="privacy_tip" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Privacy Policy</q-item-label>
            <q-item-label caption
              >I don't collect any information, but click here to read more
              about it.</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer height-hint="100" elevated>
      <q-toolbar><ContactSection /></q-toolbar
    ></q-footer>

    <q-page-container><router-view></router-view></q-page-container>
  </q-layout>
</template>

<script lang="ts">
import ContactSection from "@/components/ContactSection.vue";
import blogListing from "../public/assets/blog/listing.json";

export default {
  name: "LayoutDefault",

  components: { ContactSection },

  data(): Record<string, unknown> {
    return {
      leftDrawerOpen: false,
      blogListing: blogListing.map((post) => {
        const htmlTags = /<.+?>/g;
        return {
          id: post.id,
          title: post.title.replaceAll("&nbsp;", " "),
          subtitle: post.subtitle
            .replaceAll("&nbsp;", " ")
            .replaceAll(htmlTags, ""),
        };
      }),
    };
  },
};
</script>

<style lang="scss">
@import "styles/quasar.variables.scss";

.no-underline {
  text-decoration: none;
}

.underline {
  text-decoration: underline;
}

.q-toolbar__title a.link-return-home {
  color: inherit;
  text-decoration: none;
  border-radius: 18px;
  padding: 5px;

  &:hover {
    background-color: darken($color: $primary, $amount: 2.5);
  }

  &:active {
    background-color: darken($color: $primary, $amount: 5);
  }
}
</style>
