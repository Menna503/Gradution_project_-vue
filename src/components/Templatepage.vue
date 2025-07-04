<template>
  <div class="bg-success">
    <div
      class="pt-4"
      style="padding-left: 88px; padding-right: 88px; height: 100vh"
    >
      <div class="mb-4">
        <v-sheet class="text-start bg-success">
          <slot name="partone">TITLE ONE PART</slot>
        </v-sheet>
      </div>
      <div class="mb-4">
        <v-sheet width="100%" class="text-start">
          <slot name="parttwo">TITLE TWO PART</slot>
        </v-sheet>
      </div>
      <div class="mb-1">
        <v-sheet
          width="100%"
          style="height: 470px"
          class="text-start bg-success"
        >
          <template v-if="statusfetch === 'loading'">
            <slot name="Loading">
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                "
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="50"
                  width="5"
                />
              </div>
            </slot>
          </template>
          <template v-else-if="statusfetch === 'success'">
            <template v-if="length > 0">
              <slot name="partthree">TITLE THREE PART</slot>
            </template>
            <template v-else>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <slot name="empty">
                         <div class="d-flex flex-column justify-content-center align-items-center">
  <img src="/no product.svg" class="mx-auto" width="70%" />
  <v-item-title
    class="d-block text-primary font-weight-bold text-h5 pt-5 text-center"
    style="cursor: default"
  >
{{   title}}  
</v-item-title>
</div>
  
                </slot>
              </div>
            </template>
          </template>
          <template v-else>
            <div
              style="
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <slot name="error">
         <div class="d-flex flex-column justify-content-center align-items-center">
  <img src="/user (3).png" class="mx-auto" width="50%" />
  <v-item-title
    class="d-block text-primary font-weight-bold text-h5 pt-5 text-center"
    style="cursor: default"
  >
    Please reload the page or try again.
  </v-item-title>
</div>
              
          
            
              
              </slot>
            </div>
          </template>
        </v-sheet>
      </div>
      <div class="pb-4">
        <v-sheet class="text-start bg-success">
          <slot name="partfour">TITLE FOUR PART</slot>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  statusfetch: {
    type: String,
    default: "loading",
  },
  length: {
    type: Number,
    default: 0,
  

  },
  titlenodata: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true
  }
});
</script>

<style lang="scss" scoped></style>
