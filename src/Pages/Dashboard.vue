<script setup>
import Card from "../components/Card.vue";
import Chart from "../components/Chart.vue";
import Pagetitle from "../components/Pagetitle.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";

function formatNumberRounded(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toFixed(0);
}

const status = ref("");
const token = localStorage.getItem("token");

const carddata = ref(null);
const numberOfOrders = ref(0);
const totalRevenue = ref(0);
const totalCustomers = ref(0);
const availableProducts = ref(0);

const usersactive = ref(0);
const usersinactive = ref(0);
const uservip = ref(0);
const userstotal = ref(0);

onMounted(async () => {
  try {
    status.value = "loading";
    const response = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    carddata.value = response.data;

    numberOfOrders.value = carddata.value.numberOfOrders || 0;
    totalRevenue.value = carddata.value.totalRevenue || 0;
    totalCustomers.value = carddata.value.userCount || 0;
    availableProducts.value = carddata.value.availableProducts || 0;

    usersactive.value = carddata.value.userActive || 0;
    usersinactive.value = carddata.value.userInActive || 0;
    uservip.value = carddata.value.userVip || 0;
    userstotal.value = carddata.value.userCount || 0;

    status.value = "success";
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    status.value = "error";
    numberOfOrders.value = 0;
    totalRevenue.value = 0;
    totalCustomers.value = 0;
    availableProducts.value = 0;
  }
});

const card = computed(() => [
  {
    title: "Total Revenue",
    datafetch: `${formatNumberRounded(totalRevenue.value)} EGP`,
    img: "/icons/card1_icon.svg",
  },
  {
    title: "Total Orders",
    datafetch: `${numberOfOrders.value} Orders`,
    img: "/icons/card2_icon.svg",
  },
  {
    title: "Available Products",
    datafetch: `${availableProducts.value} Products`,
    img: "/icons/card3_icon.svg",
  },
  {
    title: "Total Customers",
    datafetch: `${totalCustomers.value} Customers`,
    img: "/icons/card4_icon.svg",
  },
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

      <div
        v-if="status === 'loading'"
        class="d-flex justify-center align-center"
        style="height: calc(100vh - 150px)"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        <span class="ml-2">Loading dashboard data...</span>
      </div>

      <div
        v-else-if="status === 'error'"
        class="d-flex justify-center align-center text-red"
        style="height: calc(100vh - 150px)"
      >
        Failed to load dashboard data. Please try again later.
      </div>

      <div v-else>
        <v-row justify="center" no-gutters style="margin-bottom: 40px">
          <Card
            v-for="(item, index) in card"
            :key="index"
            :title="item.title"
            :datafetch="item.datafetch"
            :img="item.img"
          />
        </v-row>

        <!-- Feature Cards Section -->

        <v-row justify="center" class="mb-8" no-gutters>
          <v-col cols="12" sm="6" lg="4" class="d-flex justify-center pa-2">
            <v-card
              style="border-radius: 10px"
              class="pa-6 elevation-1 hover-shadow-effect"
              width="100%"
            >
              <div
                style="border-radius: 10px"
                class="d-flex align-center justify-center w-25 bg-blue-lighten-5 mb-4 icon-container"
              >
                <v-icon size="32" color="blue-darken-2"
                  >mdi-shield-check</v-icon
                >
              </div>
              <h3 class="text-h6 font-weight-semibold text-grey-darken-3 mb-2">
                Security & Reliability
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                Secure system to protect all your data
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4" class="d-flex justify-center pa-2">
            <v-card
              style="border-radius: 10px"
              class="pa-6 elevation-1 hover-shadow-effect"
              width="100%"
            >
              <div
                style="border-radius: 10px"
                class="d-flex align-center justify-center bg-green-lighten-5 w-25 mb-4 icon-container"
              >
                <v-icon size="32" color="green-darken-2"
                  >mdi-lightning-bolt</v-icon
                >
              </div>
              <h3 class="text-h6 font-weight-semibold text-grey-darken-3 mb-2">
                High Speed
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                Fast and reliable performance at all times
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4" class="d-flex justify-center pa-2">
            <v-card
              style="border-radius: 10px"
              class="pa-6 elevation-1 hover-shadow-effect"
              width="100%"
            >
              <div
                style="border-radius: 10px"
                class="d-flex align-center justify-center bg-purple-lighten-5 w-25 mb-4 icon-container"
              >
                <v-icon size="32" color="purple-darken-2">mdi-medal</v-icon>
              </div>
              <h3 class="text-h6 font-weight-semibold text-grey-darken-3 mb-2">
                High Quality
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                Outstanding service and high standards
              </p>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Info Section -->
      <v-sheet
        style="border-radius: 10px"
        class="pa-6 elevation-1 info-section-sheet flex-grow-1 mt-10"
      >
        <v-row class="text-center" justify="center" no-gutters>
          <v-col cols="12" md="4" class="py-2">
            <h3 class="text-h5 font-weight-bold" style="color: #4caf50">
              99.9%
            </h3>
            <p class="text-body-1 text-grey-darken-1">Uptime</p>
          </v-col>
          <v-col cols="12" md="4" class="py-2">
            <h3 class="text-h5 font-weight-bold" style="color: #2196f3">
              24/7
            </h3>
            <p class="text-body-1 text-grey-darken-1">Customer Service</p>
          </v-col>
          <v-col cols="12" md="4" class="py-2">
            <h3 class="text-h5 font-weight-bold" style="color: #9c27b0">5⭐</h3>
            <p class="text-body-1 text-grey-darken-1">Store Rating</p>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- Decorative Elements Section (Moved Up) -->
   
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles */
</style>
