import Vue from "vue";

// This mixin design taken from https://medium.com/@Taha_Shashtari/the-easy-way-to-change-page-title-in-vue-6caf05006863
function getTitle(vm: Vue) {
  const title = (
    vm as Vue & {
      pageTitle: string | (() => string);
    }
  ).pageTitle;
  if (title) {
    return typeof title === "function" ? title.call(vm) : title;
  }
}

export const TitleMixin = Vue.extend({
  methods: {
    updateTitle() {
      const title = getTitle(this);
      if (title) {
        document.title = title;
      }
    },
  },
  created() {
    this.updateTitle();
  },
  updated() {
    this.updateTitle();
  },
});

function getDescription(vm: Vue) {
  const description = (vm as Vue & { pageDescription: string | (() => string) })
    .pageDescription;
  if (description) {
    return typeof description === "function"
      ? description.call(vm)
      : description;
  }
}

export const DescriptionMixin = Vue.extend({
  methods: {
    updateDescription() {
      const description = getDescription(this);
      if (description) {
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        ) as Element & { content: string };
        metaDescription.content = description;
      }
    },
  },
  created() {
    this.updateDescription();
  },
  updated() {
    this.updateDescription();
  },
});
