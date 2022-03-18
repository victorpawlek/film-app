<template>
  <v-container>
    <v-row class="ma-3 justify-center">
      <v-text-field label="Filmname" v-model="name" placeholder="Filmname"></v-text-field>
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
        v-model="stars"
      ></v-rating>
    </v-row>
    <v-row class="ma-3 justify-center"><v-btn @click="makeFoto">Foto</v-btn></v-row>
    <v-row class="ma-3 justify-center"><img v-if="picture" :src="picture" alt="bild" /></v-row>
    <Camera v-if="camera" @close="camera = false" @approve="foto($event)" />
    <v-row class="ma-3 justify-center"><v-btn @click="getLocation">get</v-btn></v-row>
    <v-row class="ma-3 justify-center">
      <v-text-field label="Location" v-model="location" placeholder="Location"></v-text-field>
    </v-row>
    <iframe
      class="ma-3 justify-center"
      name="HTL Wien West Map"
      width="100%"
      height="450"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCHkGVnPhLIhwsDtFd_cx2pRjROfRtVmR8&q=${latitude},${longitude}`"
    ></iframe>
    <v-row class="ma-3 justify-center"><v-btn @click="createFilm">Create</v-btn></v-row>
  </v-container>
</template>

<script>
import Camera from "@/components/Camera.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Camera,
  },
  data() {
    return {
      name: "",
      latitude: 0,
      longitude: 0,
      camera: false,
      picture: "",
      location: "",
      stars: 0,
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    async createFilm() {
      await axios({
        method: "POST",
        url: "/filme",
        data: {
          name: this.name,
          stars: this.stars,
          location: this.location,
          latitude: this.latitude,
          longitude: this.longitude,
          img: this.picture,
        },
      });
      this.$router.push("/filme");
      this.$emit("relo");
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.position);
    },
    makeFoto() {
      this.camera = true;
    },
    foto(p) {
      console.log(p);
      this.picture = p;
      this.camera = false;
    },
    position(b) {
      const a = b;
      console.log(a.coords);
      this.latitude = a.coords.latitude;
      this.longitude = a.coords.longitude;
    },
  },
};
</script>
