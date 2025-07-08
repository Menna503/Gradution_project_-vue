<script setup>
import Card from '../components/Card.vue';
import Chart from '../components/Chart.vue';
import Pagetitle from '../components/Pagetitle.vue';
import { onMounted, ref, computed } from 'vue';
import { useCustomerStore } from '../store/CustomerStore';
// import { useOrderStore } from '../store/OrderStore';
import axios from 'axios';

const status = ref('');
const token = localStorage.getItem("token");

const carddata = ref(null);
const results = ref(0);
const NumberOfOrders = ref(0);
const totalRevenue = ref(0);
const newCustomers = ref(0);
const newProducts = ref(0);

const usersactive = ref(0);
const usersinactive = ref(0);
const uservip = ref(0);
const userstotal = ref(0);

onMounted(async () => {
  try {
    status.value = 'loading';
    const response = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });

    carddata.value = response.data;

    results.value = carddata.value.results;
    NumberOfOrders.value = carddata.value.NumberOfOrders;
    totalRevenue.value = carddata.value.totalRevenue;
    newCustomers.value = carddata.value.newCustomers;
    newProducts.value = carddata.value.newProduct;

    usersactive.value = carddata.value.userActive;
    usersinactive.value = carddata.value.userInActive;
    uservip.value = carddata.value.userVip;
    userstotal.value = carddata.value.userCount;

  } catch (error) {
    console.error(error);
  }
});

const activechart = computed(() => [usersactive.value, userstotal.value - usersactive.value]);
const inactivechart = computed(() => [usersinactive.value, userstotal.value - usersinactive.value]);
const vipchart = computed(() => [uservip.value, userstotal.value - uservip.value]);

const card = computed(() => [
  { title: 'Total Revenue', datafetch: `${totalRevenue.value} EGP`, img: '/icons/card1_icon.svg' },
  { title: 'Total Orders', datafetch: `${NumberOfOrders.value} Orders`, img: '/icons/card2_icon.svg' },
  { title: 'New Products', datafetch: `${newProducts.value} Products`, img: '/icons/card3_icon.svg' },
  { title: 'New Customers', datafetch: `${newCustomers.value} Customers`, img: '/icons/card4_icon.svg' },
]);
</script>

<template>
  <div class="bg-success">
    <div
      class="pt-4"
      style="padding-left: 88px; padding-right: 88px; height: 100vh"
    >
      <v-sheet class="text-start bg-success mb-4">
        <Pagetitle title="Dashboard" />
      </v-sheet>

      <v-row justify="center" no-gutters style="margin-bottom: 40px;">
        <Card
          v-for="(item, index) in card"
          :key="index"
          :title="item.title"
          :datafetch="item.datafetch"
          :img="item.img"
        />
      </v-row>

      <v-sheet width="100%" class="text-start bg-success">
        <div class="d-flex">
          <Chart :data="[60, 40]" :title="'Available Products'" />
          <Chart :data="activechart" :title="'Active Customer'" />
          <Chart :data="inactivechart" :title="'InActive Customer'" />
          <Chart :data="vipchart" :title="'Vip Customer'" />
        </div>
      </v-sheet>
    </div>
  </div>
</template>
