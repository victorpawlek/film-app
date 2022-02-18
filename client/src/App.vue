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

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/77.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/filme">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Filme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [],
    };
  },
};
</script>
