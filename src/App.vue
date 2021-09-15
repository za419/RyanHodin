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

        <q-toolbar-title> Ryan Hodin </q-toolbar-title>

        <div>
          Software Engineer, fiction writer, lover extraordinaire, and
          exaggerator
        </div>
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
        <q-item clickable tag="router-link" to="/blog/0">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog Article 0</q-item-label>
            <q-item-label caption>Subtitle here</q-item-label>
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

export default {
  name: "LayoutDefault",

  components: { ContactSection },

  data(): Record<string, unknown> {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style lang="scss">
.left {
  float: left;
}

.right {
  margin-left: 300px;
}

.no-underline {
  text-decoration: none;
}

.underline {
  text-decoration: underline;
}
</style>
