<script setup lang="ts">
import Primarybutton from '../components/Primarybutton.vue';
import Secondarybutton from '../components/Secondarybutton.vue';

</script>

<template>
  <v-app>
    <v-main class="d-flex justify-center align-center bg-sucess">
      <v-list class="d-flex flex-column justify-center align-center text-center">
        <v-img
          :aspect-ratio="1"
          src="/404-error.png"
          width="300"
        ></v-img>
        <v-item-title class="font-weight-bold text-h4 text-primary mt-6">
          oops, We couldn't Find That Page!
        </v-item-title>
        <v-subtitle class="text-h6 text-tertiary mt-2">
          The page you are looking for could not be found. Please try searching for it or contact us for help.
              </v-subtitle>
        <Primarybutton to="/" title="Go To Home" class="mt-6"/>
   
      </v-list>
    </v-main>
  </v-app>
</template>
