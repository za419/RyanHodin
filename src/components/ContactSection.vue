<template>
  <div class="host">
    <div class="basic-contact-row">
      <div class="left">
        <q-icon name="phone" /><a v-bind:href="'tel:' + phoneNumber">{{
          phoneNumber
        }}</a>
      </div>
      <div class="right">
        <q-icon name="mail" /><a v-bind:href="'mailto:' + email">{{ email }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactSection",
  data: (): Record<string, unknown> => {
    return {
      phoneNumber: "(012)345-6789",
      email: "address@example.com",
    };
  },
};
</script>

<style lang="scss">
.host {
  width: 40%;
  margin-left: 5%;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
