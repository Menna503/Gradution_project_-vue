<template>
   <v-btn  type="sumbit" color="primary" height="48" :width="width" class="d-flex flex-row justify-center align-center text-h6  font-weight-semibold text-success">
    <v-icon v-if="icon" color="success" size="32" class="pr-4" >
        {{ icon }}
    </v-icon>
 {{ title}}
</v-btn>
</template>


<script setup>
  const props=defineProps({
    width:{
        type:String||Number,
        required:true
    },
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



