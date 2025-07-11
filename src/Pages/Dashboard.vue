<script setup>
import Card from '../components/Card.vue';
import Chart from '../components/Chart.vue'; // You might not need Chart if only displaying cards
import Pagetitle from '../components/Pagetitle.vue';
import { onMounted, ref, computed } from 'vue';
// import { useCustomerStore } from '../store/CustomerStore'; // Unused import
// import { useOrderStore } from '../store/OrderStore'; // Unused import
import axios from 'axios';

const status = ref('');
const token = localStorage.getItem("token");

const carddata = ref(null);
const results = ref(0); // This seems to be a generic 'results' count, let's rename for clarity if needed or remove if not used.
const numberOfOrders = ref(0);
const totalRevenue = ref(0);
const newCustomers = ref(0); // This implies only *new* customers, but the request is for *total* customers. We'll adjust based on actual data.
const newProducts = ref(0); // This implies only *new* products, but the request is for *available* products. We'll adjust based on actual data.

// Assuming your API call will return these directly or they can be derived
const totalCustomers = ref(0); // For total customers
const availableProducts = ref(0); // For available products

// Variables for chart data (keeping them in case you want to re-introduce charts later)
const usersactive = ref(0);
const usersinactive = ref(0);
const uservip = ref(0);
const userstotal = ref(0);

onMounted(async () => {
  try {
    status.value = 'loading';
    // It's crucial that your backend '/api/orders' endpoint
    // actually returns the Total Customers and Available Products.
    // If not, you might need separate API calls or modify the existing one.
    const response = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });

    carddata.value = response.data;

    // Assuming the API response contains these exact keys:
    numberOfOrders.value = carddata.value.numberOfOrders || 0;
    totalRevenue.value = carddata.value.totalRevenue || 0;
    totalCustomers.value = carddata.value.userCount || 0; // Assuming 'userCount' is your total customers
    availableProducts.value = carddata.value.availableProducts || 0; // Assuming your API returns 'availableProducts'

    // Keeping chart data variables just in case
    usersactive.value = carddata.value.userActive || 0;
    usersinactive.value = carddata.value.userInActive || 0;
    uservip.value = carddata.value.userVip || 0;
    userstotal.value = carddata.value.userCount || 0; // Make sure this is total users for charts


    status.value = 'success'; // Set status to success
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    status.value = 'error'; // Set status to error
    // Optionally, set default values or display an error message
    NumberOfOrders.value = 0;
    totalRevenue.value = 0;
    totalCustomers.value = 0;
    availableProducts.value = 0;
  }
});

// Computed properties for chart data (still here, but not rendered in the template below)
const activechart = computed(() => [usersactive.value, userstotal.value - usersactive.value]);
const inactivechart = computed(() => [usersinactive.value, userstotal.value - usersinactive.value]);
const vipchart = computed(() => [uservip.value, userstotal.value - uservip.value]);

// Updated: Card data will now show the requested metrics
const card = computed(() => [
  { title: 'Total Revenue', datafetch: `${totalRevenue.value} EGP`, img: '/icons/card1_icon.svg' },
  { title: 'Total Orders', datafetch: `${numberOfOrders.value} Orders`, img: '/icons/card2_icon.svg' },
  { title: 'Available Products', datafetch: `${availableProducts.value} Products`, img: '/icons/card3_icon.svg' },
  { title: 'Total Customers', datafetch: `${totalCustomers.value} Customers`, img: '/icons/card4_icon.svg' },
]);
</script>

<template>
  <div class="bg-success">
    <div
      class="pt-4 "
      style="padding-left: 88px; padding-right: 88px; height: 100vh"
      
    >
      <v-sheet class="text-start bg-success mb-4">
        <Pagetitle title="Dashboard" />
      </v-sheet>

      <div v-if="status === 'loading'" class="d-flex justify-center align-center" style="height: calc(100vh - 150px);">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <span class="ml-2">Loading dashboard data...</span>
      </div>
      <div v-else-if="status === 'error'" class="d-flex justify-center align-center text-red" style="height: calc(100vh - 150px);">
        Failed to load dashboard data. Please try again later.
      </div>

      <div v-else>
        <v-row justify="center" no-gutters style="margin-bottom: 40px;">
          <Card
            v-for="(item, index) in card"
            :key="index"
            :title="item.title"
            :datafetch="item.datafetch"
            :img="item.img"
          />
        </v-row>

        </div>
    </div>
  </div>
</template>

<style scoped>
/* Any specific styles for your dashboard, if needed */
/* For example, if you want to ensure consistent spacing or alignment */
</style>