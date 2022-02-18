<template>
  <v-easy-camera v-model="picture" fullscreen="false" mustApprove="true"  ></v-easy-camera>
</template>

<script>
import EasyCamera from "easy-vue-camera";

export default {
  data() {
    return {
      picture: "",
    };
  },
  components: {
    "v-easy-camera": EasyCamera,
  },
};
</script>

<style lang="scss" scoped></style>
