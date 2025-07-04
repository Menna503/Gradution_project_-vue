<script setup>
import Paginationtable from "../components/Paginationtable.vue";
import Table from "../components/Table.vue";
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import Templatepage from "../components/Templatepage.vue";
import Pagetitle from "../components/Pagetitle.vue";
import Search from "../components/Search.vue";
import Primarybutton from "../components/Primarybutton.vue";
import Filter from "../components/Filter.vue";
import { useCustomerStore } from "../Store/CustomerStore";
import { useFilterCode } from "../main/Searchcode";
import { usePagination } from "../main/Pagination";
import { usetoast } from "../Store/Toast";
const toast = usetoast();
const { showtoast } = toast;
const customerstore = useCustomerStore();
const fields = ["firstName", "lastName", "status"];
const searchterm = ref("");
const Filterterm = ref("");
const itemperpage = ref(7);
const Customercolumns = ref([
  { name: "_id", label: "Id" },
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "role", label: "Role" },
  { name: "status", label: "Status" },
  { name: "Orders", label: "Orders" },
  { name: "Action", label: "Action" },
]);
const filteroption = ref([
  { name: "", title: "All" },
  { name: "vip", title: "vip" },
  { name: "inactive", title: "inactive" },
  { name: "active", title: "active" },
]);

const filteredData = useFilterCode(
  computed(() => customerstore.alldata),
  searchterm,
  fields
);
const paginationdata = usePagination(filteredData, itemperpage.value);

onBeforeMount(() => {
  console.log("fetched");
  customerstore.fetchUsers();
});

watch([searchterm, Filterterm], () => {
  customerstore.fetchUsers({ status: Filterterm.value }).then(() => {
    paginationdata.page.value = 1;
  });
});

// async function handeldelete(id) {
//   console.log("delete", id);
//   await customerstore.deleteuser(id);
//   customerstore.fetchUsers();
// }
async function handleClick(id) {
  const user = customerstore.alldata.find((c) => c._id === id);
  if (!user) return;
 await customerstore.updateuserbyid(id, user);
  customerstore.fetchUsers();
    showtoast("Customer removed successfully", "error");

}
</script>

<template>
  <Templatepage
    :statusfetch="customerstore.status"
    :length="customerstore.datalength"
    :title="'No Customer found.'"
  >
    <template #partone>
      <Pagetitle title="Customer Management" />
    </template>
    <template #parttwo>
      <div class="d-flex bg-success">
        <Filter :List="filteroption" v-model="Filterterm" />
        <Search v-model="searchterm" label="Search for customer..." />
        <div class="text-primary font-weight-bold text-h6 cursor-default">
          <span >Total Customers: </span
          >{{ customerstore.datalength }}
        </div>
      </div>
    </template>
    <template #partthree>
      <Table
        :columns="Customercolumns"
        :tableData="paginationdata.paginationitem.value"
        icon2="mdi-account-lock-outline"
        nosearch="No Customer match your search"
        titleicon2="Make Admin"
        imgsearch="/no-order 1.svg"
        @delete="handleClick"
        :itemsPerPage="itemperpage"
        :page="paginationdata.page.value"
        modaltext="Are you sure you want to make this customer Admin?"
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
</template>

<style lang="scss" scoped></style>
