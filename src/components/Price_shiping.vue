<script setup>
  import Secondarybutton from '../components/Secondarybutton.vue';
  import Primarybutton from '../components/Primarybutton.vue';
</script>
<template>
    <div ref="form">
      <v-card-text class="pa-0 ">
      <div class="d-flex flex-column ">
        <h1 class="text-primary font-weight-regular mb-4 " style="font-size: 24px;">Pricing and Stock</h1>
        <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;" >Product Name</label>
        <v-text-field
          ref="Product_Name"
          v-model="Product_Name"
          :rules="[() => !!Product_Name|| 'This field is required']"
          variant="outlined"
          class="h-44"
          placeholder="ADIDAS IF1402 Deportivo"
          height="30"
          required
        />
    </div>
    <div class="d-flex flex-column ">
        <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Brand Name</label>
        <v-text-field
          ref="Brand_Name"
          v-model="Brand_Name"
          :rules="[() => !!Brand_Name|| 'This field is required']"
          variant="outlined"
          placeholder="ADIDAS"
          required
        />
    </div>
    
       
      </v-card-text>
       <!-- <Primarybutton title="Update Change" width="100vw"  /> -->
        <v-spacer />

      </div>
   
  </template>
  
  <style scoped lang="scss">
  .my-label{
    padding-bottom: 20px;
  }
  </style>

  

  