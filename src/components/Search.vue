<template>
    <div
      class="mx-auto"
    style="width: 600px;    
    "
    >
    
        <v-text-field
          :loading="loading"
          :model-value="modelValue"
             density="comfortable"
          append-inner-icon="mdi-magnify"
          :label='label'
          variant="solo"
          hide-details
          single-line
          @input="onInput"

        ></v-text-field>
    </div>
 
  </template>
  <script setup>
  

   const emit= defineEmits(['update:modelValue']);  
function onInput(e){
console.log(e.target.value)  
  emit('update:modelValue', e.target.value);

}
const props=defineProps({
  label:{
    type:String,
    required:true
  },modelValue:{
    type:String,
    required:true


  }

})

   


  </script>