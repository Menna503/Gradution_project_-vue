<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import { usetoast } from "./Store/Toast";
import { storeToRefs } from "pinia";

const route = useRoute();
const toastinapp= usetoast();
const{Toast}=storeToRefs(toastinapp)
</script>

<template>
  <RouterView :key="route.name" />
  <v-snackbar
    v-model="Toast.show"
    :timeout="2000"
    :color="Toast.color"
      location=" top right"
      style="font-size: 24px;"
   
  >
    {{ Toast.message }}
  </v-snackbar>
</template>
<style lang="scss" scoped>
.v-snackbar {
  z-index: 9999;
}
</style>
