<script setup>
const props = defineProps({
  datafetch: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});
</script>

<template>
  <v-col cols="10" md="3" class="pa-2" style="width:25%">
    <v-card :color="'white'" variant="elevated" class="mx-auto" style="border-radius: 10px;" elevation="4">
      <v-card-item>
        <div class="pa-3">
          <div class="text-h6 mb-1 d-flex align-center justify-space-between" style="font-weight: 600; font-size: 24px;">
            {{ title }}
            <div><img :src="img" alt="" /></div>
          </div>
          <div class="text-caption pl-1" style="color:#AAAAAA;">
            Last 30 days
          </div>
          <div class="text-h6 mt-5" style="font-weight: 600;">
            {{ datafetch }}
          </div>
        </div>
      </v-card-item>
    </v-card>
  </v-col>
</template>
