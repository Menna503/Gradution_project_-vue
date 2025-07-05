<script setup>
import { computed, onMounted, ref } from 'vue';
import Order from './Order.vue';
import { useOrderStore } from '../Store/OrderStore';
  
const props = defineProps({
  orderId: String,
  item: Object
});


</script>
<template>
    <div class="d-flex rounded-xl align-center" style="width:90%; gap:20px; background-color:#F3F3F3; padding: 25px;">
        <v-img
           :src="item.product.imageUrl"
            alt="Selected Image"
            class="image-placeholder rounded-xl"
            cover
            height="150"
            width="100"
          />
          <div class="d-flex flex-column" style="gap: 6px;">
            <span style="font-weight: 400; font-size:24px;">{{ item.product.name || 'No products' }}</span>
            <span  style="font-weight: 400;font-size:24px; color:#707070;">${{ item.product.price }}</span>
            <div class="d-flex" style="gap: 5px;">
                <v-chip variant="outlined" class="pa-5 rounded-lg" style="border: 2px solid #C0C0C0;  font-size: 20px;">{{ item.size || 'Size' }}</v-chip>
                <v-chip variant="outlined" class="pa-5 rounded-lg" style="border: 2px solid #C0C0C0; font-size: 20px; ">{{ item.color || 'Color' }}</v-chip>
                <v-chip variant="outlined" class="pa-5 rounded-lg" style="border: 2px solid #C0C0C0; font-size: 20px;">{{ item.quantity || 0 }}</v-chip>

            </div>
          </div>
          

    </div>
        
</template>