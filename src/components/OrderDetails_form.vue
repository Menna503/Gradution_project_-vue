<script setup>
import { computed, onMounted, ref } from 'vue';
import Order from './Order.vue';
import { useOrderStore } from '../Store/OrderStore';
  
const props = defineProps({
  orderId: String
});
const order = ref(null);
const store = useOrderStore()

const firstName = computed(() => order.value?.user?.firstName + ' ' +order.value?.user?.lastName  || '');
const email = computed(() => order.value?.user?.email || '');
const OrderDate = computed(() => order.value?.user?.createdAt || '');
const numberOfItems = computed(() => order.value?.items?.length || 0);
const address = computed(() => order.value?.shippingAddress || '');
const paymentMethod = computed(() => order.value?.paymentInfo?.method || '');
const orderPrice = computed(() => order.value?.totalPriceOrder || 0);
const status = computed(() => order.value?.status || '');

onMounted(async () => {
  const result = await store.fetchOrderById(props.orderId);
  order.value = result;
  console.log(result);
})

</script>
<template>
 <form class="mt-2 d-flex" style="margin-left: 88px;  margin-right: 44px; gap: 16px;">
  <!-- General Information -->
     <div class="mb-4"  style="width: 55%;">
      <div ref="form" width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg" style="border:solid 1px #80CCF9">
        <v-card-text class="pa-0 ">
        <div class="d-flex flex-column ">
          <h1 class="text-primary font-weight-regular mb-4 " style="font-size: 24px;">Customer Information</h1>
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;" >Customer Name</label>
          <v-text-field
            ref="firstName"
            v-model="firstName"
            variant="outlined"
            class="h-44"
            height="30"
            style="font-weight: 600;"
            disabled
            required
          />
      </div>
      <div class="d-flex flex-column ">
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Address</label>
          <v-text-field
            ref="address"
            v-model="address"
            variant="outlined"
            style="font-weight: 600;"
            disabled
            required
          />
      </div>
    
      <div class="d-flex flex-column ">
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Payment Method</label>
          <v-text-field
            ref="paymentMethod"
            v-model="paymentMethod"
            style="font-weight: 600;"
            disabled
            variant="outlined"
            required
          />
      </div>
      <div class="d-flex flex-column ">
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Customer Email</label>
          <v-text-field
            ref="email"
            v-model="email"
            style="font-weight: 600;"
            disabled
            variant="outlined"
            required
          />
      </div>    
      <div class="d-flex flex-column ">
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Order Date</label>
          <v-text-field
            ref="OrderDate"
            v-model="OrderDate"
            style="font-weight: 600;"
            disabled
            variant="outlined"
            required
          />
      </div> 
      <div class="d-flex flex-column ">
          <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;">Number Of Items</label>
          <v-text-field
            ref="numberOfItems"
            v-model="numberOfItems"
            style="font-weight: 600;"
            disabled
            variant="outlined"
            required
          />
      </div> 

        </v-card-text>
      </div>
    </div>

    
  <!-- section two -->
  <div class="d-flex flex-column" style="width: 50%; gap: 12px;" >

    <div ref="form" width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg d-flex justify-center" style="border:solid 1px #80CCF9; ">
        <v-card-text class="pa-0 d-flex flex-column" style="gap:10px; height: 500px; overflow:scroll">
            <div class="d-flex justify-space-between" style="gap: 30px;">
                <h1 class="text-primary font-weight-regular" style="font-size: 24px;">Order Items</h1>
                <h1 class="text-primary font-weight-regular mr-16" style="font-size: 24px;">{{ numberOfItems }} Items</h1>
            </div> 
           <template v-if="order && order.items">
             <Order v-for="item in order.items" :key="item._id" :item="item" />
          </template>
           
        </v-card-text>
      </div> 
  <!-- pricing and stock -->
  <div ref="form" width="100%" class="text-start py-2 pl-5 pr-5 rounded-lg" style="border:solid 1px #80CCF9">
    <v-card-text class="pa-0 d-flex flex-column">
      <h1 class="text-primary font-weight-regular mb-4 " style="font-size: 24px;">Pricing and Status</h1>
       <div class="d-flex justify-space-between" style="gap:20px">

        <div class="d-flex flex-column" style="width: 50%;">
        <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px;" >Order Price</label>
        <v-text-field
            ref="orderPrice"
            v-model="orderPrice"
            style="font-weight: 600;"
            disabled
            variant="outlined"
            required
          />
      </div>

      <div class="d-flex flex-column" style="width: 50%;">
        <label class="my-label text-body-1 font-weight-semibold "style="margin-bottom: -16px; background-color: white;" >Status</label>
        <v-text-field
            ref="status"
            v-model="status"
            style="font-weight: 600;"
            variant="outlined"
            required
          />
      </div>
    </div> 
    </v-card-text>
      </div>
     
      

    </div>

  </form>  
  </template>
  
  <style scoped lang="scss">
  ::v-deep(.v-field__field) {
  background-color: #dad9d9;
}
  .my-label{
    padding-bottom: 20px;
  }
  </style>

  

  