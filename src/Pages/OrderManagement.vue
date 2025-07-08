<!-- Parent.vue -->
<script setup>
import Templatepage from "../components/Templatepage.vue";
import Table from "../components/Table.vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import Paginationtable from "../components/Paginationtable.vue";
import Pagetitle from "../components/Pagetitle.vue";
import Filter from "../components/Filter.vue";
import { useOrderStore } from "../Store/OrderStore";
import Search from "../components/Search.vue";
import { useFilterCode } from "../main/Searchcode";
import { usePagination } from "../main/Pagination";
import { usetoast } from "../Store/Toast";
const toast = usetoast();
const { showtoast } = toast;
const itemperpage = ref(8);
const ordertStore = useOrderStore();
const searchterm = ref("");
const Filterterm = ref("");
const OrdercolumnsName = ref([
  { name: "_id", label: "Id" },
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Number" },
  { name: "email", label: "Email" },
  { name: "itemsCount", label: "Number of Items" },
  { name: "totalPriceOrder", label: "Total Price" },
  { name: "status", label: "Status" },
  { name: "Order", label: "Order" },
]);
const filteroption = ref([
  { name: "", title: "All" },
  { name: "pending", title: "pending" },
  { name: "shipping", title: "shipping" },
    { name: "Delivered", title: "Delivered" },
      { name: "Cancelled", title: "Cancelled" }


]);
const fields = ["firstName", "lastName", "status"];

const filteredData = useFilterCode(
  computed(() => ordertStore.alldata),
  searchterm,
  fields
);
const paginationdata = usePagination(filteredData, itemperpage.value);

//tommorrow
watch([searchterm, Filterterm], () => {
  paginationdata.page.value = 1;
});
onBeforeMount(() => {
  console.log("fetched");
  ordertStore.fetchOrders();
});
onMounted(() => {
  console.log("Data fetched on mount:");
});
watch([searchterm, Filterterm], () => {
  ordertStore.fetchOrders({ orders: Filterterm.value }).then(() => {
    paginationdata.page.value = 1;
  });
});

async function updateOrderStatus(order) {
  try {
    await ordertStore.updateOrderById(order._id, { status: order.status }); // ✅ بس status
    showtoast("Order status updated successfully", "success");
  } catch (err) {
    showtoast("Failed to update order status", "error");
  }
}


</script>

<template>
  <div class="text-center">
    <Templatepage
      :statusfetch="ordertStore.status"
      :length="ordertStore.datalength"
      :title="'No Order found.'"
    >
      <template #partone>
        <Pagetitle title="Order Management" />
      </template>
      <template #parttwo>
        <div class="d-flex bg-success">
          <Filter :List="filteroption" v-model="Filterterm" />
          <Search v-model="searchterm" label="Search for order..." />
        </div>
      </template>
      <template #partthree>
        <Table
          :columns="OrdercolumnsName"
          :tableData="paginationdata.paginationitem.value"
          nosearch="No order match your search"
          imgsearch="/no order.png"
          :itemsPerPage="itemperpage"
          :page="paginationdata.page.value"
           type="orders"
            @status-update="updateOrderStatus"
        />
      </template>
      <template #partfour>
        <Paginationtable
          :totalpage="paginationdata.totalpage.value"
          v-model:page="paginationdata.page.value"
          :itemperpage="paginationdata.itemperpage"
        />
      </template>
    </Templatepage>
  </div>
</template>
