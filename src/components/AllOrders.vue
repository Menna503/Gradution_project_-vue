<script setup>
import { onMounted, ref } from 'vue';
import { useCustomerStore } from '../Store/CustomerStore';
import Order_ForAllOrder from './Order_ForAllOrder.vue';
import { useRoute } from 'vue-router';
 const route = useRoute();
 const CustomerId = route.params._id;

const Customer = ref(null);
const Customerstore = useCustomerStore()


onMounted(async () => {
  const result = await Customerstore.fetchCustomerById (CustomerId);
  Customer.value = result;
  console.log(result);
})

</script>
<template>
    <div class="mt-2 d-flex justify-center align-center " style="gap: 16px;">
      <div class="d-flex flex-column ml-15" style="width: 90%; gap: 12px;">
        <div ref="form" class="text-start m-auto py-2 px-8 rounded-lg d-flex justify-center" style="border: 1px solid #80CCF9; width: 100%;">
          <v-card-text class="pa-0 d-flex flex-column" style="gap: 10px; height: 680px; overflow:scroll; ">
            <div class="d-flex justify-space-between" style="gap: 30px; ">
              <h1 class="text-primary font-weight-regular" style="font-size: 24px;">Orders and Dates</h1>
              <h1 class="text-primary font-weight-regular mr-16" style="font-size: 24px;">   {{ Customer?.orders?.length || 0 }} Orders</h1>
            </div>
            <div class="d-flex flex-column" style="gap: 10px;">
             <template v-if="Customer && Customer.orders">
               <Order_ForAllOrder v-for="order in Customer.orders" :key="order._id" :item="order" />
             </template>
            </div>
            
           
          </v-card-text>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped lang="scss">
  ::v-deep(.v-field__field) {
  background-color: #dad9d9;
}
  .my-label{
    padding-bottom: 20px;
  }
  </style>

  

  