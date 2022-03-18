<template>
  <div>
    <v-container class="d-flex flex-wrap justify-center">
      <v-card
        class="ma-3"
        width="344"
        v-for="film of filme.filter((el) => !el.isDeleted)"
        :key="film.id"
      >
        <v-img :src="film.img" height="200px"></v-img>

        <v-card-title> {{ film.name }} </v-card-title>

        <v-card-subtitle>
          <v-rating
            background-color="warning lighten-1"
            color="warning"
            hover
            length="5"
            readonly
            v-model="film.stars"
          ></v-rating>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="grey" text :to="`/film/${film.id}`"> Details </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    filme: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
