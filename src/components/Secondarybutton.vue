<template>
    <v-btn  variant="outlined" height="48" :width="width" class="d-flex flex-row justify-center align-center text-h5  font-weight-semibold  border-primary text-primary">
     <v-icon v-if="icon" class="bg-white pr-4" size="32" >
         {{ icon }}
     </v-icon>
  {{ title}}
 </v-btn>
 </template>
 
 
 <script setup>
   const {title,icon}=defineProps({
     title:{
         type:String,
     required:true
  
     },icon:{
         type:String,
         required:false
     }
 })
   
 </script>
 
 <style lang="scss" scoped>
 
 </style>
 
 
 
 