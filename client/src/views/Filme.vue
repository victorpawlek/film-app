<template>
  <div>
    <p>filme</p>
    <div style="width: 50%" ><Camera /></div>
    <v-container> </v-container>
  </div>
</template>

<script>
import Camera from "@/components/Camera.vue";
import axios from "axios";

export default {
  components: {
    Camera,
  },
  data() {
    return {
      filme: [],
    };
  },
  created() {
    this.getFilme();
  },
  methods: {
    async getFilme() {
      const a = await axios({ method: "GET", url: "http://localhost:3000/filme" });
      this.filme = a.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
