<template>
    <div class="mt-3" style="margin-left: 88px;  margin-right: 44px; ">

  <div class="d-flex" style="gap: 12px;">
        <div class="mb-4"  style="width: 55%;">
        <v-sheet width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg" style="border:solid 1px #80CCF9">
            <slot name="partTwo">Default content if nothing is passed</slot>
        </v-sheet>
        </div> 
        
     <div class="d-flex flex-column" style="width: 50%;" >
        <div class="mb-4 " >
        <v-sheet width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg" style="border:solid 1px #80CCF9">
            <slot name="partThree">Default content if nothing is passed</slot>
        </v-sheet>
        </div>

        <div class="mb-4" >
        <v-sheet width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg" style="border:solid 1px #80CCF9">
            <slot name="partFour">Default content if nothing is passed</slot>
        </v-sheet>
        </div>
    </div>
</div>
   
   


    
</div>
</template>


<script setup>
  
</script>

<style lang="scss" scoped>

</style>