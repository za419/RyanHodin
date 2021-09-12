import Vue from "vue";

// This mixin design taken from https://medium.com/@Taha_Shashtari/the-easy-way-to-change-page-title-in-vue-6caf05006863
function getTitle(vm: Vue) {
  const title = (vm.$options as { title: string | (() => string) }).title;
  if (title) {
    return typeof title === "function" ? title.call(vm) : title;
  }
}

export default Vue.extend({
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
});
