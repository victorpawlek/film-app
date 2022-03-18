<template>
  <div>
    <v-container>
      <v-row class="ma-3 justify-center">
        <v-text-field
          label="Filmname"
          v-model="name"
          readonly
          placeholder="Filmname"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-rating
          background-color="warning lighten-1"
          color="warning"
          :empty-icon="$mdiStarOutline"
          :full-icon="$mdiStar"
          :half-icon="$mdiStarHalfFull"
          hover
          length="5"
          readonly
          v-model="stars"
        ></v-rating>
      </v-row>
      <v-row class="ma-3 justify-center"><img v-if="picture" :src="picture" alt="bild" /></v-row>
      <v-row class="ma-3 justify-center">
        <v-text-field
          label="Location"
          v-model="location"
          readonly
          placeholder="Location"
        ></v-text-field>
      </v-row>
      <iframe
        class="ma-3 justify-center"
        width="100%"
        height="450"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCHkGVnPhLIhwsDtFd_cx2pRjROfRtVmR8&q=${latitude},${longitude}`"
      ></iframe>
      <v-row class="ma-3 justify-center"><v-btn @click="deleteFilm">Delete</v-btn></v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      stars: 0,
      latitude: 0,
      longitude: 0,
      picture: "",
      location: "",
    };
  },
  props: {
    id: {
      type: Number,
    },
    filme: {
      type: Array,
    },
  },
  methods: {
    async deleteFilm() {
      if (navigator.onLine) {
        await axios({ method: "DELETE", url: `/filme/${this.id}` });
        navigator.vibrate(400);
        this.$router.push("/filme");
        this.$emit("relo");
      } else {
        this.$emit("deloff", this.id);
        this.$emit("relo");
        navigator.vibrate(400);
        this.$router.push("/filme");
      }
    },
    getFilm() {
      const a = this.filme.find((el) => el.id == this.id);
      this.name = a.name;
      this.stars = a.stars;
      this.latitude = a.latitude;
      this.longitude = a.longitude;
      this.picture = a.img;
      this.location = a.location;
    },
  },
  created() {
    this.getFilm();
  },
};
</script>

<style lang="scss" scoped></style>
