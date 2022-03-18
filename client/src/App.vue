<template>
  <v-app>
    <v-app-bar app color="grey" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Film Marker"
          class="shrink mr-2"
          contain
          src="./assets/logo_film.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary right app>
      <v-list-item>
        <v-list-item-avatar>
          <!-- <v-img src="https://randomuser.me/api/portraits/men/77.jpg"></v-img> -->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Victor Pawlek</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/filme">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Filme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/createFilm">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>New Film</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-alert type="error" v-if="update">
          Es gibt ein Update für diese Seite. Bitte starte die App neu!
        </v-alert>
        <v-alert type="error" v-if="offline"> Du bist offline! </v-alert>
      </v-container>
      <router-view @deloff="deloff" :filme="filme" @relo="getFilme" />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { openDB } from "idb";

export default {
  data() {
    return {
      drawer: false,
      items: [],
      update: false,
      filme: [],
      db: null,
      offline: false,
    };
  },
  watch: {
    offline(off) {
      if (!off) {
        this.db.getAll("filme").then((e) => {
          const deleted = e.filter((el) => el.isDeleted);
          deleted.forEach((el) => this.deleteonline(el.id));
        });
        this.db.clear("filme").then(this.getindex());
      }
    },
  },
  async created() {
    window.addEventListener("online", () => (this.offline = false));
    window.addEventListener("offline", () => (this.offline = true));
    document.addEventListener("swUpdated", this.updateAvailable, { once: true });
    await this.getFilme();
    if (!window.indexedDB) alert("IndexedDB is not available!");
    this.db = await openDB("filmeDB", 1, {
      upgrade(db) {
        db.createObjectStore("filme", { keyPath: "id" });
      },
    });
    await this.getindex();
    this.offline = navigator.online;
  },
  methods: {
    async deloff(id) {
      console.log(id);
      const a = await this.db.get("filme", Number(id));
      a.isDeleted = true;
      this.db.put("filme", a);
      const b = this.filme.find((el) => el.id == id);
      b.isDeleted = true;
    },
    async deleteonline(id) {
      try {
        await axios({ method: "DELETE", url: `/filme/${id}` });
      } catch (e) {
        console.log(e.message);
      }
    },
    async getindex() {
      console.log(this.filme);

      for (const e of this.filme) {
        await this.db.put("filme", e);
      }
    },
    updateAvailable() {
      this.update = true;
    },
    async getFilme() {
      const a = await axios({ method: "GET", url: "/filme" });
      this.filme = a.data.map((el) => ({ ...el, isDeleted: false }));
    },
  },
};
</script>
