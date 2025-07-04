<template>
  <div class="text-center"v-if="totalpage > 1">
 <v-pagination
  :model-value="page"
  :length="totalpage"
  :total-visible="itemperpage"
  @update:model-value="updatePage"  
></v-pagination>
  </div>
</template>

<script setup>
const emit= defineEmits(['update:page'])

const props=defineProps({
  totalpage:{
    type:Number,
    required:true
  },
  page:{
    type:Number,
    required:true
  },itemperpage:{
    type:Number,
    required:true
  }
})
function updatePage(val){
  emit('update:page',val)
  console.log(val);
  
}
</script>