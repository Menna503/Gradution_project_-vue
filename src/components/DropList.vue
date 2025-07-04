<template>
  <v-form class=" d-flex flex-column " style="gap:24px;">  
    <Pagetitle title="Setting"/>

    <label for="lang" class="font-weight-semibold  text-neutral text-body-1">Select Language</label>
    <v-autocomplete
    style="height: 56px;width: 400px;"

      v-model="selected"
      :items="items"
      label="To"
       variant="outlined"
       id="lang"

      hide-details
      hide-no-data
   
      single-line
    ></v-autocomplete>

    <label for="curr" class="font-weight-semibold text-neutral text-body-1">Select Currency</label>
    <v-autocomplete
    id="curr"
    style="height: 56px;width: 400px;"

      v-model="Select_Currency"
      :items="Currency"
      label="To"
       variant="outlined"
      hide-details
      hide-no-data
     
      single-line
    ></v-autocomplete>
  </v-form>
</template>
<script setup>
import { ref } from "vue";
import Pagetitle from "./Pagetitle.vue";

const items = ["English", "Arabic"];
const Currency = ["EGP", "$"];
const selected = ref(["English"]);
const Select_Currency = ref(["EGP"]);
</script>
